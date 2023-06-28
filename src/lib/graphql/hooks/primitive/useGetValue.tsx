import { QueryResult, useQuery, gql } from "@apollo/client";

import {
    QueryPrimitiveValue as Query,
    // QueryPrimitiveValueResponse as QueryResponse,
    // QUERY_PRIMITIVE_VALUE as QueryText,
} from '@andromedaprotocol/andromeda.js'

interface QueryResponse {
    ADO: {
        primitive: {
            getValue: {
                key: string;
                value: {
                    string: string;
                };
            }
        }
    }
}

export interface ReturnValue
    extends Pick<QueryResult, "loading" | "error"> {
    data?: QueryResponse['ADO']['primitive']['getValue'];
}

export function useGetPrimitiveValue(address: string, key = 'default', skip = false): ReturnValue {
    const { data, loading, error } = useQuery<QueryResponse, Query>(
        gql`
        query QUERY_PRIMITIVE_VALUE($contractAddress: String!, $key: String!) {
            ADO{
                primitive(address: $contractAddress) {
                  getValue(key: $key) {
                    key
                    value
                  }
                }
            }
          }
        `,
        { variables: { 'contractAddress': address, key: key }, skip },
    );
    return {
        loading,
        error,
        data: data?.ADO.primitive?.getValue
    }
}