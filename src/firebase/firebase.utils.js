import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCVZAQ9s0Da5mOd2ciL6GV0246hypxuQ04",
    authDomain: "crwn-clothing-ade52.firebaseapp.com",
    databaseURL: "https://crwn-clothing-ade52.firebaseio.com",
    projectId: "crwn-clothing-ade52",
    storageBucket: "crwn-clothing-ade52.appspot.com",
    messagingSenderId: "1068175258667",
    appId: "1:1068175258667:web:2526ce6406e5f4fcf5266e",
    measurementId: "G-7VYEFDJKW3"
  };

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;