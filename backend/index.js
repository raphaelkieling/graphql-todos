const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios').default;
const API = 'https://jsonplaceholder.typicode.com';

const typeDefs = gql`
  type User {
    id: ID
    name: String
    email: String
    phone: String
    website: String
  }

  type Todo {
    userId: Int
    id: ID
    title: String
    completed: Boolean
    user: User
  }

  type Query {
    todos:[Todo]
    todo(id:ID): Todo
  }
`;

const resolvers = {
  Query: {
    todos: async () => await axios.get(`${API}/todos`).then(a => a.data),
    todo: async (root, { id }) => await axios.get(`${API}/todos/${id}`).then(a => a.data)
  },
  Todo: {
    user: async (root, args, context, info) => {
      return await axios.get(`${API}/users/${root.userId}`).then(a => a.data)
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});