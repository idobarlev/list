const functions = require('firebase-functions');
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 4040
const list = require('./routes/list')

app.listen(port, () => console.log(`listening on port ${port}..`))

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
