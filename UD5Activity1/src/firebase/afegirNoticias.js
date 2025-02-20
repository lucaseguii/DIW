import { db } from "./firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

$(document).ready(function () {

    $('.newuser-form').on('submit', async function (event) {
        event.preventDefault(); 

        const titulo = $('#titulo').val();
        const autor = $('#autor').val();
        const subtitulo = $('#subtitulo').val();
        const texto = $('#texto').val();

        if (!titulo || !autor || !subtitulo || !texto) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        try {
            const newsRef = collection(db, "news");
            await addDoc(newsRef, {
                title: titulo,
                author: autor,
                subtitle: subtitulo,
                text: texto,
                createdAt: new Date() 
            });

            $('#titulo').val('');
            $('#autor').val('');
            $('#subtitulo').val('');
            $('#texto').val('');

            alert("Notícia afegida correctament.");

            loadNews();

        } catch (error) {
            console.error("Error al añadir la noticia:", error);
        }
    });
});
