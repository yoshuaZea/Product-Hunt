import React, { useState, useEffect } from 'react';

const useValidacion = (stateInitial, validar, fn) => {

    // Los valores que vendran de los inputs
    const [valores, setValores] = useState(stateInitial)
    
    // Si hay errores
    const [errores, setErrores] = useState({})

    // Iniciar como false el submit
    const [submitForm, setSubmitForm] = useState(false)

    useEffect(() => {
        if(submitForm){
            const noErrores = Object.keys(errores).length === 0

            if(noErrores){
                fn(); // fn = Función que se ejecuta en el componente
            }

            // Reiniciar el formulario
            setSubmitForm(false)
        }
    }, [errores])

    // Función que se ejecuta conforme el usuario escribe algo
    const handleChange = e => {
        setValores({
            ...valores,
            [e.target.name] : e.target.value
        })
    }

    // Función que se ejecuta cuando el usuario hace submit
    const handleSubmit = e => {
        e.preventDefault()
        const erroresValidacion = validar(valores)
        setErrores(erroresValidacion)
        setSubmitForm(true)
    }

    // Cuando se realiza el evento de blur
    const handleBlur = () => {
        const erroresValidacion = validar(valores)
        setErrores(erroresValidacion)
    }

    return {
        valores,
        errores,
        handleChange,
        handleSubmit,
        handleBlur
    }
}
 
export default useValidacion