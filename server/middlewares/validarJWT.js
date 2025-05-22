import jwt from 'jsonwebtoken'
import { request, response } from 'express'

export const validarJWT = (req, res, next) => {
    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({msg: 'No hay token en la peticion'})
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        req.uid = uid
        console.log('uid', uid)
        console.log('token', token)
        next()
    } catch (error) {
        console.log(error);
        res.status(401).json({'msg':'Token no válido.'})
    }
}