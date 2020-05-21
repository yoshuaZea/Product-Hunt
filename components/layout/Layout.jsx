import React from 'react';
import { Global, css } from '@emotion/core'
import Head from 'next/head'

// Components
import Header from './Header'

const Layout = props => {

    const year = new Date().getFullYear()

    return ( 
        <div css={css`
            display: flex;
            flex-direction: column;
            height: 100vh;
        `}>
            <Global 
                styles={css`
                    :root {
                        --gris: #3d3d3d;
                        --gris2: #6f6f6f;
                        --gris3: #e1e1e1;
                        --naranja: #DA552F;
                        --phone: 480px;
                        --tablet: 768px;
                        --desktop: 1024px;
                    }

                    html {
                        font-size: 62.5%;
                        box-sizing: border-box;
                    }

                    *, *:before, *:after {
                        box-sizing: inherit;
                    }

                    body {
                        font-size: 1.6rem;
                        line-height: 1.5;
                        font-family: 'PT Sans', sans-serif;
                    }

                    main {
                        flex: 1;
                    }

                    h1, h2, h3 {
                        margin: 0 0 2rem 0;
                        line-height: 1.5;
                    }

                    h1, h2 {
                        font-family: 'Roboto Slab', serif;
                        font-weight: 700;
                    }

                    h3 {
                        font-family: 'PT Sans', sans-serif;
                    }

                    ul {
                        list-style: none;
                        margin: 0;
                        padding: 0;
                    }

                    a {
                        text-decoration: none;
                    }

                    img {
                        max-width: 100%;
                        height: auto;
                    }

                    footer {
                        display: flex;
                        justify-content: space-around;
                        margin: 1rem 1rem 0rem 1rem;
                    }

                    footer p {
                        color: var(--gris2);
                    }
                `}
            />
            {/* Información meta antes de body */}
            <Head>
                <title>Product Hunt Firebase y Next js</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha256-l85OmPOjvil/SOvVt3HnSSjzF1TUMyT9eV0c2BzEGzU=" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;1,700&family=Roboto+Slab:wght@400;700&display=swap" rel="stylesheet"></link>
                <link rel="stylesheet" href="/static/css/app.css"/>
            </Head>

            <Header />

            <main>
                { props.children }
            </main>

            <footer>
                <p>
                    Product Hunt - {year}
                </p>
                <p>
                    Developed by jzea
                </p>
            </footer>
        </div>
    )
}
 
export default Layout