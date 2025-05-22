import { login } from "../controllers/authController.js";
import { darDueno, hacerTurno, postTablero } from "../controllers/tableroController.js";
import { register } from "../controllers/userController.js";

const resolvers = {
    Query: {
        
    },
    Mutation: {
        register: async (_, { name, email, password }) => {
            const user = await register({ name, email, password });
            return user;
        },
        login: async (_, { email, password }) => {
            const user = await login({ email, password });
            return user;
        },
        postTablero: async (_, { id, idUsuario}) => {
            const tablero = await postTablero({ id, idUsuario})
            return tablero
        },
        darDueno: async (_, { idTablero, fila, columna}) => {
            const tablero = await darDueno({ idTablero, fila, columna})
            return tablero
        },
        hacerTurno: async (_, { idTablero}) => {
            const tablero = await hacerTurno({ idTablero})
            return tablero
        }
    }
}

export default resolvers