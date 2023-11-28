import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDc6aIcqncNcBMfORpt3KKnTy1qE_0LTT8",
    authDomain: "login-signup-8556d.firebaseapp.com",
    projectId: "login-signup-8556d",
    storageBucket: "login-signup-8556d.appspot.com",
    messagingSenderId: "772610099521",
    appId: "1:772610099521:web:e21fc92c3673f5549939c0",
    measurementId: "G-32E470KL9G"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let logbtn = document.querySelector("#lbtn")
logbtn.addEventListener("click", async (e) => {
    e.preventDefault();
    
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log(user.email);
        alert('Login successfully');
        window.location.href = './index.html';
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.error("Error code:", errorCode);
        console.error("Error message:", errorMessage);

        if (errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password') {
            alert('Invalid email or password. Please try again.');
        } else {
            alert('An error occurred. Please try again later.');
        }
    }
});
