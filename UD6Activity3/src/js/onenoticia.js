document.addEventListener('DOMContentLoaded', function () {
  // Obtener el ID de la noticia desde la URL
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id'); // ID de la noticia

  if (!postId) {
      // Redirigir si no se encuentra un ID en la URL
      alert("No se ha encontrado la noticia.");
      window.location.href = '/DIW/UD6Activity3/src/views/noticias.html';
      return;
  }

  // Obtener las noticias desde localStorage
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  const post = posts.find(p => p.id === postId); // Buscar la noticia con el ID

  if (!post) {
      // Redirigir si no se encuentra la noticia
      alert("Noticia no encontrada.");
      window.location.href = '/DIW/UD6Activity3/src/views/noticias.html';
      return;
  }

  // Contenedor para mostrar la noticia completa
  const newsDetailContainer = document.getElementById('news-detail-container');

  // Título de la noticia
  const title = document.createElement('h1');
  title.classList.add('text-4xl', 'font-semibold', 'text-center', 'p-6', 'm-0', 'font-montserrat');
  title.textContent = post.title;

  // Descripción de la noticia
  const description = document.createElement('p');
  description.classList.add('text-gray-700', 'font-roboto');
  description.textContent = post.description;

  // Contenido de la noticia (imágenes y párrafos)
  const contentContainer = document.createElement('div');
  contentContainer.classList.add('p-8');

  if (post.content) {
      post.content.forEach(row => {
          row.forEach(column => {
              column.forEach(element => {
                  // Añadir imágenes
                  if (element.type === 'image') {
                      const image = document.createElement('img');
                      image.src = element.src;
                      image.alt = `Imagen Notícia ${post.title}`;
                      image.classList.add('w-50', 'h-80', 'mr-6');
                      contentContainer.appendChild(image);
                  }
                  // Añadir párrafos
                  else if (element.type === 'paragraph') {
                      const paragraph = document.createElement('p');
                      paragraph.classList.add('text-gray-700', 'font-roboto');
                      paragraph.textContent = element.content;
                      contentContainer.appendChild(paragraph);
                  }
              });
          });
      });
  }

  // Añadir los elementos al contenedor principal
  newsDetailContainer.appendChild(title);
  newsDetailContainer.appendChild(description);
  newsDetailContainer.appendChild(contentContainer);
});
