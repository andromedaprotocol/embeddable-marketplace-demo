import { ApolloClient, InMemoryCache } from "@apollo/client";


/**
 * Apollo client used for queries, may require some state usage later
 */
export const apolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});
