const { ApolloServer, gql } = require('apollo-server');
const Dataloader = require('dataloader');
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

  type Post {
    id: ID
    userId: Int
    title: String
    body: String
    user: User
  }

  type Todo {
    userId: Int
    id: ID
    title: String
    completed: Boolean
    user: User
  }

  type Query {
    posts:[Post]
    todos:[Todo]
    todo(id:ID): Todo
  }
`;

// First approach
function memoize(method) {
  let cache = {};
  return async function () {
    let args = JSON.stringify(arguments);
    if (args in cache) {
      console.log('Cached')
    }
    cache[args] = cache[args] || method.apply(this, arguments);
    return cache[args];
  };
}

const getUserById = memoize((userId) => axios.get(`${API}/users/${userId}`).then(a => a.data))


/**
 * Second approach
 * 
 * That is a similar approach around memoize.
 */
const userLoader = new Dataloader(async keys => {
  return Promise.all(keys.map(async (userId) => axios.get(`${API}/users/${userId}`).then(a => a.data)));
});


const resolvers = {
  Query: {
    posts: async () => axios.get(`${API}/posts`).then(({ data }) => data),
    todos: async () => axios.get(`${API}/todos`).then(({ data }) => data)
  },
  Todo: {
    user: async ({ userId }, args, context, info) => userLoader.load(userId)
  }
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});