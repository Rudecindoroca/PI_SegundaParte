import app from 'firebase/app'
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDS7gn3pAfFry9GQ7IqXyWb2aRpEXdTb_w",
    authDomain: "segundo-pi.firebaseapp.com",
    projectId: "segundo-pi",
    storageBucket: "segundo-pi.firebasestorage.app",
    messagingSenderId: "39348484791",
    appId: "1:39348484791:web:4b4caa2ca3a7858338eb32"
  };

app.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const storage = app.storage()
export const db = app.firestore()