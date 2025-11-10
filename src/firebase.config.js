// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfIyeH5zMe57QcLyVEJw3C63l8kGKDx1k",
  authDomain: "home-next-auth.firebaseapp.com",
  projectId: "home-next-auth",
  storageBucket: "home-next-auth.firebasestorage.app",
  messagingSenderId: "275141598727",
  appId: "1:275141598727:web:6f9c38c552dc40d51b94a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service

 export const auth = getAuth(app);
 export default app;