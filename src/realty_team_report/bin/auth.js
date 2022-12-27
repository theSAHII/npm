"use strict"

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
const { initializeApp } = require("firebase/app");
const { getAuth, GoogleAuthProvider } = require("firebase/auth");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBSPCUyA1HMWTg15U_JVQo659FSZHXNZiU",
    authDomain: "auth-a6787.firebaseapp.com",
    databaseURL: "https://auth-a6787-default-rtdb.firebaseio.com",
    projectId: "auth-a6787",
    storageBucket: "auth-a6787.appspot.com",
    messagingSenderId: "759579710862",
    appId: "1:759579710862:web:10194cb5d37f69ed28c0df",
    measurementId: "G-G2KTG78CZ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

module.exports = {
    auth, provider, GoogleAuthProvider
}
