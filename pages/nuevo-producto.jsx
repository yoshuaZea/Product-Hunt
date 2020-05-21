import React, { useState, useContext } from 'react';
import Router, { useRouter } from 'next/router'
import Layout from '../components/layout/Layout'
import { css } from '@emotion/core'
import { Formulario, Campo, InputSubmit, Error } from '../components/ui/Formulario'
import FileUploader from 'react-firebase-file-uploader'
import Error404 from '../components/layout/404'

// Hook - Validación y reglas de validación
import useValidacion from '../hooks/useValidacion'
import validarProducto from '../validacion/validarProducto'

// Firebase
import { FirebaseContext } from '../firebase'

const NuevoProducto = () => {
  // State y context
  const [error, setError] = useState('')
  const { usuario, firebase } = useContext(FirebaseContext)

  // Hook routing para redireccionar
  const router = useRouter()

  const initialState = {
    nombre: '',
    empresa: '',
    imagen: '',
    url: '',
    descripcion: ''
  }

  // State de las imagenes y funciones 
  const [nombreImagen, setNombreImagen] = useState('')
  const [subiendoImagen, setSubiendoImagen] = useState(false)
  const [progresoImagen, setProgesoImagen] = useState(0)
  const [urlImagen, setUrlImagen] = useState('')

  const handleUploadStart = () => {
    setProgesoImagen(0)
    setSubiendoImagen(true)
  }
  
  const handleUploadError = error => {
    setSubiendoImagen(error)
    console.log(error);
  }
  
  const handleUploadSuccess = nombre => {
    setProgesoImagen(100)
    setSubiendoImagen(false)
    setNombreImagen(nombre)
    firebase
      .storage
      .ref("productos")
      .child(nombre)
      .getDownloadURL()
      .then(url => {
        // console.log(url);
        setUrlImagen(url);
      } );
  }
  
  const handleProgress = progreso => setProgesoImagen({ progreso })
  

  // Utilizar el custom hook
  const { valores, errores, handleChange, handleSubmit, handleBlur } = useValidacion(initialState, validarProducto, crearProducto)
  const { nombre, empresa, imagen, url, descripcion } = valores

  async function crearProducto() {
    // Si el usuario no está autenticado
    if(!usuario) return router.push('/login')

    // Crear el objeto de nuevo producto
    const producto = {
      nombre,
      empresa,
      url,
      urlImagen,
      descripcion,
      votos: 0,
      comentarios: [],
      creado: Date.now(),
      creador: {
        id: usuario.uid,
        nombre: usuario.displayName
      },
      hanVotado: []
    }

    try {
      // Insertar en la base de datos
      firebase.db.collection('productos').add(producto)
      return router.push('/')
    } catch (error) {
      console.log(error);
    }
  }

  // Si no hay usuario logueado
  if(!usuario) return <Error404 msg="Tienes que iniciar sesión para subir un producto"/>

  return (  
    <Layout>
      <>
        <h1 
          css={css`
            text-align: center;
            margin-bottom: 5rem;
          `}
        >Nuevo producto</h1>
        <Formulario
          onSubmit={handleSubmit}
          noValidate
        >
          <fieldset>
            <legend>Información general</legend>
          
            { errores.nombre && <Error>{ errores.nombre }</Error> }

            <Campo>
              <label htmlFor="nombre">Producto</label>
              <input 
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Nombre del producto"
                value={nombre}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>

            { errores.nombre && <Error>{ errores.nombre }</Error> }

            <Campo>
              <label htmlFor="empresa">Empresa</label>
              <input 
                type="text"
                id="empresa"
                name="empresa"
                placeholder="Nombre de empresa o compañía"
                value={empresa}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>

            { errores.empresa && <Error>{ errores.empresa }</Error> }

            <Campo>
              <label htmlFor="imagen">Imagen</label>
              <FileUploader
                accept="image/*"
                id="imagen"
                name="imagen"
                randomizeFilename
                storageRef={firebase.storage.ref("productos")}
                onUploadStart={handleUploadStart}
                onUploadError={handleUploadError}
                onUploadSuccess={handleUploadSuccess}
                onProgress={handleProgress}
              />
            </Campo>

            { errores.imagen && <Error>{ errores.imagen }</Error> }

            <Campo>
              <label htmlFor="url">URL</label>
              <input 
                type="url"
                id="url"
                name="url"
                placeholder="URL o enlace del producto"
                value={url}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>

            { errores.url && <Error>{ errores.url }</Error> }
          </fieldset>

          <fieldset>
            <legend>Sobre tu producto</legend>
            <Campo>
              <label htmlFor="descripcion">Descripción</label>
              <textarea 
                id="descripcion"
                name="descripcion"
                placeholder="Descripción detallada de tu producto"
                rows="5"
                value={descripcion}
                onChange={handleChange}
                onBlur={handleBlur}
              ></textarea>
            </Campo>

            { errores.descripcion && <Error>{ errores.descripcion }</Error> }

          </fieldset>

          { error && <Error>{ error }</Error> }

          <InputSubmit 
            type="submit"
            value="Agregar"
          />
        </Formulario>
      </>
    </Layout>
  )
}
 
export default NuevoProducto;