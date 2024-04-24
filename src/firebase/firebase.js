import { getStorage } from "firebase/storage";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFPYSmvW-6oxZVj_K-DJTLm4Re7WEAMFs",
  authDomain: "notes-scd.firebaseapp.com",
  projectId: "notes-scd",
  storageBucket: "notes-scd.appspot.com",
  messagingSenderId: "823112476484",
  appId: "1:823112476484:web:69679945667604f9035911",
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);

export default FirebaseApp;

/**export storage */

export const storage = getStorage(FirebaseApp);
