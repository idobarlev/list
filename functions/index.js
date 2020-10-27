const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const listsRouter = require('./routes/list')

app.use(bodyParser.json())
app.use('/list',listsRouter)

exports.app = functions.https.onRequest(app);

