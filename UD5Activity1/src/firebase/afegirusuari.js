import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { setDoc, doc, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".newuser-form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault(); 

        const nom = document.getElementById("nom").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const permisos = {
            edit_users: document.querySelector('input[name="edit_users"]').checked,
            edit_news: document.querySelector('input[name="edit_news"]').checked,
            edit_bone_files: document.querySelector('input[name="edit_bone_files"]').checked,
        };

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const usersCollectionRef = collection(db, "users");
            const usersSnapshot = await getDocs(usersCollectionRef);
            
            const userCount = usersSnapshot.size;
            const newUserId = `User${userCount + 1}`; 

            const newUser = {
                name: nom,
                email: email,
                password: password,
                role: "user", 
                permissions: permisos,
                active: true,
                uid: user.uid,
            };
            await setDoc(doc(db, "users", newUserId), newUser);
            alert(`Usuario ${nom} creado con éxito.`);
            form.reset(); 
        } catch (error) {
            console.error("Error al crear el usuario:", error);
            alert(`Error: ${error.message}`);
        }
    });
});
