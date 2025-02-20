$(document).ready(function () {
    const loginButton = $(".login-button");
    const user = JSON.parse(localStorage.getItem("user"));
    const adminContainer = $("#admin-container");

    if (!user || !user.loggedIn) {
        adminContainer.html("<p>Error: No s'ha trobat l'usuari o no està loguejat.</p>");
        return;
    }

    // Cambiar el texto del botón en la página de administración
    loginButton.text("Tancar Sessió");

    // Event listener para cerrar sesión
    loginButton.on("click", function () {
        user.loggedIn = false; // Cambiar el estado de logueo
        localStorage.setItem("user", JSON.stringify(user)); // Guardar el estado actualizado en localStorage
        window.location.href = "/DIW/UD6Activity3/src/views/login.html"; // Redirigir a la página de login
    });

    // Mostrar el contenido de la página de administración según los permisos del usuario
    adminContainer.append(`
        <h1>Pàgina de l'admin</h1>
        <div class="secadminpage">
            <!-- Gestión de usuarios, noticias y archivos -->
            ${user.edit_users ? `
            <section id="user-management">
                <h3>Gestió d'usuaris</h3>
                <button id="add-user"><a href="/DIW/UD6Activity3/src/views/afegirusuari.html">Afegir Usuari</a></button>
                <div id="user-list"></div>
            </section>` : ''}

            ${user.edit_news ? `
            <section id="news-management">
                <h3>Gestió de notícies</h3>
                <button id="add-news"><a href="/DIW/UD6Activity3/src/views/news_editor.html">Afegir Notícia</a></button>
                <div id="news-list"></div>
            </section>` : ''}

            ${user.edit_bone_files ? `
            <section id="bone-files-management">
                <h3>Gestió de fitxes</h3>
                <button id="add-file"><a href="/DIW/UD6Activity3/src/views/afegirfitxes.html">Afegir Fitxa</a></button>
                <div id="file-list"></div>
            </section>` : ''}
        </div>
    `);
});
