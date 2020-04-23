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
function render(message0, message1, message2) {
const document = `<html>
    <head><title>home</title></head>
    <body><h1>Greetings, ${message0}.</h1>
    <div>You are ${message1} years old. You understand ${message2}. Prepare for some quality jokes 
    </body>
    </html>`
    return document
}

function selectAge(age) {
    if (age === '25') {
        return "age is 25"
    } else {
        return "sum other age"
    }
}

function understandDutch(dutch) {
    if (dutch === 'yes') {
        return "You understand Dutch"
    } else if (dutch === 'no') {
        return "What'd you say?"
    } else {
        return "please write 'yes' or 'no'"
    }
}
// register endpoint. 1st arg = route, 2nd = callback that runs when route is requested
// note that end arg must be callback function. SO request & response are both within this arg!
app.get('/user/:name/:dutch/:age/', ((request, response) => {
    console.log(request.path)
    const message0 = request.params.name
    const language = request.params.dutch
    const age = request.params.age
    const message1 = understandDutch(language)
    const message2 = selectAge(age)
    const page = render(message0, message1, message2)
    response.send(page)
    })
)