import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCB0EPOsfA3kwB6JIcovoLj3sCF-PFTqf8",
  authDomain: "my-app-e8434.firebaseapp.com",
  databaseURL: "https://my-app-e8434-default-rtdb.firebaseio.com",
  projectId: "my-app-e8434",
  storageBucket: "my-app-e8434.appspot.com",
  messagingSenderId: "35373341470",
  appId: "1:35373341470:web:ebc6f653dde23b1013870f"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);