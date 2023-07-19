import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getStorage} from 'firebase/storage';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBxvaJ2r3PDr87ie-Xt0xSjlAEndH_rp30",
  authDomain: "webchat-e9294.firebaseapp.com",
  projectId: "webchat-e9294",
  storageBucket: "webchat-e9294.appspot.com",
  messagingSenderId: "33027747119",
  appId: "1:33027747119:web:def2d343521ec6cba585da"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage =  getStorage();
export const db = getFirestore();