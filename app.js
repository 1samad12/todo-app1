import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { onAuthStateChanged, getAuth } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import {
    getFirestore, collection, addDoc, onSnapshot, doc, deleteDoc
    , updateDoc

} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";


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

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log(user.email);
        document.getElementById('todo').innerHTML = `
        <div class='text-center'>
        <h1>Todo with firebase</h1>
        <input placeholder='enter your todo text' type="text" name="" id="getinp">
        <button  onclick="adtodo()" >add todo</button>
        <button >delet all</button>
        </div>

    <ul id="getul">

    </ul>`

        function getdata() {
            let ul = document.querySelector("#getul")
            onSnapshot(collection(db, "todos"), (data) => {
                data.docChanges().forEach((newdata) => {
                    if (newdata.type == "removed") {
                        let del = document.getElementById(newdata.doc.id)
                        del.remove()
                    }
                    else {
                        ul.innerHTML +=
                            `
                        <li  id=${newdata.doc.id} >${newdata.doc.data().name}  ${newdata.doc.data().timer}  
                        <button  onclick=" deltodo('${newdata.doc.id}')">Delet</button>
                        <button onclick=" edit(this,'${newdata.doc.id}')" >Edit</button>
                        </li>    
                        `
                    }
                })
            })
        }
        getdata();
        window.adtodo = async function () {
            let getinp = document.querySelector("#getinp")
            const docRef = await addDoc(collection(db, "todos"), {
                name: getinp.value,
                timer: new Date().toLocaleString()
            });
            console.log("Document written with ID: ", docRef.id);
        }
        async function deltodo(id) {
            await deleteDoc(doc(db, "todos", id));
        }
        async function edit(e, id) {
            let editval = prompt("Enter  edit value");
            
            console.log(e.parentNode);
            await updateDoc(doc(db, "todos", id), {
                name: editval,
                time: new Date().toLocaleString()
            });
        }
        window.getdata = getdata
        window.deltodo = deltodo
        window.edit = edit


    } else {
        document.getElementById('todo').innerHTML = `
       <h1>Login Your Account<h1>`
    }
});


document.getElementById('inner').innerHTML = `
 <a href="./login/login.html" style="background-color: #fff; color: crimson; padding: 10px 40px;text-decoration: none; font-weight: bold; border-radius: 25px;font-style: 
italic;">login</a>`







 