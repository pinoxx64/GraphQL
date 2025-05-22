import User from "../models/user.js";

export const register = async (req, res) => {
    const { id, nombre, email, password } = req.body;

    try {
        try {
            const user = await User.create({id, nombre, email, password})
            console.log('Usuario creado')
            res.status(200).json(user)
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            res.status(500).json({ 'msg': 'Error al registrar usuario' });
        }
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ 'msg': 'Error al registrar usuario' });
    }
}