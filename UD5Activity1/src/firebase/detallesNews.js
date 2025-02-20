import { db } from "./firebase.js";  
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

window.onload = async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const newsId = urlParams.get('id'); 

    if (newsId) {
        try {
            const newsDocRef = doc(db, "news", newsId);
            const newsSnapshot = await getDoc(newsDocRef);
            if (newsSnapshot.exists()) {
                const news = newsSnapshot.data();
                document.getElementById("news-title").textContent = news.title;
                document.getElementById("news-subtitle").textContent = news.subtitle;
                document.getElementById("news-text").textContent = news.text;
            } else {
                console.log("No se encontró la noticia");
            }
        } catch (error) {
            console.error("Error al cargar los detalles de la noticia:", error);
        }
    } else {
        console.log("No se ha proporcionado un ID de noticia");
    }
};
