import { useState, useEffect } from 'react';

export interface ITokenUriObject {
  attributes?: {
    trait_type: string;
    value: string;
  }[];
  description?: string;
  image?: string;
  name?: string;
  [key: string]: any;
}

export default function useGetTokenUriObject(tokenUri: string) : 
  {   
    loading: boolean; 
    error: Error | null; 
    data: ITokenUriObject | null;
  } 
  {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [data, setData] = useState<ITokenUriObject | null>(null);

    useEffect(() => {
      async function fetchData() {
        try {
          const json = JSON.parse(tokenUri);
          setData(json);
        } catch {
          try {
            const response = await fetch(tokenUri);
            const json = await response.json();
            setData(json);
          } catch (error: unknown) {
            setError(error as Error);
          }
        } finally {
          setLoading(false);
        }
      }

      fetchData();
    }, [tokenUri]);

    return {
      loading,
      error,
      data,
    };
  }