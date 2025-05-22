import mongoose from "mongoose";

const tableroSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    idUsuario: {
        type: Number
    },
    casillas: {
        type: Array
    }
}, { collection: 'tabla', versionKey: false });

const Tablero = mongoose.model('Tablero', tableroSchema);

export default Tablero;