const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cors = require("cors");


const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(express.static("public"));
app.use(cors());

mongoose.connect("mongodb://localhost:27017/blackcloverDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);

const characterSchema = {

    name: String,
    magic: String,
    age: Number,
    gender: String,
    residance: String,
    img: String

}

const Character = mongoose.model("Character", characterSchema);



//Home route
app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html");
});

//Search Character route
app.get("/search", function (req, res) {

    res.sendFile(__dirname + "/search.html");

});


//Adds new character
app.post("/", function(req, res){

    const newCharacter = new Character({

        name: req.body.name,
        magic: req.body.magic,
        age: req.body.age,
        gender: req.body.gender,
        residance: req.body.residance,
        img: req.body.img

    });

    newCharacter.save(function(err){

        if(err){

            res.send(err);
        }
        else{
            res.send("Character successfully added to the database");
        }

    });

});


//List all Json data of characters 
app.get("/Characters", function(req, res){

    Character.find(function(err, foundCharacters){

        if(err){

            res.send(err);
        }

        else{
            res.send(foundCharacters);
            
        }

    });

});


//Get a specific character through the Url (API)
app.get("/Characters/:CharacterTitle", function(req, res){

    Character.findOne({name: req.params.CharacterTitle}, function(err, foundCharacters){
        
        if(foundCharacters){

            res.send(foundCharacters);
        }
        else{
            res.send("No Charatcer");
        }

    });

});

//delete Character
app.post("/deleted", function(req, res){

    Character.findOneAndDelete({name: req.body.name}, function(err, foundArticles){
        
        if(!err ){
            
            if(foundArticles){
            
            res.send("Character was successfully deleted");
            
            } else {
            
            res.send("Character dosent exisit");
            
            }
            
            } else {
            
            res.send(err);
            
            }
    });

        
});

//update specific items 

app.post("/updated", function(req, res) {

    let characterObject = {

        name: req.body.name,
        magic: req.body.magic,
        age: req.body.age,
        gender: req.body.gender,
        residance: req.body.residance,
        img: req.body.img
    
    }
 
    for(let attribute in characterObject){

        if(characterObject[attribute] == "" || characterObject[attribute] == undefined){

            delete characterObject[attribute];
        }

    }

   Character.findOneAndUpdate({name: req.body.updateName}, {$set: characterObject}, function(err, foundCharacters){

    if(!err ){

        if(foundCharacters){

            res.send("Character was successfully updated");
        
        } else {
            
            res.send("Character dosent exisit");
        
        }
        
        } else {
        
            res.send(err);
        
        }

    });

});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});

