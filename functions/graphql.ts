import { set } from 'shades';
import { forwardTo } from 'graphql-binding';
import { ApolloServer, gql } from 'apollo-server-lambda';

import { Prisma, Query } from '../generated/prisma';
import typeDefs from '../schema.graphql';

declare const ENDPOINT: string;

const prisma = new Prisma({
  endpoint: ENDPOINT
});

function getQueries(queries: Query) {
  const resolvers = {};
  for (const query of Object.keys(queries)) {
    resolvers[query] = forwardTo('db');
  }
  return resolvers;
}

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      ...getQueries(prisma.query),
      ...{
        tracks: (_, args, { db }, info) => {
          console.log(
            'If you run the tracks query from the top level, you will see this print out'
          );
          return db.query.tracks(args, info as any);
        }
      }
    }
  },
  context: set('db')(prisma)
});

exports.handler = server.createHandler();
