import { ApolloServer } from 'apollo-server-lambda';
import { forwardTo } from 'graphql-binding';
import { always, map, set } from 'shades';

import { Prisma, Query } from '../generated/prisma';
import typeDefs from '../schema.graphql';

declare const ENDPOINT: string;

const prisma = new Prisma({
  endpoint: ENDPOINT
});

const forwardToPrisma = map(always(forwardTo('db')))

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: forwardToPrisma(prisma.query),
    Mutation: forwardToPrisma(prisma.mutation),
  },
  context: set('db')(prisma)
});

exports.handler = server.createHandler({
  cors: {
    origin: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
  }
});
