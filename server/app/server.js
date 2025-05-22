import 'dotenv/config'; 
import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
mongoose.set('strictQuery', false);
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4'
import typeDefs from '../typeDefs/typeDefs.js';
import resolvers from '../resolvers/resolvers.js';
import {router as userRoutes} from '../routes/userRoutes.js';
import {router as authRoutes} from '../routes/authRoutes.js';


class Server {

    constructor() {
        this.app = express();
        this.graphQLPath = '/graphql';
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';
    
        //Middlewares
        this.middlewares();

        this.conectarMongoose();

        this.routes();

        //Configurar ApolloServer con plugin para errores
        this.serverGraphQL = new ApolloServer({
            typeDefs,
            resolvers,
            plugins: [
                {
                    async requestDidStart() {
                        return {
                            async willSendResponse({ response, errors }) {
                                if (errors) {
                                    response.body.singleResult.errors = errors.map(err => ({
                                        message: err.message
                                    }));
                                }
                            },
                        };
                    },
                },
            ],
        });
    }


    conectarMongoose() {
       //Para local o remoto (Atlas) comentar / descomentar en .env.
        mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: process.env.DB_DATABASE, //Especificar la base de datos
            //maxPoolSize: 10, //Define el número máximo de conexiones en el pool. Por defecto es 100.
        });
        /*
        Cuando llamas a mongoose.connect(), Mongoose crea una única conexión a MongoDB 
        que actúa como un pool de conexiones interno. Este pool maneja múltiples 
        operaciones simultáneamente sin necesidad de que crees nuevas conexiones manualmente.
        */

        this.db = mongoose.connection;
        this.db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
        this.db.once('open', () => {console.log(`Conexión exitosa a MongoDB: ${process.env.DB_URL}`);});
    }


    async start() {
        await this.serverGraphQL.start();
        this.applyGraphQLMiddleware();
        this.listen();
    }   

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        //Directorio públco: http://localhost:9090/  --> Habilitamos esto para ver como se cargaría una imagen desde el cliente.
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.usuariosPath , userRoutes);
        this.app.use(this.authPath , authRoutes);
    }

    applyGraphQLMiddleware() {
        this.app.use(this.graphQLPath , express.json(), expressMiddleware(this.serverGraphQL));
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`🟢 Servidor GraphQL escuchando en: ${process.env.DB_URL_GRAPHQL}:${process.env.PORT}${this.graphQLPath}`);
            console.log(`🔵 Servidor API Rest usuarios escuchando en: ${process.env.DB_URL_GRAPHQL}:${process.env.PORT}${this.usuariosPath}`);
            console.log(`🌎 Página de prueba escuchando en: ${process.env.DB_URL_GRAPHQL}:${process.env.PORT}`)
        })
        this.applyGraphQLMiddleware()
    }
}

export {Server} 