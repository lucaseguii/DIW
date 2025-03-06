import { db, auth } from "./firebase.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

async function createAdminUser() {
    const adminRef = doc(db, "users", "admin");

    try {
        const adminDoc = await getDoc(adminRef);

        if (adminDoc.exists()) {
            console.log("Usuario admin ya existe en Firestore.");
            return;
        }

        console.log("Usuario admin no encontrado en Firestore. Creando...");

        const adminUser = {
            id: 1,
            name: "admin",
            email: "desenvolupador@iesjoanramis.org",
            password: "Ramis.20", 
            role: "admin",  
            edit_users: true,
            edit_news: true,
            edit_bone_files: true,
            active: true,
            is_first_login: true,
        };

        await createUserWithEmailAndPassword(auth, adminUser.email, adminUser.password)
            .then(async (userCredential) => {
                const user = userCredential.user;

                await setDoc(adminRef, {...adminUser,uid: user.uid, });

                console.log("Usuario admin creado correctamente en Firebase Authentication y Firestore.");
            })
            .catch((error) => {
                console.error("Error al crear el usuario admin en Firebase Authentication:", error.message);
            });

    } catch (error) {
        console.error("Error al acceder a Firestore para verificar al admin:", error);
    }
}

document.addEventListener("DOMContentLoaded", createAdminUser);

