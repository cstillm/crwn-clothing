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

// firebase setup 
firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  // check if user is authenticated
  if (!userAuth) return;

  // if user auth then check if user exists in firebase
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  // if user uid doesn't exist we want to create user on firestore db
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error create user', error.message)
    }
  }

  return userRef;
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;