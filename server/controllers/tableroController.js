import Tablero from "../models/Tablero.js";

export const postTablero = async (req, res) => {
    const { id, idUsuario } = req.body;
    if (await Tablero.findOne({ idUsuario: idUsuario })) {
        await Tablero.findOneAndDelete({ idUsuario: idUsuario });
    }

    let almacenJugador = {
        Trigo: 0,
        Madera: 0,
        Carbon: 0
    }
    let almacenBot = {
        Trigo: 0,
        Madera: 0,
        Carbon: 0
    }

    const materiales = ['Trigo', 'Madera', 'Carbon']
    let casillas = []
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
            let matRandom = Math.floor(Math.random() * materiales.length);
            let numRandom = Math.floor(Math.random() * 6) + 1;
            casillas.push({
                material: materiales[matRandom],
                numero: numRandom,
                propietario: 'Nadie'
            })
        }
    }
    const tablero = await Tablero.create({ id, idUsuario, casillas, almacenJugador, almacenBot });
    res.status(200).json({ message: 'Tablero creado', tablero});
}

export const darDueno = async (req, res) => {
    const idTablero = req.body.id
    const posicionE = req.body.posicion

    const tablero = await Tablero.findOne({ id: idTablero });
    if (!tablero) {
        return res.status(404).json({ message: 'Tablero no encontrado' });
    }

    if (tablero.casillas[posicionE].propietario == 'Nadie') {
        tablero.casillas[posicionE].propietario = 'Jugador'
        console.log('casilla elegida:', tablero.casillas[posicionE])
        const eleccionBot = pensamientoBot(tablero)
        if (eleccionBot !== -1 && tablero.casillas[eleccionBot]) {
            tablero.casillas[eleccionBot].propietario = 'Bot'
        }
        tablero.markModified('casillas');
        await tablero.save()
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

    const haySinDueno = tablero.casillas.some(casilla => casilla.propietario === 'Nadie');
    if (haySinDueno) {
        return res.status(400).json({ message: 'Debes seleccionar todas las casillas antes de jugar el turno.', tablero });
    }

    const dado = Math.floor(Math.random() * 6) + 1;
    for (let i = 0; i < tablero.casillas.length; i++) {
        if (tablero.casillas[i].numero == dado) {
            const material = tablero.casillas[i].material;
            if (tablero.casillas[i].propietario === 'Jugador') {
                if (tablero.almacenJugador[0][material] < 20) {
                    tablero.almacenJugador[0][material] += 1;
                }
            } else if (tablero.casillas[i].propietario === 'Bot') {
                if (tablero.almacenBot[0][material] < 20) {
                    tablero.almacenBot[0][material] += 1;
                }
            }
        }
    }
    console.log("almacenJugador", tablero.almacenJugador[0])
    console.log("almacenBot", tablero.almacenBot[0])

    // Comprobar si alguien ha ganado (20 de cada material)
    const jugadorGana = 
        tablero.almacenJugador[0]['Trigo'] >= 20 &&
        tablero.almacenJugador[0]['Madera'] >= 20 &&
        tablero.almacenJugador[0]['Carbon'] >= 20;

    const botGana = 
        tablero.almacenBot[0]['Trigo'] >= 20 &&
        tablero.almacenBot[0]['Madera'] >= 20 &&
        tablero.almacenBot[0]['Carbon'] >= 20;

    tablero.markModified('almacenJugador');
    tablero.markModified('almacenBot');
    await tablero.save();

    if (jugadorGana && botGana) {
        return res.status(200).json({ message: 'Empate', tablero });
    } else if (jugadorGana) {
        return res.status(200).json({ message: 'Ganaste', tablero });
    } else if (botGana) {
        return res.status(200).json({ message: 'Perdiste', tablero });
    } else {
        return res.status(200).json({ message: 'Sigue el juego', tablero });
    }
}

const pensamientoBot = (tablero) => {
    let bot = [0, 0, 0];
    let eleccionBot = 'Nadie';
    let posicionBot = -1;

    for (let i = 0; i < tablero.casillas.length; i++) {
        if (tablero.casillas[i].propietario == 'Bot') {
            switch (tablero.casillas[i].material) {
                case 'Trigo':
                    bot[0] += 1;
                    break;
                case 'Madera':
                    bot[1] += 1;
                    break;
                case 'Carbon':
                    bot[2] += 1;
                    break;
                default:
                    break;
            }
        }
    }

    if (bot[0] <= bot[1] && bot[0] <= bot[2]) {
        eleccionBot = 'Trigo';
    } else if (bot[1] < bot[0] && bot[1] <= bot[2]) {
        eleccionBot = 'Madera';
    } else if (bot[2] < bot[1] && bot[2] < bot[0]) {
        eleccionBot = 'Carbon';
    } else {
        eleccionBot = 'Trigo';
    }

    for (let i = 0; i < tablero.casillas.length; i++) {
        if (
            tablero.casillas[i].material == eleccionBot &&
            tablero.casillas[i].propietario == 'Nadie'
        ) {
            posicionBot = i;
            break;
        }
    }

    if (posicionBot === -1) {
        const libres = [];
        for (let i = 0; i < tablero.casillas.length; i++) {
            if (tablero.casillas[i].propietario == 'Nadie') {
                libres.push(i);
            }
        }
        if (libres.length > 0) {
            const randomIdx = Math.floor(Math.random() * libres.length);
            posicionBot = libres[randomIdx];
        }
    }

    return posicionBot;
}
