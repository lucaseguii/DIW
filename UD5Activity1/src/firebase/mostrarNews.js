import { db } from "./firebase.js";
import { collection, getDocs, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

$(document).ready(function () {
    console.log("Página cargada correctamente.");

    loadNews();

    async function loadNews() {
        try {
            const newsRef = collection(db, "news");
            const snapshot = await getDocs(newsRef);
            const newsList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data() 
            }));

            $('#news-container').empty();

            newsList.forEach(news => {
                const title = news.title;
                const text = news.text;

                const newsElement = `
                <div class="news-item" id="news-${news.id}">
                    <a href="detallesNews.html?id=${news.id}">
                        <h4>${title}</h4>
                        <p>${text}</p>
                    </a>
                    <div class="news-buttons">
                        <button class="edit-button" onclick="editNews('${news.id}')">Editar</button>
                        <button class="delete-button" onclick="deleteNews('${news.id}')">Eliminar</button>
                    </div>
                </div>
                `;

                $('#news-container').append(newsElement);
            });
        } catch (error) {
            console.error("Error al cargar las noticias:", error);
        }
    }

    window.deleteNews = async function(newsId) {
        try {
            const newsDocRef = doc(db, "news", newsId);
            await deleteDoc(newsDocRef);
            console.log("Noticia eliminada correctamente de Firestore");

            $(`#news-${newsId}`).remove();
        } catch (error) {
            console.error("Error al eliminar la noticia:", error);
        }
    }

    window.editNews = function(newsId) {
        console.log(`🖊️ Editando noticia con ID: ${newsId}`);
        window.location.href = `news_editor.html?id=${newsId}`; 
    };
    
});
