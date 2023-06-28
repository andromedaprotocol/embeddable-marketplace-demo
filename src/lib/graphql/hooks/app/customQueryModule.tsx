import { gql } from "@apollo/client";


// custom queries written for the configuration component.  
// a couple of these may already exist in andr.js library, but these were necessary for the configuration functionality.




export type QueryCW721Address = {
    cw721Address: string;
   
};

export const QueryCW721AddressText = gql`
 query QUERY_CW721_CONTRACT_INFO($cw721Address: String!) {
        cw721(address: $cw721Address) {
          contractInfo {
            name
            symbol
          }
          numTokens
        }
      }
`;

export type QueryCW721AddressResponse = {
    cw721: {
       contractInfo:{
        name:string;
        symbol: string;
       }
    }

};




export type QueryCW721Tokens = {
    cw721Address: string;
};

export const QueryCW721TokensText = gql`
 query QUERY_CW721_ALLTOKENS($cw721Address: String!) {
    ADO{
    cw721(address: $cw721Address){
      allTokens
    }
  }
 }
`;

export type QueryCW721TokensResponse = {
    ADO: {
       cw721:{
        allTokens:string[]
       }
    }
};


export type QueryCheckAdoType = {
    auctionAddress: string;
   
};

export const QueryCheckAdoTypeText = gql`
 query QUERY_CHECK_AUCTION($auctionAddress: String!) {
    ADO{
    ado(address:$auctionAddress){
      andr{
        type
      }
    }
  }
 }
`;

export type QueryCheckAdoTypeResponse = {
    ADO: {
       ado:{
        andr:{
            type:string;
        }
       }
    }

};


export const QueryChainDataText = gql`
 query QUERY_CHAIN{
  chainConfigs{
    allConfigs{
      addressPrefix,
      chainId,
      
    }
  }
}
`;

export type QueryChainDataResponse = {
    chainConfigs: {
       allConfigs:[{
        addressPrefix: string;
        chainId: string;
        }]
       }
    };

export const QueryChainDenominationText = gql`
query QUERY_KEPLER{
  keplrConfigs{
    allConfigs{
      chainId,
      chainName,
      currencies{coinDenom}
    	
    }
  }
}
`;

export type QueryChainDenominationResponse = {
    keplrConfigs: {
        allConfigs:[{
            chainId: string;
            chainName: string;
            currencies: [{
                coinDenom:string;
            }]
        }]
        }
    };
   




export type QueryCW721Auction = {
    cw721Address: string;
    tokenId: string;
};

export const QueryCW721AuctionText = gql`
 query QUERY_CW721_AUCTION($cw721Address: String!, $tokenId: String!) {
    ADO{
    cw721(address:$cw721Address){
      ownerOf(includeExpired:true, tokenId: $tokenId){
        auctionAddress: owner
      }
    }
  }
 }
`;

export type QueryCW721AuctionResponse = {
    ADO: {
       cw721:{
        ownerOf:{
            auctionAddress:string;
        }
       }
    }

};



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



