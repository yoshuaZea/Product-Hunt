import React, { useState } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import Router from 'next/router'

// Styled component
const InputText = styled.input`
    border: 1px solid var(--gris3);
    padding: 1rem;
    min-width: 300px;
    border-radius: 5px;
`

const InputSubmit = styled.button`
    height: 3rem;
    width: 3rem;
    display: block;
    background-size: 4rem;
    background-image: url('/static/img/buscar.png');
    background-repeat: no-repeat;
    position: absolute;
    right: 1rem;
    top: 1px;
    background-color: white;
    border: none;
    text-indent: -9999px;

    &:hover {
        cursor: pointer;
    }
`

const Buscar = () => {
    
    // State del componente
    const [busqueda, setBusqueda] = useState('')
    
    const buscarProducto = e => {
        e.preventDefault()

        // Validar que exista algo en el buscador
        if(busqueda.trim() === '') return
    
        // Redireccionar a /buscar
        Router.push({
            pathname: '/buscar',
            query: {
                "q": busqueda
            }
        })
    }

    return ( 
        <form
            css={css`
                position: relative;
            `}
            onSubmit={buscarProducto}
        >
            <InputText 
                type="text"
                placeholder="Buscar productos"
                onChange={ e => setBusqueda(e.target.value) }
            />
            <InputSubmit type="submit">Buscar</InputSubmit>
        </form>
     );
}
 
export default Buscar;