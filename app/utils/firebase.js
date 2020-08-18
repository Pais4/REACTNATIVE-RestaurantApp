import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDq5diD1IPp7vfEz-lvt3ObLKQoxrbXnbM",
  authDomain: "cincotenedoresproyect.firebaseapp.com",
  databaseURL: "https://cincotenedoresproyect.firebaseio.com",
  projectId: "cincotenedoresproyect",
  storageBucket: "cincotenedoresproyect.appspot.com",
  messagingSenderId: "674807287554",
  appId: "1:674807287554:web:c39584977463d7af293c1b",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
