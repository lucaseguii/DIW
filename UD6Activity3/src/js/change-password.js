document.addEventListener("DOMContentLoaded", function () {
    const changePasswordForm = document.querySelector(".login-form");
    const messageDiv = document.getElementById("message");

    changePasswordForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Obtener las contraseñas nuevas
        const newPassword = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirm-password").value.trim();

        // Limpiar mensajes previos
        if (messageDiv) {
            messageDiv.textContent = "";
            messageDiv.style.color = "";
        }

        // Validar que las contraseñas coincidan
        if (newPassword !== confirmPassword) {
            if (messageDiv) {
                messageDiv.textContent = "Les contrasenyes no coincideixen.";
                messageDiv.style.color = "red";
            }
            return;
        }

        // Obtener usuario almacenado
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser) {
            if (messageDiv) {
                messageDiv.textContent = "Error: Usuari no trobat.";
                messageDiv.style.color = "red";
            }
            return;
        }

        // Generar nuevo salt y hash
        const newSalt = CryptoJS.lib.WordArray.random(16).toString();
        const newHashedPassword = CryptoJS.SHA256(newPassword + newSalt).toString();

        // Actualizar el usuario en localStorage
        storedUser.password_hash = newHashedPassword;
        storedUser.salt = newSalt;
        storedUser.is_first_login = 0; // Marcar que ya no es el primer inicio de sesión

        localStorage.setItem("user", JSON.stringify(storedUser));

        // Mostrar mensaje de éxito y redirigir
        if (messageDiv) {
            messageDiv.textContent = "Contrasenya canviada correctament. Redirigint...";
            messageDiv.style.color = "green";
        }

        setTimeout(() => {
            window.location.href = "/DIW/UD6Activity3/src/views/canviarfirstpass.html";
        }, 1500);
        
    });
});
