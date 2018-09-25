import { GraphQLServer } from "graphql-yoga";
import { Prisma, Query } from "../generated/prisma";
import { forwardTo } from "graphql-binding";
import { set } from "shades";

const prisma = new Prisma({
  endpoint: "http://localhost:4466"
});

function getQueries(queries: Query) {
  const resolvers = {};
  for (const query of Object.keys(queries)) {
    resolvers[query] = forwardTo("db");
  }
  return resolvers;
}

const server = new GraphQLServer({
  typeDefs: "./schema.graphql",
  resolvers: {
    Query: {
      ...getQueries(prisma.query),
      ...{
        tracks: (_, args, { db }, info) => {
          console.log(
            "If you run the tracks query from the top level, you will see this print out"
          );
          return db.query.tracks(args, info as any);
        }
      }
    }
  },
  context: set("db")(prisma)
});

server.start();
