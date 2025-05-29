// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDuxiDsfiByDdfXbtIcNQT2oC43zsFdM5Y",
    authDomain: "fir-social-media-4a237.firebaseapp.com",
    projectId: "fir-social-media-4a237",
    storageBucket: "fir-social-media-4a237.firebasestorage.app",
    messagingSenderId: "536437772025",
    appId: "1:536437772025:web:bd8b379ed71e19a8139c28"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
