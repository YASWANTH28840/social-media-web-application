import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import 'firebase/compat/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyCP28FUlPtC34Mq4Rz29ce5fLcLQMeNCKE",
    authDomain: "social-247aa.firebaseapp.com",
    projectId: "social-247aa",
    storageBucket: "social-247aa.appspot.com",
    messagingSenderId: "238994775784",
    appId: "1:238994775784:web:f0facec17c1a1807ca335d",
    measurementId: "G-BHX1MFGWFR"
};
const app = firebase.initializeApp(firebaseConfig)
const storage = app.storage()
export default storage