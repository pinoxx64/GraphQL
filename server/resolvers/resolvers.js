import { login } from "../controllers/authController.js";
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
        }
    }
}

export default resolvers