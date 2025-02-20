document.addEventListener('DOMContentLoaded', function () { 
  // Obtener las noticias desde localStorage
  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  // Contenedor para mostrar las noticias
  const newsContainer = document.getElementById('news-container');

  // Mostrar mensaje si no hay noticias
  if (posts.length === 0) {
    newsContainer.innerHTML = '<p>No hay noticias publicadas aún.</p>';
    return;
  }

  // Mostrar cada noticia
  posts.forEach(post => {
    const articleElement = document.createElement('div');
    articleElement.classList.add('news-item');

    const articleLink = document.createElement('a');
    articleLink.classList.add('news-link');

    const articleCard = document.createElement('div');
    articleCard.classList.add('news-card');

    // Título de la noticia con evento de redirección
    const title = document.createElement('h2');
    title.addEventListener('click', () => {
      window.location.href = `/DIW/UD6Activity3/src/views/onenoticia.html?id=${post.id}`;
    });
    title.classList.add('news-title');
    title.textContent = post.title;

    // Descripción de la noticia con evento de redirección
    const description = document.createElement('p');
    description.addEventListener('click', () => {
      window.location.href = `/DIW/UD6Activity3/src/views/onenoticia.html?id=${post.id}`;
    });
    description.classList.add('news-description');
    description.textContent = post.description;

    // Contenedor para contenido (solo primera imagen)
    const contentContainer = document.createElement('div');
    contentContainer.addEventListener('click', () => {
      window.location.href = `/DIW/UD6Activity3/src/views/onenoticia.html?id=${post.id}`;
    });
    contentContainer.classList.add('news-content');

    // Mostrar solo la primera imagen del contenido
    if (post.content) {
      let imageAdded = false;
      post.content.forEach(row => {
        row.forEach(column => {
          column.forEach(element => {
            if (element.type === 'image' && !imageAdded) {
              const image = document.createElement('img');
              image.src = element.src; 
              image.alt = `Imagen Noticia ${post.title}`;
              image.classList.add('news-image');
              contentContainer.appendChild(image);
              imageAdded = true;
            }
          });
        });
      });
    }

    // Crear botones de editar y eliminar
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    const editButton = document.createElement('button');
    editButton.classList.add('edit-btn');
    editButton.innerHTML = '<i class="fas fa-edit"></i> Editar';
    editButton.addEventListener('click', () => {
      localStorage.setItem('editPost', JSON.stringify(post)); // Guardar noticia en modo edición
      window.location.href = '../views/news_editor.html'; // Redirigir al editor
    });

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i> Eliminar';
    deleteButton.addEventListener('click', () => {
      if (confirm(`¿Estás seguro de que deseas eliminar la noticia: ${post.title}?`)) {
        // Eliminar noticia del localStorage
        posts = posts.filter(p => p.id !== post.id);
        localStorage.setItem("posts", JSON.stringify(posts));

        // Eliminar la noticia del DOM
        articleElement.remove();
        alert(`Noticia "${post.title}" eliminada.`);
      }
    });

    // Ensamblar tarjeta de la noticia
    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);
    articleCard.appendChild(title);
    articleCard.appendChild(description);
    articleCard.appendChild(contentContainer);
    articleCard.appendChild(buttonContainer);
    articleLink.appendChild(articleCard);
    articleElement.appendChild(articleLink);

    // Añadir al contenedor de noticias
    newsContainer.appendChild(articleElement);
  });
});
