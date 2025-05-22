import { Router } from "express";
import { register} from "../controllers/userController.js";
export const router = Router()

router.post('/register', register)