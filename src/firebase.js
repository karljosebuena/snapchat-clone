import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDxTSKWRoo-kovQSOJs7eNjVNITlnbyV0c",
  authDomain: "snapchat-clone-1c63b.firebaseapp.com",
  projectId: "snapchat-clone-1c63b",
  storageBucket: "snapchat-clone-1c63b.appspot.com",
  messagingSenderId: "255299251103",
  appId: "1:255299251103:web:df41b498ff22aeb08e6baa"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };
