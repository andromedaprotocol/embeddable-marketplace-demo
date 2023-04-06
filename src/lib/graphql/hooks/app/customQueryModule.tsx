import { gql } from "@apollo/client";

export const QueryADOAppAddressText = gql`
  query QUERY_APP_ADDRESS($appAddress: String!) {
    ADO {
      app(address: $appAddress) {
        config {
          name
        }
        components {
          name
          address
          ado_type
        }
      }
    }
  }
`;

export type QueryADOAppAddressResponse = {
  ADO: {
    app: {
      config: {
        name: string;
      };
      components: {
        extraData: any;
        name: string;
        address: string | null;
        ado_type: string;
      }[];
    };
  };
};

export type QueryADOAppAddress = {
  appAddress: string;
};


export const QueryCW721AddressByNameText = gql`
query QUERY_CW721_ADDRESS($appAddress: String!, $collectionName: String!){
  ADO{
    app(address:$appAddress){
    	getAddress(name:$collectionName)
    }
  }
}
`;

export type QueryCW721AddressByNameResponse = {
    ADO: {
        app: {
            getAddress: string;
        };
    };
};

export type QueryCW721AddressByName = {
    appAddress: string;
    collectionName: string;
}