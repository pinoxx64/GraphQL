import Tablero from "../models/Tablero.js";

export const postTablero = async (req, res) => {
    const { id, idUsuario } = req.body;
    
    const materiales = ['Trigo','Madera','Carbón']
    let casillas = []
    for (let i = 0; i <= 3 ; i++) {
        for (let j = 0; j <= 4; j++) {
            let matRandom = Math.floor(Math.random() * materiales.length);
            let numRandom = Math.floor(Math.random() * 6);
            casillas.push({
                material: materiales[matRandom],
                numero: numRandom,
                cantidad: 0
            })
        }
    }
    const tablero = await Tablero.create({id, idUsuario, casillas});
}