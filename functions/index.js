const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const listsRouter = require('./routes/list')

app.use(bodyParser.json())
app.use('/list',listsRouter)

exports.app = functions.https.onRequest(app);

// exports.detectMagicWord = functions.firestore
//        .document('lists/{listId}')
//        .onWrite(async (doc, ctx) => {

//         console.log(doc.data())
//         if (text === 'abay') {

//             const applyMagic = `🔥ABAY = 🐐🔥`;
//             await doc.ref.update({text: applyMagic});

//             await db.collection('wizards').doc(uid).set({});
//         } 
// });


