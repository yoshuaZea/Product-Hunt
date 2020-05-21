import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

import firebaseConfig from './config'

class Firebase {
    constructor(){
        // Crear una instancia de firebase
        if(!app.apps.length) app.initializeApp(firebaseConfig);

        // Autenticar el usuario
        this.auth = app.auth()
        this.db = app.firestore()
        this.storage = app.storage()
    }

    // Registra un usuario
    async registrar(nombre, email, password){
        const nuevoUsuario = await this.auth.createUserWithEmailAndPassword(email, password)

        return await nuevoUsuario.user.updateProfile({
            displayName: nombre
        })
    }

    // Iniciar sesión
    async login(email, password){
        return this.auth.signInWithEmailAndPassword(email, password)
    }

    // Cerrar sesión
    async logOut () {
        await this.auth.signOut();
    }
}

const firebase = new Firebase()
export default firebase