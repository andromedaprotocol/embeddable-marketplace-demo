import { IBaseCollection, ICrowdfundCollection } from "@/lib/app/types";
import { useGetCrowdfund } from "@/lib/graphql/hooks/crowdfund/useGetCrowdfund";
import { useGetCw721 } from "@/lib/graphql/hooks/cw721";
import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
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
        <Grid templateColumns="repeat(2,1fr)" gap="4" py="2" data-testid="header">
            <GridItem colSpan={1} data-testid="header-left">
                <Flex direction="column" gap="2" align="start" maxW="md">
                    <Text fontSize="2xl" fontWeight="bold" data-testid="collection-name">
                        {cw721?.contractInfo?.name}
                    </Text>
                    <Text textStyle="light" fontSize="sm" data-testid="collection-minter">
                        Minter - <b>{cw721?.minter}</b>
                    </Text>
                    <Text fontWeight="light" fontSize="sm" mt="2" data-testid="collection-description">
                        {collection.description}
                    </Text>
                </Flex>
            </GridItem>
            <GridItem colSpan={1} data-testid="header-right">
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
        <Box data-testid="stat">
            <Text fontSize="xs" textStyle="light" data-testid="stat-label">
                {label}
            </Text>
            <Text fontWeight="medium" fontSize="md" data-testid="stat-value">
                {value}
            </Text>
        </Box>
    );
};

export default Header;
