import {
    QueryADOAppAddress as QueryAppAddress,
    QueryADOAppAddressText as QueryAppAddressText,
    QueryADOAppAddressResponse as QueryAppAddressResponse,
    QueryCW721AddressByName as QueryCW721Address,
    QueryCW721AddressByNameText as QueryCW721AddressText,
    QueryCW721AddressByNameResponse as QueryCW721AddressResponse,
    QueryCW721TokensResponse as QueryCW721TokensResponse,
    QueryCW721TokensText as QueryCW721TokensText,
    QueryCW721AuctionResponse,
    QueryCW721AuctionText,
    QueryCheckAdoTypeResponse,
    QueryCheckAdoTypeText,
    QueryChainDataResponse,
    QueryChainDataText,
    QueryChainDenominationResponse,
    QueryChainDenominationText
  } from "./customQueryModule";
  import { ApolloClient, InMemoryCache, QueryResult, useQuery } from "@apollo/client";
  import { useEffect, useMemo, useState } from "react";
  
  const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;
  const client = new ApolloClient({ uri: endpoint, cache: new InMemoryCache() });
  
  interface IComponentData {
    name: string;
    address: string | null;
    ado_type: string;
  }
  
  
const useGetApp =  (appAddress: string) => {
    
    const [error, setError] = useState<string>();
    const [loading, setLoading] = useState(false);
    
     const [configData, setConfigData] = useState<any>();

     useEffect(()=>{
        setLoading(true);
        getConfig(appAddress).then( (result)=>{
            setConfigData(result);
        }

        )
        .catch( ()=>{
            setConfigData(undefined);
            setError('Did not find that app address.');
        }

        )
        .finally(()=>{
            setLoading(false);
            
        }
        )

     }, [appAddress]
     )
    
     return {
        data:configData,
        error: error,
        loading: loading
     }
    
  };
  


const getConfig = async (appAddress: string)=>{

   const appData = await client.query<QueryAppAddressResponse>({
    query: QueryAppAddressText,
    variables:{appAddress}
   });

   
   //let's get the chain data
   const allChainData = await client.query<QueryChainDataResponse>({
    query: QueryChainDataText
   });
 
   const chainResponse = await allChainData.data.chainConfigs.allConfigs.find(chain => appAddress.startsWith(chain.addressPrefix));
   
   const chain = chainResponse.chainId;
 
   appData.chainId = chain;

   //now let's get the chain demonination
   const allDenomData = await client.query<QueryChainDenominationResponse>({
    query: QueryChainDenominationText
   });

   const denominationResponse = await allDenomData.data.keplrConfigs.allConfigs.find(denom => (denom.chainId === chain));

   const denomination = denominationResponse?.currencies[0].coinDenom;
   
   appData.coinDenom = denomination;
   
 const addressPromises =   appData.data.ADO.app.components.filter((component) => component.ado_type === "cw721").map(async (component)=>{
    const  componentAddress  = await client.query<QueryCW721AddressResponse>({
        query: QueryCW721AddressText,
        variables: { appAddress, collectionName: component.name },
      });
    return{
        name: component.name,
        address: componentAddress.data.ADO.app.getAddress
    }
   })

 // get all the CW721 Addresses from our cw721 filtered, mapped query
 const allCW721 = await Promise.all(addressPromises);


 

 const tokenPromises = allCW721.map( async (cw721)=>{
    //get CW721 Token IDs

       const allTokens = await client.query<QueryCW721TokensResponse>({
        query: QueryCW721TokensText,
        variables: { cw721Address: cw721.address },

        });
      
    return{
        id:cw721.name,
        contractAddress: cw721.address,
        tokens: [...allTokens.data.ADO.cw721.allTokens]
    }

 });

 let allTokens = await Promise.all(tokenPromises);


 


 allTokens = await Promise.all(
    allTokens.map(async cw721 => {
      let auctionObj: AuctionObject | null = null;
      let index = 0;
  
      do {
        auctionObj = await checkAuctionMarketInfo(cw721.contractAddress, cw721.tokens[index]);
        index++;
      } while (!auctionObj && index < cw721.tokens.length);
  
      // Update the cw721 object with the auction object
      if (auctionObj) {

        if (auctionObj.adoType === 'auction') {
            return {
            ...cw721,
            auctionAddress: auctionObj.auctionAddress,
            };
        } else if (auctionObj.adoType === 'market'){
            return {
            ...cw721,
            marketAddress: auctionObj.auctionAddress,
            };
        }
      } else {
        return cw721;
      }
    })
  );

  allTokens[0].featured = true;
 

 const { components, ...appConfig} = appData.data.ADO.app;

 

 const config = {
    name: appData.data.ADO.app.config.name,
    chainId: chain,
    coinDenom: denomination,
    appAddress: appAddress,
    collections:[ ...allTokens],
    featured:{
        collectionId: allTokens[0].id,
        tokenId: allTokens[0].tokens[0]
    }


 };




 return config;

}

type AuctionObject = {
    auctionAddress: string,
    adoType: string,
    // other properties
  };


async function checkAuctionMarketInfo (cw721Address: string, tokenId: string): Promise<AuctionObject> {

    //get Auction Address if it exists.
    const auctionAddress = await client.query<QueryCW721AuctionResponse>({
        query: QueryCW721AuctionText,
        variables: { cw721Address, tokenId },
        });
    

    // if auction address is there, run the check auction query
    if (auctionAddress.data.ADO.cw721.ownerOf.auctionAddress) {
    
        const adoType = await client.query<QueryCheckAdoTypeResponse>({
            query: QueryCheckAdoTypeText,
            variables: {auctionAddress: auctionAddress.data.ADO.cw721.ownerOf.auctionAddress}
        });

        if (adoType.data.ADO.ado.andr.type) {
            return { auctionAddress: auctionAddress.data.ADO.cw721.ownerOf.auctionAddress, adoType: adoType.data.ADO.ado.andr.type };
        } else {
            throw new Error("adoType not found");
        }
    }
    else {
        throw new Error("auctionAddress not found");
      }
    //const { address, type } = auctionObj.data.ADO.auctionMarketInfo;
    


}


  
  export default useGetApp;
  