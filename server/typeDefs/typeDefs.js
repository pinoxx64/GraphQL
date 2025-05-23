import { gql } from 'graphql-tag';

const typeDefs = gql`
    type User {
        id: String
        name: String
        email: String
        password: String
    }
    type Casilla {
        material: String
        numero: Int
        cantidad: Int
        propietario: String
    }
    type Tablero {
        id: String
        idUsuario: String
        casillas: [[Casilla]]
    }

    type Query {
        _empty: String
    }

    type Mutation {
        register(name: String!, email: String!, password: String!): User
        login(email: String!, password: String!): User
        postTablero(id: String!, idUsuario: String!): Tablero
        darDueno(id: String!, fila: Int!, columna: Int!): Tablero
        hacerTurno(id: String!): Tablero
    }
`

export default typeDefs;