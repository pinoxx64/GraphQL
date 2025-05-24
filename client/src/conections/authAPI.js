export const login = async (body) => {
    const ruta = 'http://127.0.0.1:9090/api/auth/login'
    try {
        const respuesta = await fetch(ruta, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(body),
        })
        if (!respuesta.ok) {
            throw new Error(`Error al hacer login. Código de estado: ${respuesta.status}`)
        }
        const resultado = await respuesta.json()
        return resultado
    } catch (error) {
        console.error('Error en la función login:', error.message)
        throw error
    }
}