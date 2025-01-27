$(function () {
  const author = "Luca Segui";
  let isEditing = false;
  let editingPostId = null;

  // Hacer los elementos de la toolbox arrastrables
  $(".tool").draggable({
    helper: "clone",
    revert: "invalid"
  });

  // Hacer las columnas droppables
  function initializeDroppable() {
    $(".column").droppable({
      accept: ".tool",
      drop: function (event, ui) {
        const type = ui.draggable.data("type");

        // Limitar el número de elementos en columnas
        if ($(this).children().length >= 2 && $(this).hasClass("half") || 
            $(this).children().length >= 1 && !$(this).hasClass("half")) {
          alert("Límite de elementos alcanzado.");
          return;
        }

        // Crear elementos según su tipo
        const newElement = type === "paragraph" 
          ? $(`<div class="element"><p class="editable" onclick="editParagraph(this)">Escribe aquí tu texto...</p></div>`) 
          : $(`<div class="element"><input type="file" accept="image/*" onchange="loadImage(event)" /><img src="" alt="" style="display: none; width: 100%; height: auto;" /></div>`);

        $(this).append(newElement);
        makeElementsDraggable();
      }
    });
  }

  // Hacer elementos arrastrables
  function makeElementsDraggable() {
    $(".element").draggable({
      helper: "original",
      revert: "invalid"
    });
  }

  // Cargar datos de edición desde localStorage
  const post = JSON.parse(localStorage.getItem("editPost"));
  if (post) {
    isEditing = true;
    editingPostId = post.id;
    $("#news-title").val(post.title);
    $("#news-description").val(post.description);

    // Reconstruir contenido del post
    post.content.forEach((row, rowIndex) => {
      row.forEach((column, colIndex) => {
        column.forEach(element => {
          const newElement = element.type === "paragraph" 
            ? $(`<div class="element"><p class="editable" onclick="editParagraph(this)">${element.content}</p></div>`) 
            : $(`<div class="element"><img src="${element.src}" alt="Image" style="width: 100%; height: auto;" /></div>`);
          $(`.column:eq(${colIndex})`).append(newElement);
        });
      });
    });
  }

  // Eliminar filas
  function initializeDeleteButtons() {
    $(".delete-row-btn").off("click").on("click", function () {
      $(this).closest(".row").remove();
    });
  }

  // Agregar filas al builder
  $("#add-row").on("click", function () {
    const columnCount = $("#column-choice").val();
    const newRow = columnCount === "1" 
      ? `<div class="row"><div class="column"></div><button class="delete-row-btn">Eliminar fila</button></div>` 
      : `<div class="row"><div class="column half"></div><div class="column half"></div><button class="delete-row-btn">Eliminar fila</button></div>`;
    $("#builder .row-container").append(newRow);

    initializeDroppable();
    initializeDeleteButtons();
  });

  // Guardar configuración en localStorage
  $("#save-config").on("click", function () {
    const rows = [];
    $(".row").each(function () {
      const row = [];
      $(this).find(".column").each(function () {
        const column = [];
        $(this).children(".element").each(function () {
          if ($(this).find("p").length) {
            column.push({ type: "paragraph", content: $(this).find("p").text() });
          } else if ($(this).find("img").length) {
            column.push({ type: "image", src: $(this).find("img").attr("src") || "" });
          }
        });
        row.push(column);
      });
      rows.push(row);
    });

    localStorage.setItem("postBuilderConfig", JSON.stringify({ title: $("#news-title").val(), description: $("#news-description").val(), author, rows }));
    alert("Configuración guardada.");
  });

  // Publicar post
  $("#publish-post").on("click", function () {
    const rows = [];
    $(".row").each(function () {
      const row = [];
      $(this).find(".column").each(function () {
        const column = [];
        $(this).children(".element").each(function () {
          if ($(this).find("p").length) {
            column.push({ type: "paragraph", content: $(this).find("p").text() });
          } else if ($(this).find("img").length) {
            column.push({ type: "image", src: $(this).find("img").attr("src") || "" });
          }
        });
        row.push(column);
      });
      rows.push(row);
    });

    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const post = {
      id: isEditing ? editingPostId : `post-${Date.now()}`,
      title: $("#news-title").val(),
      description: $("#news-description").val(),
      content: rows,
      author
    };

    if (isEditing) {
      const postIndex = posts.findIndex(p => p.id === editingPostId);
      if (postIndex !== -1) posts[postIndex] = post;
    } else {
      posts.push(post);
    }

    localStorage.setItem("posts", JSON.stringify(posts));
    alert("Noticia guardada.");
    window.location.href = "noticias.html";
  });

  initializeDroppable();
});

// Manejar carga de imágenes
function loadImage(event) {
  const reader = new FileReader();
  reader.onload = function () {
    const img = $(event.target).siblings("img");
    img.attr("src", reader.result).show();
    $(event.target).hide();
  };
  reader.readAsDataURL(event.target.files[0]);
}

// Editar párrafo
function editParagraph(paragraph) {
  const $p = $(paragraph);
  const input = $(`<input type="text" value="${$p.text()}" />`);
  input.on("blur", function () {
    $p.text($(this).val()).show();
    $(this).remove();
  });
  $p.hide().after(input);
  input.focus();
}
