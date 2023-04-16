import {
   
    QueryCW721AuctionResponse,
    QueryCW721AuctionText,
    QueryCheckAdoTypeResponse,
    QueryCheckAdoTypeText,
   
  } from "./customQueryModule";
  import { ApolloClient, InMemoryCache, QueryResult, useQuery } from "@apollo/client";
  import { useEffect, useMemo, useState } from "react";
  
  const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;
  const client = new ApolloClient({ uri: endpoint, cache: new InMemoryCache() });
  
  

const useGetAuctionMarket =  (auctionAddress: string, cw721Address: string) => {
   // console.log('ererererere')
   // console.log(currentIndex)
    const [error, setError] = useState<string>();
    const [loading, setLoading] = useState(false);
    
     const [auctionData, setAuctionData] = useState<any>();

     useEffect(()=>{
        setLoading(true);
        checkAuctionMarket(auctionAddress, cw721Address).then( (result)=>{
            setAuctionData(result);
            console.log('auction contract found and sent');
            
        }

        )
        .catch( ()=>{
            setAuctionData(undefined);
            setError('some error');
        }

        )
        .finally(()=>{
            setLoading(false);
            
        }
        )

     }, [auctionAddress]
     )
    
     return {
        data:auctionData,
        error: error,
        loading: loading
     }
    
  };
  

  type AuctionObject = {
   auctionAddress: string,
   adoType: string,
   // other properties
   };

  async function checkAuctionMarket (auctionAddress: string, cw721Address:string): Promise<AuctionObject> {

  
      // First Check to see if contract is a valid auction type  
       const adoType = await client.query<QueryCheckAdoTypeResponse>({
           query: QueryCheckAdoTypeText,
           variables: {auctionAddress: auctionAddress}
       });

       if (adoType.data.ADO.ado.andr.type === "auction") {
         // Then Check to see if Auction belongs to the listed cw721
         console.log('checking the 2nd level');
         const auctionAddressCheck = await client.query<QueryCW721AuctionResponse>({
            query: QueryCW721AuctionText,
            variables: { cw721Address, tokenId: "1" }
            });
            // if the auction address for the cw721 matches the one the user is inputting, then this passes as a valid auction contract
           if (auctionAddress === auctionAddressCheck.data.ADO.cw721.ownerOf.auctionAddress)
           {
            console.log("Auction contract found");
            return { auctionAddress: auctionAddress, adoType: adoType.data.ADO.ado.andr.type };
           } 
           else {
            throw new Error("auction/market contract does not match CW721");
           }
       } else {
           throw new Error("adoType not found");
       }
  


}


  
  export default useGetAuctionMarket;
  