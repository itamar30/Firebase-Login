// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCv87uiVsEdCMKzoYE7fCB87ojUQTT0k74",
  authDomain: "fir-login-7208d.firebaseapp.com",
  projectId: "fir-login-7208d",
  storageBucket: "fir-login-7208d.appspot.com",
  messagingSenderId: "1004354580199",
  appId: "1:1004354580199:web:ff2012c29c01db05187c42",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
