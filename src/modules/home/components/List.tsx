import { LINKS } from "@/utils/links";
import { useAndromedaStore } from "@/zustand/andromeda";
import { SearchIcon } from "@chakra-ui/icons";
import { Box, Flex, Grid, GridItem, Heading, HStack, Input, InputGroup, InputLeftElement, Select, SimpleGrid, Skeleton, Stack, VStack } from "@chakra-ui/react";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react"

interface Props {
    apps: string[]
    chainId: string;
}

const EmbeddableList: FC<Props> = (props) => {
    const { apps, chainId } = props;
    const [searchInput, setSearchInput] = useState('');

    const [sortType, setSortType] = useState('');
    const [keyList, setkeyList] = useState(apps);

    useEffect(() => {
        if (searchInput) {
            const list = apps?.filter((item) => item.includes(searchInput)) ?? [];
            setkeyList(list);
        } else {
            setkeyList(apps ?? []);
        }
    }, [searchInput]);

    useEffect(() => {
        setkeyList(apps ?? []);
    }, [apps]);

    return (
        <Box py='48px'>
            <VStack spacing={4} w='full' alignItems={'flex-start'}>
                <Flex w='full' gap='24px' direction={'column'}>
                    <Grid mb='24px' gap='8px' gridTemplateColumns={'86% 14%'}>
                        <Box h='40px'>
                            <InputGroup borderRadius={'8px'}>
                                <InputLeftElement pointerEvents='none'>
                                    <SearchIcon color='gray.300' />
                                </InputLeftElement>
                                <Input type='tel' placeholder='Search embeddables'
                                    onChange={(event) => setSearchInput(event.target?.value.trim())}
                                />
                            </InputGroup>
                        </Box>
                        <Select size='sm' h='40px' borderRadius='8px' placeholder="Sort by"
                            onChange={(event) => { setSortType(event.target.value) }}>
                            <option value='Asc'>Asc</option>
                            <option value='Desc'>Desc</option>
                        </Select>
                    </Grid>
                    <SimpleGrid columns={2} spacing={6}>
                        {keyList.map(key => (
                            <GridItem as={Link} href={LINKS.home(key, chainId)} key={key} px='4' py='3' rounded="xl" bg='gray.100' textTransform="uppercase" fontWeight='bold'>
                                {key}
                            </GridItem>
                        ))}
                    </SimpleGrid>
                </Flex>
            </VStack>
        </Box>
    )
}

export default EmbeddableList
