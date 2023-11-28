
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



let btn = document.querySelector('#sbtn');
btn.addEventListener("click", (e) => {
    e.preventDefault();
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then(async (userCredential) => {
            const user = userCredential.user;
            console.log(user);
            try {
                const docRef = await addDoc(collection(db, "users"), {
                    email: email.value,
                    password: password.value,
                });
                alert("signup successfully")
                console.log("Document written with ID: ", docRef.id);
                window.location.href = './login.html'
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("error code ==>", errorCode);
            alert("error Message ==>", errorMessage);
        });
});



