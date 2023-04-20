import {
    QueryADOAppAddressText as QueryAppAddressText,
    QueryADOAppAddressResponse as QueryAppAddressResponse,
    QueryCW721AddressByNameText,
    QueryCW721AddressByNameResponse,
    QueryCW721TokensResponse,
    QueryCW721TokensText,
    QueryCW721AuctionResponse,
    QueryCW721AuctionText,
    QueryCheckAdoTypeResponse,
    QueryCheckAdoTypeText,
    QueryChainDataResponse,
    QueryChainDataText,
    QueryChainDenominationResponse,
    QueryChainDenominationText,
    QueryCW721AddressResponse,
    QueryCW721AddressText
  } from "./customQueryModule";
  import { ApolloClient, InMemoryCache } from "@apollo/client";
  import { useEffect, useState } from "react";
  
  const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;
  const client = new ApolloClient({ uri: endpoint, cache: new InMemoryCache() });
  
  interface IComponentData {
    name: string;
    address: string | null;
    ado_type: string;
  }

  interface IChainResponse {
    addressPrefix: string;
    chainId:string;
  };

  interface IAllCW721Info {
        id?: string;
        name?: string;
        contractAddress?: string;
        auctionAddress?: string;
        marketplaceAddress?:string;
        stubLink?: string;
        tokens?: string[];
        featured?: boolean;
        AMType?: string;
  }
  
  interface IAppData{
    name: string;
    chainId?: string;
    coinDenom?: string;
    appAddress?: string;
    featured?:{
        collectionId: string;
        tokenId: string;
    };
    collections?:{
        id: string;
        name: string;
        contractAddress: string;
        auctionAddress: string;
        marketplaceAddress:string;
        stubLink: string;
        tokens: string[];
        AMType?: string;
    }[];
  }

  
// custom hook to validate the ADO application address and build the ADO application object
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

   // First query to see if the application address is valid.
   const appDataResponse = await client.query<QueryAppAddressResponse>({
    query: QueryAppAddressText,
    variables:{appAddress}
   });

   const appData: IAppData = {
       name: appDataResponse.data.ADO.app.config.name
       
   }

   //let's get the chain data 
   const allChainData = await client.query<QueryChainDataResponse>({
    query: QueryChainDataText
   });
 
   // get the correct chain ID based on the address prefix
   const chainResponse = await allChainData.data.chainConfigs.allConfigs.find(chain => appAddress.startsWith(chain.addressPrefix));
   const chain = chainResponse?.chainId;
   appData.chainId = chain;

   //now let's get the chain token demonination
   const allDenomData = await client.query<QueryChainDenominationResponse>({
    query: QueryChainDenominationText
   });
   const denominationResponse = await allDenomData.data.keplrConfigs.allConfigs.find(denom => (denom.chainId === chain));
   const denomination = denominationResponse?.currencies[0].coinDenom;
   appData.coinDenom = denomination;
   
   // filter the objects by only cw721 and go get their addresses
   const addressPromises =   appDataResponse.data.ADO.app.components.filter((component) => component.ado_type === "cw721").map(async (component)=>{
       const  componentAddress  = await client.query<QueryCW721AddressByNameResponse>({
            query: QueryCW721AddressByNameText,
            variables: { appAddress, collectionName: component.name },
        });
        return{
            name: component.name,
            address: componentAddress.data.ADO.app.getAddress
        }
    })

    // get all the CW721 Addresses from our cw721 filtered, mapped query
    const allCW721 = await Promise.all(addressPromises);

    // get all of the tokens for each of the cw721 objects using the cw721 address
    const tokenPromises = allCW721.map( async (cw721)=>{
        //get CW721 Token IDs
        const allTokens = await client.query<QueryCW721TokensResponse>({
            query: QueryCW721TokensText,
            variables: { cw721Address: cw721.address },

            });
        
        return{
            id:cw721.name,
            contractAddress: cw721.address,
            tokens: [...allTokens.data.ADO.cw721.allTokens],
            featured: false,
            name:"",
            auctionAddress:"",
            marketplaceAddress:"",
            stubLink:"",
            AMType:""

        }
    });

 
    // get cw721 objects with new address info
    let allTokens = await Promise.all(tokenPromises);

    //get the names for the labels and stubs.
    allTokens = await Promise.all(
        allTokens.map(async cw721=>{
        
            const cw721Data = await client.query<QueryCW721AddressResponse>({
                query: QueryCW721AddressText,
                variables:{cw721Address: cw721.contractAddress}
            });
        

            return{
                ...cw721,
                name: cw721Data?.data.cw721.contractInfo.name,
                stubLink: cw721Data?.data.cw721.contractInfo.name.replace(/\s+/g, '-').toLowerCase(),
            }
        })
    );

   
    // get the auction or market objects.
    const allCW721InfoRaw = await Promise.all(
        allTokens.map(async cw721 => {
            let auctionObj: AuctionObject | null = null;
            let index = 0;

            do {
            auctionObj = await checkAuctionMarketInfo(cw721.contractAddress, cw721.tokens[index].toString());
            index++;
            } while (!auctionObj && index < cw721.tokens.length);

            // Update the cw721 object with the auction object
            if (auctionObj) {

                if (auctionObj.adoType === 'auction') {
                    return {
                    ...cw721,
                    auctionAddress: auctionObj.auctionAddress,
                    AMType: auctionObj.adoType
                    };
                } else if (auctionObj.adoType === 'marketplace'){
                    return {
                    ...cw721,
                    marketplaceAddress: auctionObj.auctionAddress,
                    AMType: auctionObj.adoType
                    };
                }
            } else {
                return cw721;
            }
        })
    );

    const allCW721Info: IAllCW721Info[] = allCW721InfoRaw.map((item) => {
        // map each item to the IAllCW721Info interface
        return {
          id: item?.id,
          name: item?.name,
          contractAddress: item?.contractAddress,
          auctionAddress: item?.auctionAddress,
          marketplaceAddress: item?.marketplaceAddress,
          stubLink: item?.stubLink,
          tokens: item?.tokens,
          featured: item?.featured,
          AMType: item?.AMType,
        };
      });
    
    // set the first cw721 collection to featured
    allCW721Info[0].featured = true;
 
   

 

    const config = {
        name: appData.name,
        chainId: chain,
        coinDenom: denomination,
        appAddress: appAddress,
        collections:[ ...allCW721Info],
        featured:{
            collectionId: allCW721Info[0].id, 
            tokenId: allCW721Info[0]?.tokens?.[0] || ""
        }


    };



    
    return config;

}

type AuctionObject = {
    auctionAddress: string,
    adoType: string,
    // other properties
  };


// function to get auction or market information for the auction/market address.
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
  
}


  
  export default useGetApp;
  