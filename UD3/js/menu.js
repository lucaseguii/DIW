document.addEventListener("DOMContentLoaded", function() {
    const menuIcon = document.querySelector(".menu-icon"); // Cambié a querySelector para mayor consistencia
    const menu = document.getElementById("menu");

    // Función para alternar la visibilidad del menú
    menuIcon.addEventListener("click", function() {
        menu.classList.toggle("active");
        menuIcon.classList.toggle("active"); // Opcional: cambia la apariencia del icono
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
});
