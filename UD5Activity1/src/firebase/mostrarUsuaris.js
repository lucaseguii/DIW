import { db } from "./firebase.js";  
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";  

document.addEventListener("DOMContentLoaded", async () => {
    const listaUsuariosDiv = document.querySelector(".lista-usuarios table"); 

    try {
        const querySnapshot = await getDocs(collection(db, "users"));

        querySnapshot.forEach((doc) => {
            const userData = doc.data();
            
            console.log(userData);  

            const userName = userData.name;
            const userEmail = userData.email;
            const userPassword = userData.password;

            const userPermissions = `
                Editar Usuarios: ${userData.edit_users === true ? 'Sí' : 'No'}<br>
                Editar Noticias: ${userData.edit_news === true ? 'Sí' : 'No'}<br>
                Editar Fitxes: ${userData.edit_bone_files === true ? 'Sí' : 'No'}
            `;

            const newRow = document.createElement("tr");

            newRow.innerHTML = `
                <td class="td-users">${userName}</td>
                <td class="td-users">${userEmail}</td>
                <td class="td-users">${userPassword}</td>
                <td class="td-users">${userPermissions}</td>
            `;

            listaUsuariosDiv.appendChild(newRow);
        });

    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
    }
});

