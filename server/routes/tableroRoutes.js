import { Router } from "express";
import { postTablero, darDueno, hacerTurno } from "../controllers/tableroController";
import { validarJWT } from "../middlewares/validarJWT.js"
export const router = Router()

router.post('/', [validarJWT], postTablero)
router.put('/darDueno', [validarJWT], darDueno)
router.put('/hacerTurno', [validarJWT], hacerTurno)