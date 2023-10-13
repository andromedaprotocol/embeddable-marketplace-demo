import { Cw721NftinfoQuery } from "@/lib/graphql/hooks/cw721/useGetToken";
import { ITokenUri } from "@/zustand/tokenUri";
import { Box, Divider, Flex, Icon, Link, Text } from "@chakra-ui/react";
import React, { FC } from "react";


interface PropertiesProps {
    tokenUri: ITokenUri;
}

const Properties: FC<PropertiesProps> = (props) => {
    const { tokenUri } = props;
    return (
        <Box border="1px" borderColor="gray.300" borderRadius="15" p="10">
            {tokenUri?.attributes?.map((attr) => (
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
    );
};

export default Properties;



