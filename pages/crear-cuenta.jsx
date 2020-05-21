import React, { useState } from 'react';
import Router from 'next/router'
import Layout from '../components/layout/Layout'
import { css } from '@emotion/core'
import { Formulario, Campo, InputSubmit, Error } from '../components/ui/Formulario'

// Hook - Validación y reglas de validación
import useValidacion from '../hooks/useValidacion'
import validarCrearCuenta from '../validacion/validarCrearCuenta'

// Firebase
import firebase from '../firebase'


const CrearCuenta = () => {

  // State 
  const [error, setError] = useState('')

  const initialState = {
    nombre: '',
    email: '',
    password: ''
  }

  // Utilizar el custom hook
  const { valores, errores, handleChange, handleSubmit, handleBlur } = useValidacion(initialState, validarCrearCuenta, crearCuenta)
  const { nombre, email, password } = valores

  async function crearCuenta() {
    try {
      await firebase.registrar(nombre, email, password)
      Router.push('/') // Redireccionar

    } catch (error) {
      console.error('Hubo un error al crear el usuario', error.message);
      setError(error.message)
    }
  }

  return (  
    <Layout>
      <>
        <h1 
          css={css`
            text-align: center;
            margin-bottom: 5rem;
          `}
        >Crear cuenta</h1>
        <Formulario
          onSubmit={handleSubmit}
          noValidate
        >
          <Campo>
            <label htmlFor="nombre">Nombre</label>
            <input 
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Ingresa tu nombre"
              value={nombre}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Campo>

          { errores.nombre && <Error>{ errores.nombre }</Error> }

          <Campo>
            <label htmlFor="email">Email</label>
            <input 
              type="email"
              id="email"
              name="email"
              placeholder="Ingresa tu email"
              value={email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Campo>

          { errores.email && <Error>{ errores.email }</Error> }

          <Campo>
            <label htmlFor="password">Password</label>
            <input 
              type="password"
              id="password"
              name="password"
              placeholder="Ingresa tu password"
              value={password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Campo>

          { errores.password && <Error>{ errores.password }</Error> }
          { error && <Error>{ error }</Error> }

          <InputSubmit 
            type="submit"
            value="Crear cuenta"
          />
        </Formulario>
      </>
    </Layout>
  )
}
 
export default CrearCuenta