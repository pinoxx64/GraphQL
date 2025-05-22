import { response } from "express";
import User from "../models/user.js";
import { generateJWT } from "../helpers/generate_JWT.js";

export const login = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log('Usuario no encontrado');
            return res.status(400).json({ msg: 'Usuario no encontrado' });
        }
        if (user.password == password) {
            const token = generateJWT(user.id);
            res.status(200).json({ user, token });
        }else {
            console.log('Contraseña incorrecta');
            return res.status(400).json({ msg: 'Contraseña incorrecta' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor.' });
    }
}