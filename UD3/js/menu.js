document.addEventListener("DOMContentLoaded", function() {
    const menuIcon = document.querySelector(".menu-icon");
    const menu = document.getElementById("menu");
    
    // Selecciona el quinto elemento de la lista
    const fifthItem = document.querySelectorAll(".menu-options li")[4];

    // Función para alternar la visibilidad del menú
    menuIcon.addEventListener("click", function() {
        menu.classList.toggle("active");
        menuIcon.classList.toggle("active");
    });

    // Cierra el menú al hacer clic en los enlaces
    document.querySelectorAll('.menu-options a').forEach(function(link) {
        link.addEventListener('click', function() {
            menu.classList.remove('active');
            menuIcon.classList.remove('active');
        });
    });

    // Cierra el menú al hacer clic en los enlaces del submenú
    document.querySelectorAll('.submenu a').forEach(function(link) {
        link.addEventListener('click', function() {
            menu.classList.remove('active');
            menuIcon.classList.remove('active');
        });
    });

    // Evento para el quinto li
    fifthItem.addEventListener('click', function() {
        // Verificar si estamos dentro del media query
        if (window.matchMedia("(min-width: 600px)").matches) {
            menu.style.height = "290px"; // Cambia la altura del menú a 290px solo en este media query
        }
    });
});
