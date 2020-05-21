import React, { useState } from 'react';
import Router from 'next/router'
import Layout from '../components/layout/Layout'
import { css } from '@emotion/core'
import { Formulario, Campo, InputSubmit, Error } from '../components/ui/Formulario'

// Hook - Validación y reglas de validación
import useValidacion from '../hooks/useValidacion'
import validarIniciarSesion from '../validacion/validarIniciarSesion'

// Firebase
import firebase from '../firebase'

const Login = () => {
  // State 
  const [error, setError] = useState('')

  const initialState = {
    email: '',
    password: ''
  }

  // Utilizar el custom hook
  const { valores, errores, handleChange, handleSubmit, handleBlur } = useValidacion(initialState, validarIniciarSesion, iniciarSesion)
  const { nombre, email, password } = valores

  async function iniciarSesion() {
    try {
      await firebase.login(email, password)
      Router.push('/') // Redireccionar
    } catch (error) {
      console.error('Hubo un error al autenticar el usuario', error.message);
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
        >Iniciar sesión</h1>
        <Formulario
          onSubmit={handleSubmit}
          noValidate
        >
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
            value="Iniciar sesión"
          />
        </Formulario>
      </>
    </Layout>
  )
}
 
export default Login;