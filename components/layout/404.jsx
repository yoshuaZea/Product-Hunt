import React from 'react';
import { css } from '@emotion/core';
import Layout from './Layout'

const Error404 = ({msg}) => {
    return ( 
        <Layout>
            <h1 css={css`
                    margin-top: 5rem;
                    text-align: center;
            `}>Oops...</h1>
            <h2
                css={css`
                    margin-top: 5rem;
                    text-align: center;
                `}
            >{ msg ? msg : <span>404 - No se encontró la página</span> }</h2> 
        </Layout>
    )
}
 
export default Error404;