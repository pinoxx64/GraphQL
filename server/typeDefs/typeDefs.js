import { gql } from 'graphql-tag';

const typeDefs = gql`
    type User {
        id: Int
        name: String
        email: String
        password: String
    }

    type Query {

    }

    type Mutation {
        register(name: String!, email: String!, password: String!): User
    }
`

export default typeDefs;