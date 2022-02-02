// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8XyAxwXsW6XB4T7Oy5AKgOBPBReE9bm0",
  authDomain: "purna-carpet-udhyog.firebaseapp.com",
  projectId: "purna-carpet-udhyog",
  storageBucket: "purna-carpet-udhyog.appspot.com",
  messagingSenderId: "885394744144",
  appId: "1:885394744144:web:18f2c0736dbcce6eaec255",
  measurementId: "G-EK77W06BEJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const FireDB = getFirestore(app);

export default FireDB;
