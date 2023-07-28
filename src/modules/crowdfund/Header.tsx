import { IBaseCollection, ICrowdfundCollection } from "@/lib/app/types";
import { useGetCrowdfund } from "@/lib/graphql/hooks/crowdfund/useGetCrowdfund";
import { useGetCw721 } from "@/lib/graphql/hooks/cw721";
import { Box, Flex, Grid, GridItem, HStack, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import CrowdfundGroupInfo from "./CrowdfundGroupInfo";

interface HeaderProps {
    collection: ICrowdfundCollection;
}
const Header: FC<HeaderProps> = (props) => {
    const { collection } = props;
    const { data: crowdfund } = useGetCrowdfund(collection.crowdfund);
    const { data: cw721 } = useGetCw721(collection.cw721)

    return (
        <Grid templateColumns="repeat(2,1fr)" gap="4" py="2">
            <GridItem colSpan={1}>
                <Flex direction="column" gap="2" align="start" maxW="md">
                    <Text fontSize="2xl" fontWeight="bold">
                        {cw721?.contractInfo?.name}
                    </Text>
                    <Text textStyle="light" fontSize="sm">
                        Minter - <b>{cw721?.minter}</b>
                    </Text>
                    <Text fontWeight="light" fontSize="sm" mt="2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed faucibus, orci sit amet eleifend facilisis,
                        arcu eros gravida massa, id pharetra dui nisi a leo. Integer a tellus elit. Proin quis venenatis magna... <b>Read more</b>
                    </Text>
                </Flex>
            </GridItem>
            <GridItem colSpan={1}>
                <CrowdfundGroupInfo
                    collection={collection}
                    collectionName={collection.name}
                />
            </GridItem>
        </Grid>
    );
};

interface StatProps {
    label: string;
    value: string;
}
const Stat: FC<StatProps> = (props) => {
    const { label, value } = props;

    return (
        <Box>
            <Text fontSize="xs" textStyle="light">
                {label}
            </Text>
            <Text fontWeight="medium" fontSize="md">
                {value}
            </Text>
        </Box>
    );
};


export default Header;
