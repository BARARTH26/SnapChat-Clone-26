import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCQAOPRQDoYbfzGxsfIqZanaxdm28vfFEI",
    authDomain: "event-schedule-app-3d93d.firebaseapp.com",
    projectId: "event-schedule-app-3d93d",
    storageBucket: "event-schedule-app-3d93d.appspot.com",
    messagingSenderId: "662765778543",
    appId: "1:662765778543:web:9e27eca132b22863587f9a"
  };


  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  const provider = new firebase.auth.GoogleAuthProvider();


  export {db,auth,storage,provider};