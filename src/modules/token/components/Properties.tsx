import { NFTInfo } from "@andromedaprotocol/andromeda.js";
import { Box, Divider, Flex, Icon, Link, Text } from "@chakra-ui/react";
import { Share } from "lucide-react";
import React, { FC } from "react";


interface PropertiesProps {
    token:NFTInfo;

}

const Properties: FC<PropertiesProps> = (props) => {
    const token = props.token;
    
    const attributes = Object.entries(token.extension?.attributes ?? {});
    return (
        <>
           <Box border="1px" borderColor="gray.300" borderRadius="15" p="10">
              
              {token.extension?.attributes?.map((attr) => (
                <Box key={attr.trait_type} mt="4" >
                    <Flex justifyContent="space-between">
                        <Text fontWeight="bold" fontSize="sm">
                            {attr.trait_type}
                        </Text>
                   
                        <Text fontWeight="light" fontSize="sm">
                            {attr.value}
                        </Text>
                    </Flex>
                <Divider orientation="horizontal" mt="7" />
                </Box>
            ))}
              
            </Box>
       
        </>
      );
    };
    
    export default Properties;
    
    
    
    