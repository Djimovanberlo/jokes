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
    joke5: "den siste spoek"
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
function jokePicker(dutch, age) {
    if (dutch === 'yes' && age > '30') {
        pickedJoke = 'dutch joke for old people';
    } else if (dutch === 'yes' && age <= '30') {
        pickedJoke = 'dutch joke for hip people';
    } else if (dutch === 'no' && age > '30') {
        pickedJoke = 'english joke for old people';
    } else if (dutch === 'no' && age <= '30') {
        pickedJoke = 'english joke for old people'; 
    }
}

// register endpoint. 1st arg = route, 2nd = callback that runs when route is requested
// note that end arg must be callback function. SO request & response are both within this arg!
app.get('/user/:name/:age/:dutch/', ((request, response) => {
    console.log(request.path)
    const message = request.params.name
    const language = request.params.dutch
    const age = request.params.age
    jokePicker(language, age)
    const page = render(message)
    response.send(page)
    })
)