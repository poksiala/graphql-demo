const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
import { catBreedsResolver, catBreedResolver, catBreedSearchResolver } from './resolvers/catBreed';
import initIfEmpty from './initdb';

const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo:27017')
  .then(() => {
    console.log('conected to database')
    initIfEmpty()
  })
  .catch(err => {
    console.error(err)
  })


const typeDefs = gql`
  type CatBreed {
    id: ID
    name: String
    description: String
    temperament: String
    origin: String
  }

  type Query {
    catBreeds: [CatBreed]
    catBreed(id: ID): CatBreed
    catBreedSearch(name: String): [CatBreed]
  }
`;

const resolvers = {
  Query: {
    catBreeds: catBreedsResolver,
    catBreed: catBreedResolver,
    catBreedSearch: catBreedSearchResolver
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
);
