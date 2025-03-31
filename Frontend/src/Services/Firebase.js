// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBxOUuA4Tye9MRasCaTzbhNnTjFbqcRMfM",
    authDomain: "mutualfund-38cbb.firebaseapp.com",
    projectId: "mutualfund-38cbb",
    storageBucket: "mutualfund-38cbb.firebasestorage.app",
    messagingSenderId: "187087038831",
    appId: "1:187087038831:web:004c23bda0b5ce25fba09a",
  };
  
//   {Name: 'Shreyas Gadave', Email: 'shreyasgadave777@gmail.com', Password: 'Shrey@108'}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const SignUp = async (Name, Email, Passoword) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, Email, Passoword);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      Name,
      authProvider: "local",
      Email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const LogIn = async (Email, Passoword) => {
  try {
    await signInWithEmailAndPassword(auth, Email, Passoword);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const LogOut = () => {
  signOut(auth);
};

export { auth, db, LogIn, SignUp, LogOut };
