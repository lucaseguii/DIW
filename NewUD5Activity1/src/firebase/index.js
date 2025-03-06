import { usersdb, createAdmin, updateUserPassword, saveUser } from './firebase.js';

$(document).ready(async function() {
    //administrador
    const saltPassword = "Ramis.20";
    const hash = CryptoJS.SHA256(saltPassword).toString(); 

    try {
        const users = await usersdb(); 
     if (users.length === 0) { 
            const adminUser = {
                id: 1,
                name: "admin",
                email: "desenvolupador@iesjoanramis.org",
                password: hash, 
                edit_users: true,
                edit_news: true,
                edit_bone_files: true,
                active: true,
                is_first_login: true,
        };

            const result = await createAdmin(adminUser);
            console.log("Usuario admin agregado:", result);
        }
    } catch {
        console.log("Error al crear usuario admin");
      } 
      //mostrsar usuarios
      const loadUsers = async () => {
        try {
            const users = await usersdb(); 
            const userTableBody = $("#user-table-body");
            userTableBody.empty();
            users.forEach(user => {
                const userRow = $("<tr>");
                const userNameColumn = $("<td>").text(user.name);
                const userEmailColumn = $("<td>").text(user.email);
                const userPasswordColumn = $("<td>").text(user.password);
                const userPermissionsColumn = $("<td>").text(
                    (user.editUsers ? "Editar usuarios" : "") +
                    (user.editNews ? ", Editar noticias" : "") +
                    (user.editFiles ? ", Editar archivos" : "")
                );

                userRow.append(userNameColumn, userEmailColumn, userPasswordColumn, userPermissionsColumn);
                userTableBody.append(userRow);
            });

        } catch (error) {
            console.error("Error al cargar usuarios:", error);
            $("#user-table-body").text("Error lista de usuarios.");
        }
    };
    loadUsers(); 

      //boton de iniciar sesion
      $(document).on("click", "#login-form-button", async function (e) {  
        e.preventDefault();
        const email = $("#email").val();
        const password = $("#password").val(); 
        const hashedPassword = CryptoJS.SHA256(password).toString(); 
        const users = await usersdb();
        const user = users.find(user => user.email === email && user.password === hashedPassword); 

        if(user){
            if (user.is_first_login) {
                $("#message").text("Primera vez iniciando sesión cambia tu contraseña.").css("color", "green");
                console.log("Primer inicio de sesión");
                window.location.href = "../views/canviarfirstpass.html"; 
            } else {
                $("#message").text("Inicio de sesión correcte").css("color", "green");
                console.log("Inicio de sesión correcte");
                console.log("Usuari: ", user.email);
            setTimeout(() => {
                    window.location.href = "../views/adminpage.html"; 
                }, 2000);
            }
        }else{
            $("#message").text("Correu electronic o contrasenya incorrectes").css("color", "red");
        }


    });
    //cambiar contraseña
    $(document).on("submit", "#change-password-form", async function (e) {
        e.preventDefault();
        const newPassword = $("#password").val(); 
        const confirmNewPassword = $("#confirm-password").val(); 
    
        if (newPassword !== confirmNewPassword) {
            $("#message").text("No coinciden").css("color", "red");
            return;
        }
        const email = $("#email").val();
        const hashedNewPassword = CryptoJS.SHA256(newPassword).toString(); 
    
        try {
            const users = await usersdb(); 
            console.log("Usuarios en bd:", users);
    
            const userUpdate = users.find(user => user.email === email);
            if (!userUpdate) {
                $("#message").text("Usuario no encontrado").css("color", "red");
                return;
            }
            await updateUserPassword(email, hashedNewPassword); 
            $("#message").text("Contraseña cambiada correctamente").css("color", "green");
            setTimeout(() => {
                window.location.href = "../views/adminpage.html"; 
            }, 2000);
        } catch (error) {
            $("#message").text("Error al actualizar la contraseña").css("color", "red");
            console.error(error);
        }
    });

    //usuario nuevoe
    $(".newuser-form").on("submit", async function (e) {
        e.preventDefault();
        const newUserName = $("#nom").val();
        const newUserEmail = $("#email").val();
        const newUserPassword = $("#password").val();
        const newEditUsers = $("#edit_users").is(":checked");
        const newEditNews = $("#edit_news").is(":checked");
        const newEditFiles = $("#edit_bone_files").is(":checked");
        const hashedUserPassword = CryptoJS.SHA256(newUserPassword).toString(); 
        
        const newUser = {
            name: newUserName,
            email: newUserEmail,
            password: hashedUserPassword,
            editUsers: newEditUsers,
            editNews: newEditNews,
            editFiles: newEditFiles,
            active: true,
            is_first_login: true 
        };
        try {
            await saveUser(newUser.name, newUser.email, newUser.password, newUser.active, newUser.editUsers, newUser.editNews, newUser.editFiles); // Guardar el nuevo usuario
            $("#message").text("Usuario añadido correctamente").css("color", "green");
            loadUsers(); 
        } catch (error) {
            $("#message").text("Error al añadir el usuario").css("color", "red");
            console.log("Error al añadir el usuario");
        }
    });
    });
