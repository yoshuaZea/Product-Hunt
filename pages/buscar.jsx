import React, { useState, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import { css } from '@emotion/core'
import DetallesProducto from '../components/ui/DetallesProducto'
import Spinner from '../components/ui/Spinner'
import useProductos from '../hooks/useProductos'

// Componentes
import Layout from '../components/layout/Layout'

const Buscar = () => {
  // Usando el hook
  const router = useRouter()
  const { query: { q }} = router
  
  // Destructuring al query
  // const { query: { q }} = Router.router

  // Usando hook productos
  const { productos } = useProductos('creado', 'desc')

  // State del componente
  const [resultado, setResultado] = useState([])

  useEffect(() => {
    const busqueda = q.toLowerCase()
    const filtro = productos.filter(producto => {
      return (
        producto.nombre.toLowerCase().includes(busqueda)
        || producto.descripcion.toLowerCase().includes(busqueda)
      )
    })

    setResultado(filtro)

  }, [q, productos])
  
  
  return (  
    <Layout>
      <div className="listado-productos">
        <div className="contenedor">
          <div className="bg-white">
            <h2 css={css`
              text-align: left;
              padding: 1rem 3rem;
              border-bottom: 1px solid #e1e1e1;
            `}>Resultados de búsqueda ({resultado.length})</h2>
            <ul>
              {
                Object.keys(resultado).length === 0 ? <Spinner msg={`Sin resultados para la búsqueda ${q}`}/> : (
                  resultado.map(producto => (
                    <DetallesProducto 
                      key={producto.id}
                      producto={producto}
                    />
                  ))
                )
              }
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
 
export default Buscar;