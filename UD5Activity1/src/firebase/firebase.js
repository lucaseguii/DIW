import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, setPersistence, browserLocalPersistence } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-storage.js"; 
const firebaseConfig = {
  apiKey: "AIzaSyCCOvkPd5i74a3trR_Cj9D7nCG9ElUjjOA",
  authDomain: "balena-db.firebaseapp.com",
  projectId: "balena-db",
  storageBucket: "balena-db.firebasestorage.app",
  messagingSenderId: "216042087275",
  appId: "1:216042087275:web:d93447e54f5046e2b7622e",
  measurementId: "G-7X5434SCPT"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app); 


setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    console.error("Error al establecer la persistencia:", error);
  });

export { app, db, auth, storage };
