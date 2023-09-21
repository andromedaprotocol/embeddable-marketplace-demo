import React, { FC, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  GridItem,
  SimpleGrid,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { addDatabaseCacheConfig, useDatabaseStore } from "@/zustand/database";
import Link from "next/link";
import { LINKS } from "@/utils/links";

interface CollectionRowProps {
  appId: string;
}
const CollectionRow: FC<CollectionRowProps> = (props) => {
  const { appId } = props;
  const config = useDatabaseStore(state => state.cache);
  useEffect(() => {
    addDatabaseCacheConfig(appId);
  }, []);
  console.log(config);
  if (!config[appId]) return null;

  return (
    <Box p="12" rounded="2xl" bg="gray.100">
      <SimpleGrid columns={1} spacing="4">
        <GridItem>
          <Flex direction="column" gap="4" alignItems="start">
            <Text fontSize="xl" fontWeight="bold">
              {config[appId]?.name}
            </Text>
            {/* Replacing text with &nbsp; (space) to maintain height structures for displays */}
            <Box>
              <Text fontSize="xs" textStyle="light">
                &nbsp;
              </Text>
              <Text fontWeight="bold" fontSize="sm">
                &nbsp;
              </Text>
            </Box>
            <Flex gap="1" align="center">
              {/* <Flame color="orange" width={14} /> */}
              <Text>&nbsp;</Text>
              <Text fontSize="xs" fontWeight="bold">
                &nbsp;
              </Text>
            </Flex>
            <Button as={Link} href={LINKS.home(appId)} w="full" mb="10">
              Explore Embeddable
            </Button>
          </Flex>
        </GridItem>
      </SimpleGrid>
    </Box >
  )
};
export default CollectionRow;
