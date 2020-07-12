import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDa8ZUUeSs2naRTvIELjT35yMNLXiNZJqo",
  authDomain: "crown-db-13cb9.firebaseapp.com",
  databaseURL: "https://crown-db-13cb9.firebaseio.com",
  projectId: "crown-db-13cb9",
  storageBucket: "crown-db-13cb9.appspot.com",
  messagingSenderId: "690362464651",
  appId: "1:690362464651:web:4ae26402f258086f7c178e",
  measurementId: "G-LKDWSCWSBX"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  
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
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;