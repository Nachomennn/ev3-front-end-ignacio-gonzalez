// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"
//funciones de firestore
import { addDoc, collection, deleteDoc, doc, getDoc, getFirestore, onSnapshot, query, where, getDocs, updateDoc  } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"
// TODO: Documentación
// https://firebase.google.com/docs/web/setup#available-libraries

// Configuración de su app
const firebaseConfig = {
    apiKey: "AIzaSyCvF3oaAZeq2Zuydp1DAQvLZNeSv2YXfzc",
    authDomain: "proyecto-f1-86474.firebaseapp.com",
    projectId: "proyecto-f1-86474",
    storageBucket: "proyecto-f1-86474.appspot.com",
    messagingSenderId: "910083954020",
    appId: "1:910083954020:web:bbbd201d62c2c995c2d671"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
//getFirestore es la función que permite trae la base de datos para su utilización
const db = getFirestore(app);
//save es una función creada que invoca la función de firestore para gaurdar
export const save = async (emp) => {
    const run = emp.run;
    const q = query(collection(db, 'Empleados'), where('run', '==', run));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
        await addDoc(collection(db, 'Empleados'), emp)
    } else {
        Swal.fire({
            title: "Error",
            text: "El código ya existe. Por favor, elija otro.",
            icon: "error"
        })
    }
}

//función para cargar todos los documentos de la colección
export const getAll = (data) => {
    //onSnapshot es una función de firestore que permite cargar los documentos en tiempo real
    onSnapshot(collection(db, 'Empleados'), data)
}

//función remove permite eliminar un documento según su id
export const remove = (id) => {
    //doc es la función de firestore que busca un documento según su id
    //deleteDoc es la función de firestore que permite eliminar el documento
    deleteDoc(doc(db, 'Empleados', id))
}

//selectOne es una función que permite seleccionar un documento
//getDoc es la función de firestore que permite retornar un documento seleccionado
export const selectOne = (id) => getDoc(doc(db, 'Empleados', id))

//FALTA FUNCIÓN EDITAR
export const update = async (id, emp) => {
    const run = emp.run;
    const q = query(collection(db, 'Empleados'), where('run', '==', run));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty || querySnapshot.docs[0].id === id) {
        await updateDoc(doc(db, 'Empleados', id), emp);
        Swal.fire({
            title: "Actualizado!",
            text: "Su registro ha sido actualizado",
            icon: "success"
        })
    } else {
        Swal.fire({
            title: "Error",
            text: "Error al actualizar",
            icon: "error"
        })
    }
};
