$(document).ready(function() {
    const loginForm = $(".login-form");
    const messageDiv = $("#message"); // Div para mostrar mensajes

    loginForm.on("submit", function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe por defecto

        // Limpiar cualquier mensaje previo
        messageDiv.text(""); // Limpiar texto del mensaje
        messageDiv.css("color", ""); // Limpiar color

        // Obtener valores del formulario
        const inputEmail = document.getElementById("email").value.trim();
        const inputPassword = document.getElementById("password").value.trim();

        // Obtener datos de usuario almacenados en `localStorage`
        const storedUser = JSON.parse(localStorage.getItem("user"));

        // Validar usuario
        if (storedUser && storedUser.email === inputEmail) {
            const salt = storedUser.salt;
            const hashedInputPassword = CryptoJS.SHA256(inputPassword + salt).toString();

            if (hashedInputPassword === storedUser.password_hash) {
                storedUser.loggedIn = true; // Marcar como logueado
                localStorage.setItem("user", JSON.stringify(storedUser)); // Guardar el estado del usuario

                // Redirigir según el estado de primer login
                if (storedUser.is_first_login === 1) {
                    messageDiv.text("Inici de sessió correcte. Obligatori canviar la contrasenya.");
                    messageDiv.css("color", "green");
                    setTimeout(() => {
                        window.location.href = "/DIW/UD6Activity2/src/views/canviarfirstpass.html";
                    }, 1500);
                } else {
                    messageDiv.text("Inici de sessió correcte.");
                    messageDiv.css("color", "green");
                    setTimeout(() => {
                        window.location.href = "/DIW/UD6Activity2/src/views/adminpage.html";
                    }, 1500);
                }
            } else {
                messageDiv.text("Error: Usuari o contrasenya incorrectes.");
                messageDiv.css("color", "red");
            }
        } else {
            messageDiv.text("Error: Usuari no trobat.");
            messageDiv.css("color", "red");
        }
    });
});
