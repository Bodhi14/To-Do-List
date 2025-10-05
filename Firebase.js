import firebase from "firebase";
import "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAOj_uPr_IrH4kkt8jpO6Hdvjtl3XSBYFA",
  authDomain: "to-do-76408.firebaseapp.com",
  projectId: "to-do-76408",
  storageBucket: "to-do-76408.firebasestorage.app",
  messagingSenderId: "879383042855",
  appId: "1:879383042855:web:22a3e816de36a159976702",
  measurementId: "G-H689XVK831"
};

class Fire {
  init() {
    if(!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
      } else {
        firebase.auth().signInAnonymously().catch(error => {});
      }
    }
  }
}

export default Fire;
