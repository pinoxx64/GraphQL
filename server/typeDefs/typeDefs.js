import { gql } from 'graphql-tag';

const typeDefs = gql`
    type User {
        id: Int
        name: String
        email: String
        password: String
    }
    type Tablero {
        id: Int
        idUsuario: Int
        casillas: Array
    }

    type Query {
        _empty: String
    }

    type Mutation {
        register(name: String!, email: String!, password: String!): User
        login(email: String!, password: String!): User
        postTablero(id: Int!, idUsuario: Int!): Tablero
        darDueno(id: Int!, fila: Int!, columna: Int!): Tablero
        hacerTurno(id: Int!): Tablero
    }
`

export default typeDefs;