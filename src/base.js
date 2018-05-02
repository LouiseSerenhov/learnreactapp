import Rebase from "re-base";
import firebase from "firebase";
import { initializeApp } from "firebase/app";

const firebaseApp = initializeApp({

        apiKey: "AIzaSyB4_bDznQNDLJJ_SP4EZbWa0M7S-rJv_U4",
        authDomain: "catch-of-the-day-louise.firebaseapp.com",
        databaseURL: "https://catch-of-the-day-louise.firebaseio.com",
     
});

const base = Rebase.createClass(firebaseApp.database());
export  {firebaseApp};

export default base;