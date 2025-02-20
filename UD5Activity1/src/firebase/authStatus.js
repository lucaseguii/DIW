import { auth  } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.getElementById("login-button");
    const loginLink = document.getElementById("login-link");
    const userStatus = document.getElementById("user-status");

    if (!loginButton || !loginLink) {
        console.error("No se encontraron los elementos de botón de login o enlace.");
        return;
    }

    onAuthStateChanged(auth, (user) => {
        console.log("Estado de autenticación:", user); 
        
        if (user) {
            console.log("Usuario autenticado:", user.email);  
            loginButton.textContent = "Tancar Sessió";
            loginLink.href = "#"; 


            loginButton.onclick = () => {
                signOut(auth)
                    .then(() => {
                        console.log("Sesión cerrada con éxito.");
                        window.location.href = "/DIW/UD5Activity1/src/views/login.html";
                    })
                    .catch((error) => {
                        console.error("Error al cerrar sesión:", error);
                    });
            };
        } else {
            console.log("No hay usuario autenticado."); 
            loginButton.textContent = "Iniciar Sessió";
            loginLink.href = "/DIW/UD5Activity1/src/views/login.html";
        }
    });
});
