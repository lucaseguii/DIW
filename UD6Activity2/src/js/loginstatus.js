$(document).ready(function () {
    const loginButton = $(".login-button");
    const user = JSON.parse(localStorage.getItem("user")); // Obtener el usuario desde localStorage

    // Verificar si el usuario está logueado
    if (user && user.loggedIn) {
        loginButton.text("Tancar Sessió"); // Cambiar el texto del botón si el usuario está logueado
    } else {
        loginButton.text("Iniciar Sessió"); // Si no está logueado, el botón será "Iniciar sesión"
    }

    // Event listener para el botón de "Cerrar sesión"
    loginButton.on("click", function () {
        if (user && user.loggedIn) {
            user.loggedIn = false; // Marcar como no logueado
            localStorage.setItem("user", JSON.stringify(user)); // Guardar el estado actualizado en localStorage
            window.location.href = "/DIW/UD6Activity2/src/views/login.html"; // Redirigir a la página de login
        }
    });
});
