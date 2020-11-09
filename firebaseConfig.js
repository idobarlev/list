import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAYey_ZBa_6YEZZFTaWVxmigwCiqGbs4r4",
    authDomain: "list-official.firebaseapp.com",
    databaseURL: "https://list-official.firebaseio.com",
    projectId: "list-official",
    storageBucket: "list-official.appspot.com",
    messagingSenderId: "602865202965",
    appId: "1:602865202965:web:72d25c38b006aebe281b1c",
    measurementId: "G-61VWGJDYDQ",
};

firebase.initializeApp(config)
const db = firebase.firestore()
const auth = firebase.auth()
const timeStamp = firebase.firestore.FieldValue.serverTimestamp()

const usersRef = db.collection('users')
const listsRef = db.collection('lists')

export {db, auth, timeStamp, usersRef, listsRef};