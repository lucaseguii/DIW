import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector(".login-form");
    const messageDiv = document.getElementById("message");

    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault(); 

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user; 

                const userRef = doc(db, "users", "admin"); 
                const userDoc = await getDoc(userRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    if (userData.role === "admin") {
                        messageDiv.innerHTML = "<p style='color: green;'>Inici de sessió correcte! Redirigint...</p>";
                        setTimeout(() => {
                            window.location.href = "/DIW/UD5Activity1/src/views/adminpage.html"; 
                        }, 2000);
                    } else {
                        messageDiv.innerHTML = "<p style='color: red;'> No tienes permisos de administrador.</p>";
                    }
                } else {
                    messageDiv.innerHTML = "<p style='color: red;'>Usuario no encontrado en Firestore.</p>";
                }

            } catch (error) {
                console.error("Error de autenticación:", error); 
                if (error.code === 'auth/wrong-password') {
                    messageDiv.innerHTML = "<p style='color: red;'>Contraseña incorrecta.</p>";
                } else if (error.code === 'auth/user-not-found') {
                    messageDiv.innerHTML = "<p style='color: red;'>Usuario no encontrado.</p>";
                } else {
                    messageDiv.innerHTML = `<p style='color: red;'>Error: ${error.message}</p>`;
                }
            }
        });
    }
});
