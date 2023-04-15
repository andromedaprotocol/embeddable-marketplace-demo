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
    IconButton,
    Radio,
    RadioGroup,
    Textarea
  } from "@chakra-ui/react";
import { Trash, Trash2, Clipboard } from "lucide-react";
import {FC,  useEffect,  useState, useRef } from "react";
import { useGlobalModalContext } from "../hooks";
import { ConfigModalProps } from "../types";

import { parseValue } from "graphql";
import { coin } from "@cosmjs/proto-signing";
import useGetAuction from "@/lib/graphql/hooks/collection/useGetAuction";
import useGetApp from "@/lib/graphql/hooks/app/useGetApp";
import useGetCW721 from "@/lib/graphql/hooks/app/useGetCW721";
import useGetContract from "@/lib/graphql/hooks/app/useGetApp";




const ConfigModal: FC<ConfigModalProps> = (props) => {
    const { config, updateConfig } = useApp();

    const initialInputList = config.collections.map((collection) => {
        return {
          id: collection.id,
          contractAddress: collection.contractAddress,
          auctionAddress: collection.auctionAddress,
          stubLink: collection.stubLink,
          valid: true,
          AMValid: true,
          featured: collection.featured
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
    const [featuredCollection, setFeaturedCollection] = useState(config.featured ? config.featured.collectionId : '');
    const [featuredToken, setFeaturedToken] = useState(config.featured ? config.featured.tokenId : '');
    const [isLoading, setIsLoading] = useState(false);
    const [currentContract, setCurrentContract] = useState();
    const {data, loading, error} = useGetCW721(currentContract);
    const {data: auctionData, loading: auctionLoading, error: auctionError} = useGetTokenAuctionStateFromColId(inputList[currentIndex].auctionAddress, inputList[currentIndex].contractAddress, featuredToken );
    const {data: appData, loading: appLoading, error: appError} = useGetApp(appAddress);
    const [isUserAction, setIsUserAction] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showConfigModal, setShowConfigModal] = useState(true);

   const handleUpdateContractInfo = (index, obj) => {

    console.log('handle update contract info:', obj);
   // setIsUserAction(true);
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
    //setIsUserAction(true);
    setTempObj(obj);

   }

    
    useEffect(()=>{
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
          }
      
          if (data) {
        //if (data && !isUserAction) {
            handleUpdateContractInfo(currentIndex, data);
           console.log('here!');
        } else {
            //setColAuc1Visible(false);
        }
        
        if (appData && !isUserAction){
            setIsUserAction(true);
            console.log('lets update!');
            setSiteTitle(appData.name);
            setChainId(appData.chainId);
            setCoinDenom(appData.coinDenom);
            setFeaturedCollection(appData.featured.collectionId);
            console.log('featured collection set:', appData.featured.collectionId.toLowerCase());
            console.log('featured collection:', featuredCollection.toLowerCase());
            setFeaturedToken(appData.featured.tokenId);
            setInputList( prevInputList => {
                const appDataList = [...appData.collections];
                const newInputList: { contractAddress: string, featured: boolean, id: string, valid: boolean, auctionAddress: string, AMValid: boolean }[] = [];
                for (let i = 0; i < appDataList.length; i++) {
                    const newObj = {
                        featured: appDataList[i].featured,
                        id: appDataList[i].id,
                        contractAddress: appDataList[i].contractAddress,
                        auctionAddress: appDataList[i].auctionAddress,
                        AMValid: true,
                        valid: true,
                      };

                      newInputList.push(newObj);

                 }
                
                return newInputList;
            });
            //setInputList([]);
        }

        // if (appData && !isUserAction){
        //     handleAppAddressInfo(appData);
        //     console.log("app Data!");
        //     console.log(appData);
        // }
        
    }, [inputList, isUserAction, appData, data, currentContract])

    const checkAppAddress = (event) =>{

        const appAddress = event.currentTarget.value;
        setAppAddress(appAddress);
        console.log("AppAddress:", appAddress);
        //setIsUserAction(false);
        


    }

    const checkAddress = (event, index) =>{
        
       
       const list = [...inputList];
       list[index].valid = false;
       list[index].contractAddress = event.currentTarget.value;
       setCurrentIndex(index);
       setCurrentContract(event.currentTarget.value)
       setInputList(list);
       //setIsUserAction(false);
       
    }

    const checkAuctionAddress = (event, index) =>{
        const list = [...inputList];
        list[index].valid = false;
        list[index].auctionAddress = event.currentTarget.value;
        setCurrentIndex(index);
        setInputList(list);
        setIsUserAction(false);

        return
    }


    const handleAddClick = () => {
        setInputList([...inputList, { id: "", contractAddress: "", auctionAddress: "", valid: false, AMValid: false, stubLink: "" }]);
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
    const handleCheckbox = (event, index) => {
        setInputList(prevInputList => {
          const newInputList = prevInputList.map((input, i) => {
            if (i === index) {
              input.featured = event.target.checked;
            } else {
              input.featured = false;
            }
            return input;
          });
          console.log('New Input List:',newInputList[index].featured );
          console.log('Checkbox Index:', index);
          return newInputList;
        });
      }
    
    
   

    const getCurrentConfig = () => {
        console.log('Input List:', inputList);
        const featuredIndex = inputList.findIndex(obj => obj.featured);
        console.log('featuredIndex:', featuredIndex);
        console.log('featuredobj:', inputList[featuredIndex]);
        const featId = inputList[featuredIndex].id ? inputList[featuredIndex].id : '';
        const obj = {
            "appAddress": appAddress,
            "name":siteTitle,
            "chainId" : chainId,
            "coinDenom" : coinDenom,
            "collections":
                inputList.map((input)=>{
                    return{
                        "id": input.id,
                        "contractAddress" : input.contractAddress,
                        "auctionAddress" : input.auctionAddress,
                        "stubLink" : input.stubLink
                    }

                }),
            "featured" : {
                "collectionId" : featId,
                "tokenId": featuredToken
            }
            
            
            
        }
        console.log('Input List:', inputList[featuredIndex]);
        console.log('featuredIndex:', featuredIndex);
        return obj;
        
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        const currentConfig = getCurrentConfig();
        updateConfig(currentConfig);
        console.log('Submitted Object:');
        console.log(currentConfig);
        console.log('config state:');
        console.log(config);
        setShowModal(true);
      
    };

    const handleClose = () => {
        setShowModal(false);
        setShowConfigModal(false);
      };

      const handleCopy = () => {
        navigator.clipboard.writeText(JSON.stringify(getCurrentConfig(), null, 2));
      };

    console.log(appData);

    return(
    <>
        {showConfigModal && (
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
                                        {input.AMValid ? (
                                            <div>
                                                <Checkbox size="sm" mr="200" colorScheme="green"  isChecked={input.featured} onChange={(e)=>handleCheckbox(e, index)}>
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
            {showModal && (
                <Box
                pos="fixed"
                top="0"
                left="0"
                right="0"
                bottom="0"
                bg="rgba(0,0,0,0.8)"
                display="flex"
                alignItems="center"
                justifyContent="center"
                >
                <Box
                    p="4"
                    bg="white"
                    maxW="800px"
                    w="100%"
                    borderRadius="md"
                    boxShadow="lg"
                >
                    <Heading as="h3" size="md" mb="4">
                    Current Config - Save to config.json file to make permanent.
                    </Heading>
                    <Box position="relative">
                    <Textarea
                        rows="10"
                        value={JSON.stringify(getCurrentConfig(), null, 2)}
                        readOnly
                        
                        resize="none"
                        onFocus={(e) => {
                        e.target.rows = "20";
                        }}
                        onBlur={(e) => {
                        e.target.rows = "1";
                        }}
                        _focus={{
                        boxShadow: "none",
                        }}
                    />
                    <HStack
                        position="absolute"
                        top="2"
                        right="2"
                        h="100%"
                        color="gray.400"
                    >
                        <Button
                        size="xs"
                        variant="link"
                        onClick={handleCopy}
                        leftIcon={<Clipboard />}
                        >
                        Copy to clipboard
                        </Button>
                    </HStack>
                    </Box>
                    <Button onClick={handleClose} mt="4">
                    Close
                    </Button>
                </Box>
                </Box>
            )}
        </Box>
        )}
    </>
    );

};


export default ConfigModal;


