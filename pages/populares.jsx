import React from 'react'
import Layout from '../components/layout/Layout'
import DetallesProducto from '../components/ui/DetallesProducto'
import Spinner from '../components/ui/Spinner'
import useProductos from '../hooks/useProductos'
import { css } from '@emotion/core'

const Populares = () => {
  const { productos } = useProductos('votos', 'desc')

  return (  
    <Layout>
      <div className="listado-productos">
        <div className="contenedor">
          <div className="bg-white">
            <h2 css={css`
              text-align: left;
              padding: 1rem 3rem;
              border-bottom: 1px solid #e1e1e1;
            `}>Populares</h2>
            <ul>
              {
                Object.keys(productos).length === 0 ? <Spinner/> : (
                  productos.map(producto => (
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
 
export default Populares