import express from 'express';
import bodyParser from 'body-parser';

import { apolloExpress, graphiqlExpress } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';

import Schema from './data/schema';
import Resolvers from './data/resolvers';

const GRAPHQL_PORT = 8080;

const graphQLServer = express();

const executableSchema = makeExecutableSchema({
    typeDefs: Schema,
    resolvers: Resolvers,
    allowUndefinedInResolve: false,
    printErrors: true
});

// `context` must be an object and can't be undefined when using connectors
graphQLServer.use('/graphql', bodyParser.json(), apolloExpress({
    schema: executableSchema,
    context: {}
}));

graphQLServer.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
}));

graphQLServer.listen(GRAPHQL_PORT, () => console.log(
    `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql or http://localhost:${GRAPHQL_PORT}/graphiql`
));
