import { saveNews, getNews, db } from '../firebase/firebase.js';

// Función para editar párrafos
function editParagraph(paragraph) {
    const $p = $(paragraph);
    const currentText = $p.text();
    const input = $(`<input type="text" value="${currentText}" />`);

    input.on("blur", function() {
        const newText = $(this).val();
        $p.text(newText);
        $p.show();
        $(this).remove();
    });

    $p.hide();
    $p.after(input);
    input.focus();
}

// Adjuntar la función al objeto window
window.editParagraph = editParagraph;

// Función para cargar imágenes
function loadImage(event) {
    const input = event.target;
    const reader = new FileReader();
    reader.onload = function() {
        const img = $(input).siblings("img");
        img.attr("src", reader.result);
        img.show();
        $(input).hide();
    };
    reader.readAsDataURL(input.files[0]);
}

// Adjuntar la función al objeto window
window.loadImage = loadImage;

$(function() { 
    // Hacer los elementos de la toolbox arrastrables
    $(".tool").draggable({
        helper: "clone",
        revert: "invalid"
    });

    function initializeDroppable() {
        $(".column").droppable({
            accept: ".tool",
            drop: function(event, ui) {
                const type = ui.draggable.data("type");
                if ($(this).children().length >= 2 && $(this).hasClass("half")) {
                    alert("Solo se permiten dos elementos por columna.");
                    return;
                }
                if ($(this).children().length >= 1 && !$(this).hasClass("half")) {
                    alert("Solo se permite un elemento en esta columna.");
                    return;
                }

                let newElement;
                if (type === "paragraph") {
                    newElement = $(`
                        <div class="element">
                            <p class="editable" onclick="editParagraph(this)">Escribe aquí tu texto...</p>
                        </div>
                    `);
                } else if (type === "image") {
                    newElement = $(`
                        <div class="element">
                            <input type="file" accept="image/*" onchange="loadImage(event)" />
                            <img src="" alt="Imagen" style="display: none;">
                        </div>
                    `);
                }

                $(this).append(newElement);
                makeElementsDraggable();
            }
        });
    }

    function makeElementsDraggable() {
        $(".element").draggable({
            helper: "original",
            revert: "invalid"
        });
    }

    // Añadir fila
    $("#add-row").on("click", function() {
        const columnCount = $("#column-choice").val();
        let newRow = '<div class="row">';

        if (columnCount === "1") {
            newRow += `<div class="column"></div>`;
        } else {
            newRow += `
                <div class="column half"></div>
                <div class="column half"></div>`;
        }

        newRow += `
            <button class="delete-row-btn">Eliminar fila</button>
        </div>`;
        $("#builder .row-container").append(newRow);

        initializeDroppable();
        initializeDeleteButtons();
    });

    // Inicializar botones de eliminación de filas
    function initializeDeleteButtons() {
        $(".delete-row-btn").off("click").on("click", function() {
            $(this).closest(".row").remove();
        });
    }

    // Guardar configuración en Local Storage
    $("#save-config").on("click", function() {
        const rows = [];
        const title = $("#news-title").val();  // Capturar el título

        $(".row").each(function() {
            $(this).find(".column").each(function() {
                $(this).children(".element").each(function() {
                    if ($(this).find("p").length) {
                        rows.push({
                            type: "paragraph",
                            content: $(this).find("p").text()
                        });
                    } else if ($(this).find("img").length) {
                        rows.push({
                            type: "image",
                            src: $(this).find("img").attr("src")
                        });
                    }
                });
            });
        });

        const config = {
            title: title,  
            content: rows
        };

        // Guardar en Local Storage
        localStorage.setItem('newsConfig', JSON.stringify(config));
        alert("Configuración guardada en Local Storage.");
    });

    // Cargar configuración desde Local Storage
    $("#load-config").on("click", function() {
        const config = JSON.parse(localStorage.getItem('newsConfig'));

        if (config) {
            $(".row-container").empty(); // Limpiar todo antes de cargar

            // Cargar el título
            $("#news-title").val(config.title);  

            config.content.forEach(element => {
                let newRow = '<div class="row">';
                if (element.type === "paragraph") {
                    newRow += `
                        <div class="element">
                            <p class="editable" onclick="editParagraph(this)">${element.content}</p>
                        </div>`;
                } else if (element.type === "image") {
                    newRow += `
                        <div class="element">
                            <img src="${element.src}" alt="Imagen">
                        </div>`;
                }
                newRow += `<button class="delete-row-btn">Eliminar fila</button></div>`;
                $(".row-container").append(newRow);
            });

            initializeDroppable();
            initializeDeleteButtons();
        } else {
            alert("No hay configuración guardada en Local Storage.");
        }
    });

    // Publicar noticia en Firestore
    $("#publish-news").on("click", function() {
        const rows = []; //content
        const title = $("#news-title").val();  

        $(".row").each(function() {
            $(this).find(".column").each(function() {
                $(this).children(".element").each(function() {
                    if ($(this).find("p").length) {
                        rows.push({
                            type: "paragraph",
                            content: $(this).find("p").text() //texto del parradfo
                        });
                    } else if ($(this).find("img").length) {
                        rows.push({
                            type: "image",
                            src: $(this).find("img").attr("src")
                        });
                    }
                });
            });
        });

        const news = {
            title: title,
            content: rows
        };

        // Guardar en Firestore
        saveNews(news.title, news.content)
            .then(function(newDoc) { //si se guarda 
                if (newDoc) {
                    console.log("Noticia publicada con ID: ", newDoc.id);
                } else {
                    console.error("Error al publicar la noticia");
                }
            })
            .catch(function(error) {
                console.error("Error al publicar la noticia: ", error);
            });
    });

    // Cargar noticias desde Firestore y mostrarlas
    async function loadNews() {
        const noticiasContainer = $("#noticiasfirebase");
        const noticias = await getNews();

        noticias.forEach(noticia => {//verificam si son arrays, la recorre, i  si ho son despuse mir si es items son paragrafs o imatges 
            const contentText = Array.isArray(noticia.content) ? noticia.content.map(item => item.type === 'paragraph' ? item.content : '').join(' ') : ''; //parrafos junts si es un array
            const imageUrl = Array.isArray(noticia.content) ? noticia.content.find(item => item.type === 'image')?.src || '/DIW/NewUD5Activity1/src/img/articlenews.jpg' : '/DIW/NewUD5Activity1/src/img/articlenews.jpg';//imatge per defecte si no se troba

            const noticiaElement = $(`
                <a href="/DIW/NewUD5Activity1/src/views/onenoticia.html" class="block">
                    <div class="bg-div p-4 rounded-lg shadow-lg border border-borderdiv flex flex-col justify-center text-center">
                        <h2 class="text-2xl font-semibold mb-2 font-montserrat">${noticia.title}</h2>
                        <p class="text-gray-700 mb-4 font-roboto">${contentText}</p>
                        <img src="${imageUrl}" alt="Imagen Notícia" class="w-70 h-48 object-contain rounded-md">
                    </div>
                </a>
            `);
            noticiasContainer.append(noticiaElement); //afegir noticia al div
        });
    }

    loadNews();

    initializeDroppable();
});

