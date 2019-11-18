# Black-Clover-RESTAPI
So because im a total geek and love the series I decided to make really cool application of one of my favourite anime. 
A simple REST-API able to make crud functions of different characters in the series Black Clover. 

Each character contains a list of the following data ***NAME, AGE, MAGIC, GENDER, RESIDANCE, and Image url.*** All this information is stored in a NoSQL database which can then can be queried and shown visually on to a front end.

## Technologies used
* Node.js
* Express
* MongoDB and Mongoose
* Fetch
* CSS grid

# Installation and Usage
So at this moment of time I havent connected this to Icloud database such as MongoAtlas. All information and data is stored locally on
my PC. You will find the url im using to call the data uses a localhost url inside my script.js file. So you wont be able to access this data or information even if you download the project file.

So if you really wanted to, what I would recommend creating your own data. First be sure you have the following packages installed in your app.js ***express, body-parser, mongoose and cors*** and have node and mongodb installed. After that you would need to actually create a MongoDB server or database in your computer. 

You can use the terminal, but I really recommed a thrid party software I used called [Robo-3t](https://robomongo.org/) It makes creating a database super easy and helps keep track of the data.

Once you created your database its super easy after that. Ive already done the heavy lifting. All you need to do is plug in the url of your database and you can start adding characters.
```
mongoose.connect("mongodb://localhost:27017/youdatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
```
# Customisation
So this RESTAPI can be easily customisable to cator for all types of data. Dosent need be Black Clover characters. However this dose require a couple of steps, for example changing the data schema. (These are just main steps you would need to take, I trust you figure the rest off by yourself if your familiar with mongo) 

## Step 1 (Change Schema)

Current Schema

```
const characterSchema = {

    name: String,
    magic: String,
    age: Number,
    gender: String,
    residance: String,
    img: String

}

const Character = mongoose.model("Character", characterSchema);

```

New Schema

```
const footballerSchema = {

    name: String,
    goals: Number,
    height: Number,
    Age: Number


}

const Footballer = mongoose.model("Footballer", footballerSchema);

```
## Step 2 (Change url)

Since way this application queries data is by using the Fetch method, it would be necessary to actually change name of the url

Current
```
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

```

New
```
//List all Json data of characters 
app.get("/Footballers", function(req, res){

    Footballer.find(function(err, foundFootballers){

        if(err){

            res.send(err);
        }

        else{
            res.send(foundFootballers);
            
        }

    });

});

```

## Step 3 (Connect new url)
If you go in to the script.js file you find a varible called url

Current

```
let url = `http://localhost:3000/Characters`;
```
New

```
let url = `http://localhost:3000/Footballers`;
```

## Step 4 (Manipulate the DOM)
So the way that this works is that you have a input that loops through a list of footballers coming from the fetch command. I used a function for this that takes in two parameters. id being your input and the data being the list of footballers. Your input loops through 
the list and checks if the input matchs a id name. If is dose stop the loop and collect that data id and manipulate the dom, if not display footballer and dosent exist

```
//Render Footballer
function displayFootballer(data, id) {

    for (i = 0; i < data.length; i++) {

        if (id.value == data[i].name) {

            resultName =  data[i].name;
            resultGoals = data[i].goals;
            resultHeight = data[i].height;
            resultAge = data[i].age;
            break;

        } else {

            resultName = `Footballer dosent exist`;
            resultGoals = '';
            resultHeight = '';
            resultAge = '';
     

        }

    }

    document.querySelector('.footballerName').textContent = `Name: ${resultName}`;
    document.querySelector('.footballerAge').textContent = `Magic: ${resultGoals}`;
    document.querySelector('.footballerGoals').textContent = `Age: ${resultAge}`;
    document.querySelector('.footballerHeight').textContent = `Gender: ${resultHeight}`;

}


```

