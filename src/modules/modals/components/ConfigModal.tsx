import { useGetTokenFromColId, useGetCollection, useGetCollectionByAddress,  useGetTokens } from "@/lib/graphql/hooks/collection";
import { useGetTokenAuctionStateFromColId } from "@/lib/graphql/hooks/auction";
import useApp from "@/lib/app/hooks/useApp";
import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    Heading,
    HStack,
    Input,
    Text,
    IconButton
  } from "@chakra-ui/react";
import { Trash, Trash2 } from "lucide-react";
import {FC,  useEffect,  useState, useRef } from "react";
import { useGlobalModalContext } from "../hooks";
import { ConfigModalProps } from "../types";

import { parseValue } from "graphql";
import { coin } from "@cosmjs/proto-signing";
import useGetAuction from "@/lib/graphql/hooks/collection/useGetAuction";
import useGetApp from "@/lib/graphql/hooks/app/useGetApp";




const ConfigModal: FC<ConfigModalProps> = (props) => {
    const { config, updateConfigState } = useApp();

    const initialInputList = config.collections.map((collection) => {
        return {
          id: collection.id,
          contractAddress: collection.contractAddress,
          auctionAddress: collection.auctionAddress,
          stubLink: collection.stubLink,
          valid: true,
          AMvalid: true,
          featured: false
        };
      });

    //will need to map existing config file to this object array
    const [tempObj, setTempObj] = useState();
    const [inputList, setInputList] = useState(initialInputList);
    const [appAddress, setAppAddress] = useState(config.appAddress);
    const [currentIndex, setCurrentIndex] = useState(0);
    const isFirstRun = useRef(true);
    const [siteTitle, setSiteTitle] = useState(config.name);
    const [chainId, setChainId] =useState(config.chainId);
    const [coinDenom, setCoinDenom ] = useState(config.coinDenom);
    const [featuredToken, setFeaturedToken] = useState(config.featured.tokenId);
    const [isLoading, setIsLoading] = useState(false);
    const {data, loading, error} = useGetCollectionByAddress(inputList[currentIndex].contractAddress);
    const {data: auctionData, loading: auctionLoading, error: auctionError} = useGetTokenAuctionStateFromColId(inputList[currentIndex].auctionAddress, inputList[currentIndex].contractAddress, featuredToken );
    const {data: appData, loading: appLoading, error: appError} = useGetApp(appAddress);
    const [isUserAction, setIsUserAction] = useState(false);
    
    
   const handleUpdateContractInfo = (index, obj) => {
    setIsUserAction(true);
    setInputList(prevInputList =>{
        const updatedInputList = [...prevInputList];
        const updatedObject = {...updatedInputList[index], 
                                id: obj.contractInfo.name,  
                                contractAddress: inputList[currentIndex].contractAddress,
                                stubLink: obj.contractInfo.name.replace(/\s+/g, '-').toLowerCase(),
                                valid: true,

        }
        updatedInputList[index] = updatedObject;
        return updatedInputList;
    })
    
   }

   const handleAppAddressInfo = (obj)=>{
    setIsUserAction(true);
    setTempObj(obj);

   }

    
    useEffect(()=>{
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
          }
      
       
        if (data && !isUserAction) {
            handleUpdateContractInfo(currentIndex, data);
           console.log('preventing recursive!');
        } else {
            //setColAuc1Visible(false);
        }
        console.log('recur 1');

        // if (appData && !isUserAction){
        //     handleAppAddressInfo(appData);
        //     console.log("app Data!");
        //     console.log(appData);
        // }
        
    }, [inputList, isUserAction])

    const checkAppAddress = (event) =>{

        const appAddress = event.currentTarget.value;
        setAppAddress(appAddress);
        console.log("AppAddress:", appAddress);
        


    }

    const checkAddress = (event, index) =>{
        
       
       const list = [...inputList];
       console.log(index);
       list[index].valid = false;
       list[index].contractAddress = event.currentTarget.value;
       setCurrentIndex(index);
       setInputList(list);
       setIsUserAction(false);
       
    }

    const checkAuctionAddress = (event, index) =>{
        const list = [...inputList];
        console.log(index);
        list[index].valid = false;
        list[index].auctionAddress = event.currentTarget.value;
        setCurrentIndex(index);
        setInputList(list);
        setIsUserAction(false);

        return
    }


    const handleAddClick = () => {
        setInputList([...inputList, { id: "", contractAddress: "", auctionAddress: "", valid: false, AMvalid: false, stubLink: "" }]);
      };
    
    const handleRemoveClick = (index) => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
      };

    const handleSetTitle = (event) =>{
        setSiteTitle(event.currentTarget.value);
    }
    const handleSetFeaturedToken = (event) =>{
        setFeaturedToken(event.currentTarget.value);
    }

    const handleChainId = (event) =>{
        setChainId(event.currentTarget.value);
    }
    const handleCoinDenom = (event) =>{
        setCoinDenom(event.currentTarget.value);
    }

    const handleCheckbox = (event, index) =>{
       // setIsUserAction(true);
       
        setInputList( prevInputList => {
             const newInputList = [...prevInputList];
             for (let i = 0; i < newInputList.length; i++) {
                newInputList[i].featured = false; 
              }
             newInputList[index].featured = event.target.checked;
             return newInputList;
         })
         
    }

    const getCurrentConfig = () => {
        const obj = {
            "name":siteTitle,
            "chainId" : chainId,
            "coinDenom" : coinDenom,
            "featured" : {
                            "collectionId" :"",
                            "tokenId": featuredToken
                    }
                    
               
               
            ,
            "collections":
                inputList.map((input)=>{
                    return{
                        "id": input.id,
                        "contractAddress" : input.contractAddress,
                        "auctionAddress" : input.auctionAddress,
                        "stubLink" : input.stubLink
                    }

                })
            
            
            
        }
        return obj;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        //getCollection(colAdd1);
        const currentConfig = getCurrentConfig();

        //console.log(currentConfig);
        updateConfigState(currentConfig);
      
    };

    console.log(appData);

    return(
        <Box w='100%'>
            <Heading size="md" mb="6" fontWeight="bold">
            </Heading>
            <Box textAlign="center">
                <form onSubmit={handleSubmit}>
                <Box borderWidth="1px" borderRadius="md" p="4">
                    <FormLabel>App Address: 
                        <Input type="text" size="sm" name="appAddress" value={appAddress} onChange={(e)=>checkAppAddress(e)}/>
                    </FormLabel>
                  
                    <FormLabel>Site Title
                        <Input type="text" size="sm" name="siteName" value={siteTitle} onChange={(e)=>handleSetTitle(e)}/>
                    </FormLabel>
                    <FormLabel>Chain ID
                        <Input type="text" size="sm" name="chainId" value={chainId} onChange={(e)=>handleChainId(e)}/>
                    </FormLabel>
                    <FormLabel>Coin Denomination
                        <Input type="text" size="sm" name="coinDenom" value={coinDenom} onChange={(e)=>handleCoinDenom(e)}/>
                    </FormLabel>

                    {inputList.map((input, index)=>(
                        <div key={index}  style={{ marginTop: '16px' }}>
                            <Box borderWidth="1px" borderRadius="md" p="4">
                                <FormLabel>Collection Address : {input.valid ? input.id : 'checking contract address...' } 
                                <IconButton  size="xs" ml="10" onClick={() => handleRemoveClick(index)} icon={<Trash2 />} aria-label={""} />
                                    <Input type="text" value={input.contractAddress} size="sm" onChange={(e)=>checkAddress(e, index)}/>
                                </FormLabel>
                                {input.valid ? (
                                    <div>
                                        <FormLabel>(Optional) Collection Auction/Market
                                            <Input type="text" value={input.auctionAddress} size="sm" onChange={(e)=>checkAuctionAddress(e, index)}/>
                                        </FormLabel>
                                        {input.AMvalid ? (
                                            <div>
                                                <Checkbox size="sm" mr="200" colorScheme="green" checked={input.featured} onChange={(e)=>handleCheckbox(e, index)}>
                                                    featured? 
                                                </Checkbox>
                                                {input.featured ? (
                                                    <div>
                                                        <FormLabel>Token ID:  
                                                            <Input type="text" value={featuredToken} size="xs" htmlSize={3} width='auto' onChange={handleSetFeaturedToken}/>
                                                        </FormLabel>
                                                    </div> 
                                                ): null }
                                            </div>
                                        ) : null}
                                    </div> 
                                ): null }
                               
                                
                                
                                
                            </Box>
                        </div>
                    ))}
                    <br/>
                    <Box textAlign="right" mt="4">
                        <Button type="button" onClick={handleAddClick}>
                            Add Another Contract
                        </Button>
                   
                        <Button
                            isLoading={loading}
                            loadingText='Submitting'
                            colorScheme='teal'
                            variant='outline' 
                            type="submit"                          
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
                </form>
            </Box>
        </Box>
    )

};


export default ConfigModal;


