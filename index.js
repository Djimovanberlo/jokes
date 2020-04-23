// import express, declare const and assign to it package
const express = require('express')

// create server with express() function
const app = express()

// 3000 is a common TCP port
const port = 3000;

// to make callback function for .listen() method (2nd arg)
function listeningToPort() {
    console.log(`connected to port ${port}`);
}
// start listening on port 3000. First argument of .listen is port
app.listen(port, listeningToPort());

const jokes = {
    joke1: "this is the first joke",
    joke2: "this is the second joke",
    joke3: "this be da third",
    joke4: "und jetzt dem 4. humor",
    joke5: "den siste spoek",
    errormsg: "Oops, something went wrong!"
 };

//setup a render page, which is later used in app.get(){... response.send}
function render(message) {
const document = `<html>
    <head><title>home</title></head>
    <body><h1>Greetings, ${message}.</h1>
    <div>${pickedJoke}</div>
    </body>
    </html>`
    return document
}

let pickedJoke;

// language = message1, age = message2
function jokePicker(age, dutch) {
    let randomB = Math.round(Math.random())
    if (age >= '30' && dutch === 'yes') {
        pickedJoke = jokes.joke1;
    } else if (age < '30' && dutch === 'yes') {
        pickedJoke = jokes.joke2;
    } else if (age >= '30' && dutch === 'no') {
        pickedJoke = jokes.joke3;
    } else if (age < '30' && dutch === 'no' && randomB >= 0.5) {
        pickedJoke = jokes.joke4; 
    } else if (age < '30' && dutch === 'no' && randomB < 0.5) {
        pickedJoke = jokes.joke5;
    } else {
        pickedJoke = jokes.errormsg;
    }
}

// register endpoint. 1st arg = route, 2nd = callback that runs when route is requested
// note that end arg must be callback function. SO request & response are both within this arg!
app.get('/user/:name/:age/:dutch/', ((request, response) => {
    console.log(request.path)
    const message = request.params.name
    const age = request.params.age
    const language = request.params.dutch
    jokePicker(age, language)
    const page = render(message)
    response.send(page)
    })
)