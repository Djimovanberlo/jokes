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
function render(name) {
    let document;
    if (pickedJoke === jokes.joke1) {
        document = `<html>
        <head><title>home</title></head>
        <body><h1>Greetings, ${firstLetterCap(name)}.</h1>
        <div>${pickedJoke}</div>
        </body>
        </html>`
        return document
    } else if (pickedJoke === jokes.joke2) {
        document = `<html>
        <head><title>home</title></head>
        <body><h1>Greetings ,${firstLetterCap(name)}.</h1>
        <div>${pickedJoke}</div>
        </body>
        </html>`
        return document
    } else if (pickedJoke === jokes.joke3) {
        document = `<html>
        <head><title>home</title></head>
        <body><h1>Greetings ,${firstLetterCap(name)}.</h1>
        <div>${pickedJoke}</div>
        </body>
        </html>`
        return document
    } else if (pickedJoke === jokes.joke4) {
        document = `<html>
        <head><title>home</title></head>
        <body><h1>Greetings ,${firstLetterCap(name)}.</h1>
        <div>${pickedJoke}</div>
        </body>
        </html>`
        return document
    } else if (pickedJoke === jokes.joke5) {
        document = `<html>
        <head><title>home</title></head>
        <body><h1>Greetings ,${firstLetterCap(name)}.</h1>
        <div>${pickedJoke}</div>
        </body>
        </html>`
        return document
}
}

let pickedJoke;
// change first letter to capital
function firstLetterCap(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// jokePicker assigns a joke to pickedJoke var, based on client parameters. It is called within app.get()
function jokePicker(age, dutch) {
    let randomB = Math.random()
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
    const name = request.params.name
    const age = request.params.age
    const language = request.params.dutch
    jokePicker(age, language)
    const page = render(name)
    response.send(page)
    }))
