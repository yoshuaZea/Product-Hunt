import React, { useState, useEffect, useContext } from 'react'
import { FirebaseContext } from '../firebase'

const useProductos = (orden, tipo) => {
    const [productos, setProductos] = useState([])

    const { firebase } = useContext(FirebaseContext)

    useEffect(() => {
        const obtenerProductos = () => {
        firebase.db.collection('productos').orderBy(orden, tipo).onSnapshot(manejarSnapshot)
        }

        setTimeout(() => {
            obtenerProductos()
        }, 1500)
        
    }, [])

    // Obtener los datos mediante map y snapshot
    function manejarSnapshot(snapshot){
        const productos = snapshot.docs.map(doc => {
        return {
            id: doc.id,
            ...doc.data()
        }
        })

        setProductos(productos);
    }

    return {
        productos
    }
}

export default useProductos