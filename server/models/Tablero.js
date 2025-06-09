import mongoose from "mongoose";

const tableroSchema = new mongoose.Schema({
    id: {
        type: String
    },
    idUsuario: {
        type: String
    },
    casillas: {
        type: Array
    },
    almacenJugador: {
        type: Array
    },
    almacenBot: {
        type: Array
    }
}, { collection: 'tabla', versionKey: false });

const Tablero = mongoose.model('Tablero', tableroSchema);

export default Tablero;