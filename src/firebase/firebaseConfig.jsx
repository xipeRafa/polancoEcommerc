/* 
//Inicializacion de Firebase/Firestore
import firebase from 'firebase/app';
import '@firebase/firestore';
import '@firebase/auth';

 require("dotenv").config() 


const app = firebase.initializeApp({
    apiKey: "AIzaSyCqG_1hm7AJN58pyBj_lbMecOtwP2NXbzQ",
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
    appId: `${ process.env.REACT_APP_APP_ID }` 
});

export const getFirebase = () => {
    return app;
}

export const getFirestore = () => {
    return firebase.firestore(app);
};

 */


//Inicializacion de Firebase/Firestore
import firebase from 'firebase/compat/app';
import { getFirestore } from 'firebase/firestore'



//require("dotenv").config()


const app = firebase.initializeApp({

    apiKey: "AIzaSyCqG_1hm7AJN58pyBj_lbMecOtwP2NXbzQ",
    authDomain: "taxis-stackblitz.firebaseapp.com",
    projectId: "taxis-stackblitz",
    storageBucket: "taxis-stackblitz.appspot.com",
    messagingSenderId: "977311415632",
    appId: "1:977311415632:web:c4a419e65259ff87fa8055"
  
 /*    apiKey: `${ process.env.REACT_APP_API_KEY }` ,
    authDomain: `${ process.env.REACT_APP_AUTH_DOMAIN }` ,
    projectId: `${ process.env.REACT_APP_PROJECT_ID }` ,
    storageBucket: `${ process.env.REACT_APP_STORAGE_BUCKET }` ,
    messagingSenderId: `${ process.env.REACT_APP_MESSAGING_SENDER_ID }` ,
    appId: `${ process.env.REACT_APP_APP_ID }` */
});

/* export const getFirebase = () => {
    return app;
}

export const getFirestore = () => {
    return firebase.firestore(app);
};
const docRef = firebase.firestore().doc();
getDoc(docRef); */


const db = getFirestore(app)
export default db

