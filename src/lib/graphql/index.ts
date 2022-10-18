import { ApolloClient, InMemoryCache } from "@apollo/client";

export * from "./hooks";

/**
 * Apollo client used for queries, may require some state usage later
 */
export const apolloClient = new ApolloClient({
  uri: "https://andr-graphql.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});
