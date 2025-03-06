// Importar las funciones necesarias del SDK de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCCOvkPd5i74a3trR_Cj9D7nCG9ElUjjOA",
  authDomain: "balena-db.firebaseapp.com",
  projectId: "balena-db",
  storageBucket: "balena-db.firebasestorage.app",
  messagingSenderId: "216042087275",
  appId: "1:216042087275:web:d93447e54f5046e2b7622e",
  measurementId: "G-7X5434SCPT"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export const usersdb = async () => {
  const querySnapshot = await getDocs(collection(db, "users")); 
  return querySnapshot.docs.map(doc => doc.data()); //dades de cada doc
};

// Administrador
export const createAdmin = async (adminUser) => {
  try {
    await addDoc(collection(db, "users"), adminUser);
    console.log("Usuario administrador creado");
  } catch {
    console.log("Error al crear el admin");
  } 
};

// Guardar nou usuaris
export const saveUser = async (newUserName, newUserEmail, newUserPassword, newEditUsers, newEditNews, newEditFiles) => {
  try {
    await addDoc(collection(db, "users"), {
      name: newUserName,
      email: newUserEmail,
      password: newUserPassword,
      editUsers: newEditUsers,
      editNews: newEditNews,
      editFiles: newEditFiles,
      is_first_login: true, 
      active: true
    });
    console.log("Usuario guardado");
  } catch {
    console.log("Error al guardar usuario");
  }
};

// Actualizar contraseña del usuari
export const updateUserPassword = async (email, newPassword) => {
  try {
    const usersCollection = collection(db, "users");
    const usersDocuments = await getDocs(usersCollection);
    let userFound = false;
    for (const userDoc of usersDocuments.docs) {
      const datosUser = userDoc.data();
      if (datosUser.email === email) {
        const userDocument = doc(db, "users", userDoc.id);
        await updateDoc(userDocument, { password: newPassword, is_first_login: false });
        console.log("Contraseña actualizada correctamente");
        userFound = true;
        break;  
      }}
    if (!userFound) {
      throw new Error("Usuario no encontrado");
    }
  } catch (error) {
    console.error("Error al actualizar la contraseña:", error);
    throw error;
  }
};

// Guardar noticias
export const saveNews = async (newsTitle, newsContent) => {
  try {
    const newDoc = await addDoc(collection(db, "news"), {
      title: newsTitle, content: newsContent
    });
    return newDoc;
  } catch (error) {
    console.error("Error al guardar la noticia: ", error);
  }
};

// Obtenir noticias
export const getNews = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "news")); 
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); //id, titul i content
  } catch (error) {
    console.error("Error al obtener les noticias: ", error);
  }
};

export { db };



