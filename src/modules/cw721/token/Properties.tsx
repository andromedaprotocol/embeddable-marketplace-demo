import { INftMetadata } from "@andromedaprotocol/gql";
import { Box, Divider, Flex, Icon, Link, Text } from "@chakra-ui/react";
import React, { FC } from "react";


interface PropertiesProps {
    metadata: INftMetadata;
}

const Properties: FC<PropertiesProps> = (props) => {
    const { metadata } = props;
    return (
        <Box border="1px" borderColor="gray.300" borderRadius="15" p="10">
            {metadata?.attributes?.map((attr, idx) => (
                <Box key={idx} mt="4" >
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
    );
};

export default Properties;



