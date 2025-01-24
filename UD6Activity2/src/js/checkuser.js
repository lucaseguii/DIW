// Generar una sal
function generateSalt() {
    return CryptoJS.lib.WordArray.random(16).toString(); // Genera una sal aleatoria de 16 bytes
}

// Hashear la contraseña con SHA-256
function hashPassword(password, salt) {
    return CryptoJS.SHA256(password + salt).toString(); // Hash de la contraseña concatenada con la sal
}

// Verificar si hay un usuario en localStorage
if (localStorage.getItem("user") === null) { // Si no existe el usuario en localStorage
    console.log("No se encontró un usuario en localStorage. Creando un usuario...");

    // Generar una nueva sal
    const salt = generateSalt(); 

    // Hashear la contraseña con la sal
    const hashedPassword = hashPassword("Ramis.20", salt); 

    // Definir el objeto de usuario con una bandera loggedIn
    let user = {
        id: 1,
        name: "admin",
        email: "desenvolupador@iesjoanramis.org",
        password_hash: hashedPassword,
        salt: salt, // Guardar la sal junto con el hash
        edit_users: 1,
        edit_news: 1,
        edit_bone_files: 1,
        active: 1,
        is_first_login: 1,
        role: "admin",
        loggedIn: false // Inicialmente no está logueado
    };

    // Guardar el usuario en localStorage
    localStorage.setItem("user", JSON.stringify(user));  
    console.log("Usuario creado y guardado en localStorage");
} else {
    console.log("Ya existe un usuario en localStorage");
}
