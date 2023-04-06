import {
    QueryADOAppAddress as QueryAppAddress,
    QueryADOAppAddressText as QueryAppAddressText,
    QueryADOAppAddressResponse as QueryAppAddressResponse,
    QueryCW721AddressByName as QueryCW721Address,
    QueryCW721AddressByNameText as QueryCW721AddressText,
    QueryCW721AddressByNameResponse as QueryCW721AddressResponse,
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
  
interface IQueryResult extends Pick<QueryResult<QueryAppAddressResponse>, "loading" | "error"> {
    data: {
      name: string;
      address: string | null;
      components: IComponentData[];
    } | undefined;
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
            setError('some error');
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
  
// create another function
// abstract logic inside function
// 
const getConfig = async (appAddress: string)=>{

   const appData = await client.query<QueryAppAddressResponse>({
    query: QueryAppAddressText,
    variables:{appAddress}
   });

 const addressPromise =   appData.data.ADO.app.components.filter((component) => component.ado_type === "cw721").map(async (component)=>{
    const  componentAddress  = await client.query<QueryCW721AddressResponse>({
        query: QueryCW721AddressText,
        variables: { appAddress, collectionName: component.name },
      });
    return{
        name: component.name,
        address: componentAddress.data.ADO.app.getAddress
    }
   })

 const allCW721 = await Promise.all(addressPromise);

 const somePromises = allCW721.map( async (cw721)=>{
    //get CW721 Token IDs
 })

 return allCW721;

}

const getCW721Address = async (
    client: ApolloClient<any>,
    appAddress: string,
    collectionName: string
  ): Promise<IQueryResult> => {
    try {
      const { data } = await client.query<QueryCW721AddressResponse>({
        query: QueryCW721AddressByNameText,
        variables: { appAddress, collectionName },
      });
  
      return { loading: false, error: undefined, data };
    } catch (error: Error) {
      return { loading: false, error, data: undefined };
    }
  };
  
  export default useGetApp;
  