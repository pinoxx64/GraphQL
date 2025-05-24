export const postTablero = async (tablero) => {
    const rutaTablero = 'http://127.0.0.1:9090/api/tablero'
    try {
        const respuesta = await fetch(rutaTablero, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(tablero),
        })
        if (!respuesta.ok) {
            throw new Error(`Error al añadir el tablero. Código de estado: ${respuesta.status}`)
        }
        const resultado = await respuesta.json()
        console.log(resultado)
        return resultado
    } catch (error) {
        console.error('Error en la función postTablero:', error.message)
        throw error
    }
}

export const darDueno = async (tablero) => {
    const rutaTablero = 'http://127.0.0.1:9090/api/tablero/darDueno'
    try {
        const respuesta = await fetch(rutaTablero, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(tablero),
        })
        if (!respuesta.ok) {
            throw new Error(`Error al añadir el tablero. Código de estado: ${respuesta.status}`)
        }
        const resultado = await respuesta.json()
        console.log(resultado)
        return resultado
    } catch (error) {
        console.error('Error en la función darDueno:', error.message)
        throw error
    }
}

export const hacerTurno = async (tablero) => {
    const rutaTablero = 'http://127.0.0.1:9090/api/tablero/hacerTurno'
    try {
        const respuesta = await fetch(rutaTablero, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(tablero),
        })
        if (!respuesta.ok) {
            throw new Error(`Error al añadir el tablero. Código de estado: ${respuesta.status}`)
        }
        const resultado = await respuesta.json()
        console.log(resultado)
        return resultado
    } catch (error) {
        console.error('Error en la función hacerTurno:', error.message)
        throw error
    }
}