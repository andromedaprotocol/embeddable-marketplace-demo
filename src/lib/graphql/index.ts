import { StrictTypedTypePolicies, TypedFieldPolicy } from "@andromedaprotocol/gql";
import { ApolloClient, InMemoryCache } from "@apollo/client";


/**
 * Apollo client used for queries, may require some state usage later
 */
export const apolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  'defaultOptions': {
    'query': {
      'notifyOnNetworkStatusChange': true,
      'fetchPolicy': 'cache-first'
    }
  },
  ssrMode: true,
  ssrForceFetchDelay: 500,
  cache: new InMemoryCache({
    typePolicies: {
      ...TypedFieldPolicy,
      ChainConfig: {
        keyFields: ['chainId']
      },
      ChainConfigQuery: {
        merge: true
      },
      AccountsQuery: {
        fields: {
          assets: {
            // Don't cache separate results based on
            // any of this field's arguments.
            keyArgs: ['walletAddress'],

            // Concatenate the incoming list items with
            // the existing list items.
            merge(existing, incoming, { args }) {
              const offset = args?.offset ?? 0;
              console.log(args?.offset, "ARGS", incoming, existing)
              // Slicing is necessary because the existing data is
              // immutable, and frozen in development.
              const merged = existing ? existing.slice(0, offset) : [];
              merged.push(...incoming)
              return merged;
            },
          }
        }
      },
      AssetResult: {
        keyFields: ['address', 'name', 'chainId']
      },
      NftInfo: {
        keyFields: ['tokenId']
      }
    } as StrictTypedTypePolicies
  }),
});
