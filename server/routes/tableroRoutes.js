import { Router } from "express";
import { postTablero, darDueno, hacerTurno } from "../controllers/tableroController.js";
import { validarJWT } from "../middlewares/validarJWT.js"
export const router = Router()

router.post('/', [validarJWT], postTablero) //, [validarJWT]
router.put('/darDueno', [validarJWT], darDueno) //, [validarJWT]
router.put('/hacerTurno', [validarJWT], hacerTurno) //, [validarJWT]