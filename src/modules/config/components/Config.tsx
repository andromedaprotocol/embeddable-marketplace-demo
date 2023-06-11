import React, { FC, useEffect, useRef, useState } from "react";
import {
    Box,
    Button,
    Checkbox,
    FormLabel,
    Heading,
    HStack,
    Input,
    IconButton,
    Textarea
  } from "@chakra-ui/react";
import useApp from "@/lib/app/hooks/useApp";
import useGetApp from "@/lib/graphql/hooks/app/useGetApp";
import { Trash2, Clipboard } from "lucide-react";
import useGetCW721 from "@/lib/graphql/hooks/app/useGetCW721";
import useGetAuctionMarket from "@/lib/graphql/hooks/app/useGetAuctionMarket";


interface ConfigProps {}


const Config: FC<ConfigProps> = (props) => {
   
    // current config and updateConfig funciton from useApp.
    const { config, updateConfig } = useApp();
    const isFirstRun = useRef(true);
    
    // state variables needed for our form data.
    const [appAddress, setAppAddress] = useState(config.appAddress);
    const [siteTitle, setSiteTitle] = useState(config.name);
    const [chainId, setChainId] =useState(config.chainId);
    const [coinDenom, setCoinDenom ] = useState(config.coinDenom);
    const [featuredCollection, setFeaturedCollection] = useState(config.featured ? config.featured.collectionId : '');
    const [featuredToken, setFeaturedToken] = useState(config.featured ? config.featured.tokenId : '');
    const [formErrorMessage, setFormErrorMessage] = useState("");
    
    //cw721 object list initially read from config state variable.
    const initialInputList = config.collections.map((collection) => {
        
        
        return {
          id: collection.id,
          name: collection.name,
          cw721: collection.cw721,
          auction: collection.auction,
          marketplaceAddress: collection.marketplaceAddress,
          crowdfundAddress: collection.crowdfundAddress,
          stubLink: collection.stubLink,
          valid: true,
          AMValid: true,
          featured: collection.id === config.featured.collectionId ? true : false
        };
      });
    
    //cw721 object list for our form.
    const [inputList, setInputList] = useState(initialInputList);
    
    //form state variables for last changed contract to check.
    const [currentContract, setCurrentContract] = useState("");
    const [currentAuctionMarketContract, setCurrentAuctionMarketContract] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    // data, loading and error objects from our custom hooks to get app, cw721 and auction/market contract address validation.
    const {data: appData, loading: appLoading, error: appError} = useGetApp(appAddress);
    const {data: cw721Data, loading: cw721Loading, error: cw721Error} = useGetCW721(currentContract);
    const {data: auctionData, loading: auctionLoading, error: auctionError} = useGetAuctionMarket(currentAuctionMarketContract, inputList[currentIndex].cw721);
    
    // modal for json text
    const [showConfigModal, setShowConfigModal] = useState(false);
    

    // monitoring data objects from our contract check functions
    useEffect(()=>{
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }

        if (appData){
            setInputList([]);
            updateFormData(appData);
        }

        if (cw721Data) {
            handleUpdateCW721Info(currentIndex, cw721Data);
        }

        if (auctionData) {
            handleUpdateAuctionMarketInfo(currentIndex, auctionData);
        }
        
        return;
    }, [appData, cw721Data, auctionData]);

    // Check the Application Address entered function.
    const checkAppAddress = (event: React.ChangeEvent<HTMLInputElement>) =>{

        const appAddress = event.currentTarget.value;
        setAppAddress(appAddress);
        
        
    }

    // Update the form with the new appData information
    const updateFormData = (appData: { name: string; chainId: string; coinDenom: string; featured: { collectionId: string; tokenId: string; }; collections: { id: string, featured: boolean, name: string, cw721: string, auction: string, marketplaceAddress: string, crowdfundAddress: string, stubLink: string, valid: boolean, AMValid: boolean}[]; }) =>{
        setInputList([]);
        setSiteTitle(appData.name);
        setChainId(appData.chainId);    
        setCoinDenom(appData.coinDenom);
        setFeaturedCollection(appData.featured.collectionId);
        setFeaturedToken(appData.featured.tokenId);
        setInputList( prevInputList => {
            const appDataList = [...appData.collections];
            const newInputList: { id: string, name: string, cw721: string, auction: string, marketplaceAddress: string, crowdfundAddress: string,  valid: boolean, AMValid: boolean, stubLink: string,  featured: boolean }[] = [];
            for (let i = 0; i < appDataList.length; i++) {
                const newObj = {
                    id: appDataList[i].id,
                    name: appDataList[i].name,
                    cw721: appDataList[i].cw721,
                    auction: appDataList[i].auction,
                    marketplaceAddress: appDataList[i].marketplaceAddress,
                    crowdfundAddress: appDataList[i].crowdfundAddress,
                    stubLink: appDataList[i].stubLink,
                    AMValid: true,
                    valid: true,
                    featured: appDataList[i].featured,
                  };

                  newInputList.push(newObj);

             }
            
            return newInputList;
        });
    }

    // CW721 Address Validation
    // check the entered contract address
    const checkCW721Address = (event: React.ChangeEvent<HTMLInputElement>, index: number) =>{
       const list = [...inputList];
       list[index].valid = false;
       list[index].cw721 = event.currentTarget.value;
       setCurrentIndex(index);
       setCurrentContract(event.currentTarget.value);
       setInputList(list);
       return;
    }

    //function to update the cw721 object in the object list
    const handleUpdateCW721Info = (index: number, obj: { contractInfo: { name: string; }; }) =>{
        setInputList(prevInputList =>{
            const updatedInputList = [...prevInputList];
            const updatedObject = {...updatedInputList[index], 
                                    id: obj.contractInfo.name.replace(/\s+/g, '-').toLowerCase(),
                                    name: obj.contractInfo.name,
                                    contractAddress: inputList[currentIndex].cw721,
                                    stubLink: obj.contractInfo.name.replace(/\s+/g, '-').toLowerCase(),
                                    valid: true,
    
            }
            updatedInputList[index] = updatedObject;
            return updatedInputList;
        })

    }


    // Auction ADO Address Validation
    // check the entered auction address
    const checkAuctionAddress = (event: React.ChangeEvent<HTMLInputElement>, index: number) =>{
        const list = [...inputList];
        list[index].AMValid = false;
        list[index].auction = event.currentTarget.value;
        setCurrentIndex(index);
        setInputList(list);
        setCurrentAuctionMarketContract(event.currentTarget.value);
     
    }
    
    //function to update the auction/market object in the object list
    const handleUpdateAuctionMarketInfo = (index: number, obj: { adoType: any; }) => {
              console.log('auction object', obj);
        setInputList(prevInputList =>{
            const updatedInputList = [...prevInputList];
            const updatedObject = {...updatedInputList[index], 
                                    AMValid: true,
                                    AMType: obj.adoType  }
            updatedInputList[index] = updatedObject;
            return updatedInputList;
        });
        
    }

    // set Site Title function
    const handleSetTitle = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setSiteTitle(event.currentTarget.value);
    }

    //set Chain ID function
    const handleChainId = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setChainId(event.currentTarget.value);
    }

    //set Coin Denomination function
    const handleCoinDenom = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setCoinDenom(event.currentTarget.value);
    }

    //set featured token function
    const handleSetFeaturedToken = (event: { currentTarget: { value: string; }; }) =>{
        setFeaturedToken(event.currentTarget.value);
    }


    // handle the featured checkbox functionality
    const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        setInputList(prevInputList => {
            const newInputList = prevInputList.map((input, i) => {
              if (i === index) {
                input.featured = event.target.checked;
              } else {
                input.featured = false;
              }
              return input;
            });
            setFormErrorMessage(newInputList.some(input => input.featured) ? "" : "Please select at least one featured contract");
            return newInputList;
          });
    
    }

    //add another cw721 object row to our form
    const handleAddClick = () => {
        setInputList([...inputList, { id: "", name:"", cw721: "", auction: "", featured: false, marketplaceAddress: "", crowdfundAddress: "", valid: false, AMValid: false, stubLink: "" }]);
    };

    //Remove cw721 object row from form
    const handleRemoveClick = (index: number) => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };
    
    // get the current configuration from form data
    const getCurrentConfig = () => {
        const featuredIndex = inputList.findIndex(obj => obj.featured);
        const featId = inputList[featuredIndex].id ? inputList[featuredIndex].id : '';
        const obj = {
            "appAddress": appAddress,
            "name":siteTitle,
            "chainId" : chainId,
            "coinDenom" : coinDenom,
            "collections":

                inputList.filter((collection) => collection.valid === true)
                .map((input)=>{
                    return{
                        "id": input.id,
                        "cw721" : input.cw721,
                        "auction" : input.auction,
                        "marketplaceAddress": input.marketplaceAddress,
                        "crowdfundAddress": input.crowdfundAddress,
                        "stubLink" : input.stubLink,
                        "name": input.name
                    }

                }),
            "featured" : {
                "collectionId" : featId,
                "tokenId": featuredToken
            }
        };
        
        return obj;
    }

    
    //Handle Submit of Form
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (formErrorMessage != "") {
            return;
        }
        const currentConfig = getCurrentConfig();
        updateConfig(currentConfig);
        setShowConfigModal(true);
       
    }
    
    // copy to clipboard icon function
    const handleCopy = () => {
        navigator.clipboard.writeText(JSON.stringify(getCurrentConfig(), null, 2));
    };


    //Handle closing the json text modal.
    const handleClose = () => {
        setShowConfigModal(false);
    };

    return(
    <>
    <Box w="100%">
    <Box w='70%' mx={"auto"} >
        <Heading size="md" mb="6" fontWeight="bold" textAlign={"center"}>
            Configuration Settings:
        </Heading>
        <Box textAlign="center">
            <form onSubmit={handleSubmit}>
                <Box borderWidth="1px" borderRadius="md" p="4">
                    <FormLabel>App Address: {appLoading ? "looking up app contract" :""}
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
                </Box>
                {inputList.map((input, index)=>(
                        <div key={index}  style={{ marginTop: '16px' }}>
                            <Box borderWidth="1px" borderRadius="md" p="4">
                                <FormLabel>Collection Address : {cw721Loading && (currentIndex===index) ? 'checking contract...' : ''} {input.valid ? ( input.name ? input.name : input.id) : '' }
                                <IconButton  size="xs" ml="10" onClick={() => handleRemoveClick(index)} icon={<Trash2 />} aria-label={""} />
                                    <Input type="text" value={input.cw721} size="sm" onChange={(e)=>checkCW721Address(e, index)}/>
                                </FormLabel>
                                
                                {input.valid ? (
                                    
                                    <div>
                                        <FormLabel>(Optional) Collection Auction/Market/Crowfund : {auctionLoading && (currentIndex===index) ? 'checking contract...' : ''}
                                            <Input type="text" value={input.auction ? input.auction : input.marketplaceAddress ? input.marketplaceAddress : input.crowdfundAddress ? input.crowdfundAddress : "" } size="sm" onChange={(e)=>checkAuctionAddress(e, index)}/>
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
                {formErrorMessage && <Box mt="2" color="red">{formErrorMessage}</Box>}
                <Box textAlign="right" mt="4">
                    <Button type="button" onClick={handleAddClick}>
                        Add Another Contract
                    </Button> 
                    <Button
                        // isLoading={loading}
                        loadingText='Submitting'
                        colorScheme='teal'
                        variant='outline' 
                        type="submit"                          
                    >
                        Submit
                    </Button>
                </Box>
            </form>
        </Box>
    </Box>

    {showConfigModal && (
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
                        rows={10}
                        value={JSON.stringify(getCurrentConfig(), null, 2)}
                        readOnly
                        
                        resize="none"
                        onFocus={(e) => {
                            e.target.rows = 20;
                        }}
                        onBlur={(e) => {
                            e.target.rows = 8;
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
    </>
    );
};

export default Config;
