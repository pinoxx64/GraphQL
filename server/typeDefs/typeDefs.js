import { gql } from 'graphql-tag';

const typeDefs = gql`
    type User {
        id: Int
        name: String
        email: String
        password: String
    }

    type Query {
        _empty: String
    }

    type Mutation {
        register(name: String!, email: String!, password: String!): User
        login(email: String!, password: String!): User
    }
`

export default typeDefs;