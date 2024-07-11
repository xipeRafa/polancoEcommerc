



import firebase from 'firebase/compat/app';
import { getFirestore } from 'firebase/firestore'



//require("dotenv").config()


const app = firebase.initializeApp({
    
  apiKey: "AIzaSyAp9XrnMQ2kd-L8I2kVOZJctYBAT-h66tM",
  authDomain: "polanco-25ef9.firebaseapp.com",
  projectId: "polanco-25ef9",
  storageBucket: "polanco-25ef9.appspot.com",
  messagingSenderId: "804200542961",
  appId: "1:804200542961:web:010ee2a2d4e45ec098af50"





  /*     apiKey: "AIzaSyCqG_1hm7AJN58pyBj_lbMecOtwP2NXbzQ",
    authDomain: "taxis-stackblitz.firebaseapp.com",
    projectId: "taxis-stackblitz",
    storageBucket: "taxis-stackblitz.appspot.com",
    messagingSenderId: "977311415632",
    appId: "1:977311415632:web:c4a419e65259ff87fa8055"
  




  apiKey: `${ process.env.REACT_APP_API_KEY }` ,
    authDomain: `${ process.env.REACT_APP_AUTH_DOMAIN }` ,
    projectId: `${ process.env.REACT_APP_PROJECT_ID }` ,
    storageBucket: `${ process.env.REACT_APP_STORAGE_BUCKET }` ,
    messagingSenderId: `${ process.env.REACT_APP_MESSAGING_SENDER_ID }` ,
    appId: `${ process.env.REACT_APP_APP_ID }` */
});



const db = getFirestore(app)
export default db

