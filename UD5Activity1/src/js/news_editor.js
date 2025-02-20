import { db, storage } from "../firebase/firebase.js";  
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-storage.js";

$(document).ready(function () {
    console.log("jQuery cargado correctamente.");

    $(".tool").draggable({
        helper: "clone",
        revert: "invalid"
    });

    $("#add-row").on("click", function () {
        console.log("Añadiendo nueva fila...");
        const columnCount = $("#column-choice").val();
        let newRow = '<div class="row">';

        if (columnCount === "1") {
            newRow += `<div class="column"></div>`;
        } else {
            newRow += `
                <div class="column half"></div>
                <div class="column half"></div>`;
        }

        newRow += `<button class="delete-row-btn">Eliminar fila</button></div>`;
        $(".row-container").append(newRow);

        initializeDroppable();
        initializeDeleteButtons();
    });

    function initializeDroppable() {
        $(".column").droppable({
            accept: ".tool",
            drop: function (event, ui) {
                const type = ui.helper.attr("data-type"); 
                console.log("Elemento soltado:", type);

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
                            <p class="editable" ondblclick="editParagraph(this)">Escribe aquí tu texto...</p>
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
                console.log("Elemento añadido.");
            }
        });
    }

    function initializeDeleteButtons() {
        $(".delete-row-btn").off("click").on("click", function () {
            console.log("Eliminando fila...");
            $(this).closest(".row").remove();
        });
    }

    $("#publish-post").on("click", async function () {
        console.log("Publicando post...");
        const postData = await getPostData();
    
        console.log("Datos antes de publicar:", postData);
    
        try {
            const docRef = await addDoc(collection(db, "news"), postData);
            console.log(" Noticia guardada con ID:", docRef.id);
            alert("Noticia publicada con éxito.");
        } catch (error) {
            console.error("Error al guardar:", error);
            alert("Error al publicar. Verifica la consola.");
        }
    });
    
    
    async function getPostData() {
        const title = $("#news-title").val();
        const rows = [];
    
        $(".row").each(function () {
            const row = {};
    
            $(this).find(".column").each(function (columnIndex) {
                const columnData = [];
    
                $(this).find(".element").each(function () {
                    const item = {};
    
                    if ($(this).find("p").length) {
                        item.type = "paragraph";
                        item.content = $(this).find("p").text();
                    } 
                    else if ($(this).find("img").length) {
                        item.type = "image";
                        item.src = $(this).find("img").attr("src"); // Base64
                    }
    
                    columnData.push(item); 
                });
    
                row[`column_${columnIndex}`] = columnData;
            });
    
            rows.push(row); 
        });
    
        console.log("Datos antes de publicar:", { title, rows });
    
        return { title, rows }; 
    }
    

    window.loadImage = function(event) {
        const input = event.target;
        const file = input.files[0];
    
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
    
            reader.onload = function () {
                const img = $(input).siblings("img");
                img.attr("src", reader.result); 
                img.show();
                $(input).hide();
            };
    
            reader.readAsDataURL(file); 
        } else {
            alert("Por favor, selecciona una imagen válida.");
        }
    };
    

    window.editParagraph = function(paragraph) {
        const $p = $(paragraph);
        const currentText = $p.text();
        const input = $(`<input type="text" value="${currentText}" class="editable-input" />`);

        input.on("blur", function () {
            const newText = $(this).val();
            $p.text(newText);
            $p.show();
            $(this).remove();
        });

        $p.hide();
        $p.after(input);
        input.focus();
    };

    initializeDroppable();
});
