// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpODgv2uRHh6EqFEyRAVIeyb7oegUb1y8",
  authDomain: "react-js-blog-website-7e3be.firebaseapp.com",
  projectId: "react-js-blog-website-7e3be",
  storageBucket: "react-js-blog-website-7e3be.appspot.com",
  messagingSenderId: "298002713793",
  appId: "1:298002713793:web:94e06c7dbb7de2ef281840",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// google auth

const provider = new GoogleAuthProvider();

const auth = getAuth();

export const authWithGoogle = async () => {
  let user = null;

  await signInWithPopup(auth, provider)
    .then((result) => {
      user = result.user;
    })
    .catch((err) => {
      console.log(err);
    });
  return user;
};
