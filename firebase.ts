import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // დაამატე ეს
import { getFirestore } from "firebase/firestore"; // დაამატე ეს
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
     apiKey: "AIzaSyCigjqwr1mUWLUY8X7cm8ITnwU1PFfS-og",
     authDomain: "words-game-8b74f.firebaseapp.com",
     projectId: "words-game-8b74f",
     storageBucket: "words-game-8b74f.firebasestorage.app",
     messagingSenderId: "169455245686",
     appId: "1:169455245686:web:50cacdb9ab2c994b894257",
     measurementId: "G-LV8Q6TWSDV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// აი ეს ხაზები აკლდა, რაც მთავარია "export" სიტყვით:
export const auth = getAuth(app);
export const db = getFirestore(app);