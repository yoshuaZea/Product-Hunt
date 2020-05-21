export default function validarProducto(valores) {
    let errores = {}

    // validar URL
    const regUrl = /^(ftp|http|https):\/\/[^ "]+$/

    // Validar nombre del producto
    if(!valores.nombre){
        errores.nombre = 'El nombre del producto es obligatorio'
    }

    // Validar nombre de la empresa
    if(!valores.empresa){
        errores.empresa = 'El nombre de la empresa es obligatorio'
    }

    // Validar url
    if(!valores.url){
        errores.url = 'La url del producto es obligatoria'
    } else if(!regUrl.test(valores.url)){
        errores.url = 'La url no es válida'
    }

    // Validar la descripción
    if(!valores.descripcion){
        errores.descripcion = 'La descripción es obligatoria'
    }

    return errores
}