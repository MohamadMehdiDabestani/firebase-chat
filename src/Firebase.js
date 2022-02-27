import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const config = initializeApp({
  apiKey: "AIzaSyD6scCtF4yxHEztmASP8pB_0V2QZQNCOWg",
  authDomain: "chatapp-a5945.firebaseapp.com",
  projectId: "chatapp-a5945",
  storageBucket: "chatapp-a5945.appspot.com",
  messagingSenderId: "637369878149",
  appId: "1:637369878149:web:3d0de2f28669584cba4bec",
  measurementId: "G-CT50693V0P",
  databaseURL:
    "https://chatapp-a5945-default-rtdb.asia-southeast1.firebasedatabase.app",
});

export const app = config;
export const db = getFirestore(config);
export const database = getDatabase(config);
export const storage = getStorage(config);
