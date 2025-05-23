import { Router } from "express";
import { postTablero, darDueno, hacerTurno } from "../controllers/tableroController.js";
import { validarJWT } from "../middlewares/validarJWT.js"
export const router = Router()

router.post('/', postTablero) //, [validarJWT]
router.put('/darDueno', darDueno) //, [validarJWT]
router.put('/hacerTurno', hacerTurno) //, [validarJWT]