export default function validarCrearCuenta(valores) {
    let errores = {}

    // validar email
    const regPass = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

    // validar URL
    const regUrl = /^(ftp|http|https):\/\/[^ "]+$/

    // Validar nombre del usuario
    if(!valores.nombre){
        errores.nombre = 'El nombre es obligatorio'
    }

    // Validar email del usuario
    if(!valores.email){
        errores.email = 'El email es obligatorio'
    } else if(!regPass.test(valores.email)){
        errores.email = 'El email no es válido'
    }

    // Validar email del usuario
    if(!valores.password){
        errores.password = 'El password es obligatorio'
    } else if(valores.password.length < 6){
        errores.password = 'El password debe ser al menos de 6 caracteres'
    }

    return errores
}