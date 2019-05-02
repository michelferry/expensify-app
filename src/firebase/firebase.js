import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyDLAiLY6M0A7BvoeyC0h-WeCTV0adjPKb0",
  authDomain: "expensify-d0a0d.firebaseapp.com",
  databaseURL: "https://expensify-d0a0d.firebaseio.com",
  projectId: "expensify-d0a0d",
  storageBucket: "expensify-d0a0d.appspot.com",
  messagingSenderId: "1002542239049"
};

firebase.initializeApp(config);

firebase.database().ref().set({
  name: "Michel"
})

console.log("test");