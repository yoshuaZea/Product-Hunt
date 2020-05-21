import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router'
import { FirebaseContext } from '../../firebase'
import Error404 from '../../components/layout/404'
import Layout from '../../components/layout/Layout'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import Spinner from '../../components/ui/Spinner'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { es } from 'date-fns/locale'
import { Campo, InputSubmit } from '../../components/ui/Formulario'
import Boton from '../../components/ui/Boton'

const ContenedorProducto = styled.div`
    @media (min-width: 768px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
    }

`

const CreadorProducto = styled.p`
    padding: .5rem 2rem;
    background-color: #da552d;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    display: inline-block;
    text-align: center;
`

const Producto = () => {

    // Routing para obtener id actual
    const router = useRouter()
    const { query: { id }} = router

    // State del componente
    const [producto, setProducto] = useState({})
    const [error, setError] = useState(false)
    const [yavoto, setYavoto] = useState(false)
    const [comentario, setComentario] = useState({})
    const [consultarDB, setConsultarDB] = useState(true)

    // Context firebase
    const { usuario, firebase } = useContext(FirebaseContext)

    useEffect(() => {
        if(id && consultarDB){
            const obtenerProducto = async () => {
                const query = await firebase.db.collection('productos').doc(id) // Buscar producto por id
                const producto = await query.get()

                if(producto.exists){ // Valida si existe el producto
                    setProducto(producto.data()) // Función que trae la información de firestore
                    setConsultarDB(false)
                } else {
                    setError(true)
                    setConsultarDB(false)
                }
            }

            obtenerProducto()
        }
    }, [id])

    
    // Si no existe el producto
    if(error) return <Error404 />
    
    // Destructuring
    const { nombre, empresa, url, urlImagen, comentarios, descripcion, votos, creado, creador, hanVotado } = producto
    
    // Administrar y validar votos
    const agregarVoto = () => {
        if(!usuario) return router.push('/login')

        // Obtener y sumar votos
        const nuevoTotal = votos + 1

        // Verificar si el usuario actual ha votado
        if(hanVotado.includes(usuario.uid)){
            setYavoto(true)
            setTimeout(() => {
                setYavoto(false)
            }, 5000)
            return
        }

        // Guardar el ID del usuario que ha votado
        const nuevosHanVotado = [...hanVotado, usuario.uid]
        
        // Actulizar BD
        firebase.db.collection('productos').doc(id).update({
            votos: nuevoTotal,
            hanVotado: nuevosHanVotado
        })

        // Actualizar state
        setProducto({
            ...producto,
            votos: nuevoTotal
        })

        setConsultarDB(true) // Nuevo voto, consulta la BD
    }

    // Función para guardar comentario
    const comentarioChange = e => {
        setComentario({
            ...comentario,
            [e.target.name] : e.target.value.trim()
        })
    }

    // Identifica si el comentario es del creador del producto
    const esCreador = id => {
        if(usuario.uid == id) return true
    }

    // Agregar comentario a la BD
    const agregarComentario = e => {
        e.preventDefault()
        if(!usuario) return router.push('/login')

        // Información extra al comentario
        comentario.usuarioId = usuario.uid
        comentario.usuarioNombre = usuario.displayName
        comentario.fecha = Date.now()

        // Tomar una copia de comentarios y agregarlos al arreglo
        const nuevosComentarios = [...comentarios, comentario]

        // Actualizar BD
        firebase.db.collection('productos').doc(id).update({
            comentarios: nuevosComentarios
        })

        // Actualizar state
        setProducto({
            ...producto,
            comentarios: nuevosComentarios
        })

        setConsultarDB(true) // Nuevo comentario, consulta la BD
    }

    // Función que revisa que el creador sea el mismo que está autenticado
    const puedeBorrar  = () => {
        if(!usuario) return false

        if(creador.id === usuario.uid) return true
    }

    // Elimina el producto
    const eliminarProducto = async () =>{
        if(!usuario || creador.id !== usuario.uid) return router.push('/login')

        try {
            await firebase.db.collection('productos').doc(id).delete()
            router.push('/')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout>
            <div className="contenedor">
                {
                    Object.keys(producto).length === 0 ? <Spinner/> : (
                        <>
                            <h1 css={css`
                                text-align: center;
                                border-bottom: 1px solid #e1e1e1;
                            `}>
                                {nombre}
                            </h1>
                            <ContenedorProducto>
                                <div>
                                    Publicado hace: {formatDistanceToNow(new Date(creado), { locale: es })}
                                    <p>Por {creador.nombre } de {empresa}</p>
                                    <img src={urlImagen} alt=""/>
                                    <p>{descripcion}</p>

                                    { usuario && (
                                        <>
                                            <h2>Agrega tu comentario</h2>
                                            <form
                                                onSubmit={agregarComentario}
                                            >
                                                <Campo>
                                                    <input 
                                                        type="text"
                                                        name="comentario"
                                                        placeholder="Aquí tu comentario..."
                                                        onChange={comentarioChange}
                                                    />
                                                </Campo>
                                                <InputSubmit 
                                                    type="submit"
                                                    value="Comentar"
                                                />
                                            </form>
                                        </>
                                    )}

                                    <h2
                                        css={css`
                                            margin: 2rem 0;
                                        `}
                                    >Comentarios</h2>
                                    { comentarios.length === 0 ? <p>Aún no hay comentarios</p> : (
                                        <ul>
                                            { comentarios.map((comentario, i) => (
                                                <li
                                                    key={`${comentario.usuarioId}-${i}`}
                                                    css={css` border: 1px solid #e1e1e1; padding: 1rem 2rem;`}
                                                >
                                                    <p css={css`margin: 0; `}>{comentario.comentario}</p>
                                                    <p css={css`
                                                        margin: 0;
                                                        font-size: 1.2rem; `
                                                    }>
                                                        Escrito por: {comentario.usuarioNombre} hace {formatDistanceToNow(new Date(comentario.fecha), { locale: es })}
                                                    </p>

                                                    { esCreador(comentario.usuarioId) && <CreadorProducto>Es creador</CreadorProducto>}

                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                
                                <aside>
                                    <Boton
                                        href={url}
                                        target="_blank"
                                        bgColor="true"
                                    >
                                        Visita URL
                                    </Boton>
                                    <div css={css`
                                        margin-top: 5rem;
                                    `}>
                                        { usuario && <Boton 
                                            onClick={agregarVoto}
                                        >Votar</Boton> }
                                        <p
                                            css={css`
                                                text-align: center;
                                            `}
                                        >{votos} Votos</p>

                                        { yavoto && 
                                            <p css={css` 
                                                text-align:center; 
                                                color: var(--naranja); 
                                                font-weight: bold;`
                                            }>Ya has votado por este producto</p>
                                        }
                                    </div>
                                </aside>
                            </ContenedorProducto>
                            { puedeBorrar() &&
                                <Boton
                                    onClick={() => eliminarProducto()}
                                >Eliminar producto</Boton> }
                        </>
                    )
                }
            </div>
        </Layout>
    )
}
 
export default Producto