import Tablero from "../models/Tablero.js";

export const postTablero = async (req, res) => {
    const { id, idUsuario } = req.body;
    if (await Tablero.findOne({ idUsuario: idUsuario })) {
        await Tablero.findOneAndDelete({ idUsuario: idUsuario });
    }

    const materiales = ['Trigo', 'Madera', 'Carbón']
    let casillas = []
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
            let matRandom = Math.floor(Math.random() * materiales.length);
            let numRandom = Math.floor(Math.random() * 6) + 1;
            casillas.push({
                material: materiales[matRandom],
                numero: numRandom,
                cantidad: 0,
                propietario: 'Nadie'
            })
        }
    }
    const tablero = await Tablero.create({ id, idUsuario, casillas });
    res.status(200).json(tablero);
}

export const darDueno = async (req, res) => {
    const idTablero = req.body.id
    const filaE = req.body.fila
    const columnaE = req.body.columna

    const tablero = await Tablero.findOne({ id: idTablero });
    console.log(tablero.casillas[filaE][columnaE]   )
    if (!tablero) {
        return res.status(404).json({ message: 'Tablero no encontrado' });
    }

    if (tablero.casillas[filaE][columnaE].propietario == 'Nadie') {
        tablero.casillas[filaE][columnaE].propietario = 'Jugador'
        const eleccionBot = pensamientoBot(tablero)
        tablero.casillas[eleccionBot[0]][eleccionBot[1]].propietario = 'Bot'
        // let salir = false
        // do {
        //     Darle vueltas a complicar la inteligencia del bot a la hora de elegir casilla
        //     const fila = Math.floor(Math.random() * 3);
        //     const columna = Math.floor(Math.random() * 4);
            
        //     if (tablero.casillas[fila][columna].propietario == 'Nadie') {
        //         tablero.casillas[fila][columna].propietario = 'Bot'
        //         salir = true
        //     } else {
        //         console.log('La casilla ya tiene dueño')
        //     }
        // } while (salir == false)

        return res.status(200).json({ message: 'Dueños asignado correctamente', tablero });
    } else {
        return res.status(400).json({ message: 'La casilla ya tiene dueño' });
    }
}

export const hacerTurno = async (req, res) => {
    const idTablero = req.body.id
    const tablero = await Tablero.findOne({ id: idTablero });
    if (!tablero) {
        return res.status(404).json({ message: 'Tablero no encontrado' });
    }
    const dado = Math.floor(Math.random() * 6) + 1;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
            if (tablero.casillas[i][j].numero == dado) {
                if (tablero.casillas[i][j].cantidad < 20) {
                    tablero.casillas[i][j].cantidad += 1;
                }
            }
        }
    }
    let jugador = [false, false, false]
    let bot = [false, false, false]
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
            if (tablero.casillas[i][j].cantidad >= 20) {
                switch (tablero.casillas[i][j].material) {
                    case 'Trigo':
                        if (tablero.casillas[i][j].propietario == 'Jugador') {
                            jugador[0] = true
                        } else {
                            bot[0] = true
                        }
                        break;

                    case 'Madera':
                        if (tablero.casillas[i][j].propietario == 'Jugador') {
                            jugador[1] = true
                        } else {
                            bot[1] = true
                        }
                        break;
                    case 'Carbón':
                        if (tablero.casillas[i][j].propietario == 'Jugador') {
                            jugador[2] = true
                        } else {
                            bot[2] = true
                        }
                        break;

                    default:
                        break;
                }
            }
        }
    }

    if (jugador[0] == true && jugador[1] == true && jugador[2] == true) {
        return res.status(200).json({ message: 'Ganaste', tablero });
    } else if (bot[0] == true && bot[1] == true && bot[2] == true) {
        return res.status(200).json({ message: 'Perdiste', tablero });
    } else if (jugador[0] == true && bot[0] == true && jugador[1] == true && bot[1] == true && jugador[2] == true && bot[2] == true) {
        return res.status(200).json({ message: 'Empate', tablero });
    } else {
        return res.status(200).json({ message: 'Sigue el juego', tablero });
    }
}

const pensamientoBot = (tablero) => {
    let bot = [0, 0, 0]
    let eleccionBot = 'Nadie'
    let posicionBot = []
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
            if (tablero.casillas[i][j].propietario == 'Bot') {
                switch (tablero.casillas[i][j].material) {
                    case 'Trigo':
                        bot[0] += 1
                        break;

                    case 'Madera':
                        bot[1] += 1
                        break;
                    case 'Carbón':
                        bot[2] += 1
                        break;

                    default:
                        break;
                }
            }
        }
    }
    if (bot[0] <= bot[1] && bot[0] <= bot[2]) {
        eleccionBot = 'Trigo'
    } else if (bot[1] < bot[0] && bot[1] <= bot[2]) {
        eleccionBot = 'Madera'
    } else if (bot[2] < bot[1] && bot[2] < bot[0]) {
        eleccionBot = 'Carbón'
    } else {
        eleccionBot = 'Trigo'
    }
    do {
        let i = 0
        let j = 0
        if (tablero.casillas[i][j].material == eleccionBot && tablero.casillas[i][j].propietario == 'Nadie') {
            posicionBot.push([i, j])
        }
        i++
        j++
    } while (posicionBot == []);
    return posicionBot
}
