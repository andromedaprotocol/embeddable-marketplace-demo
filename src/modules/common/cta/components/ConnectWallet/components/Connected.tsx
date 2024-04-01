import useQueryChain from "@/lib/graphql/hooks/chain/useChainConfig";
import {
  ChevronDownIcon,
  CopyIcon,
  ExternalLinkIcon,
  LogOutIcon,
  ProfileIcon,
} from "@/modules/common/icons";
import { CopyButton } from "@/modules/common/ui";
import { truncate } from "@/utils/text";
import { disconnectAndromedaClient, useAndromedaStore } from "@/zustand/andromeda";
import {
  Badge,
  Button,
  HStack,
  Image,
  Input,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import React, { FC } from "react";

interface ConnectedProps { }
const Connected: FC<ConnectedProps> = (props) => {
  const { } = props;
  const { accounts, chainId } = useAndromedaStore();
  const account = accounts[0];
  const { data: config } = useQueryChain(chainId);

  return (
    <Popover placement="bottom-end">
      {({ isOpen }) => (
        <>
          <PopoverTrigger>
            <Button
              variant="outline"
              size="lg"
              borderColor={isOpen ? "primary.600" : "gray.300"}
            >
              <HStack mr='2'>
                <Image src={config?.iconUrls?.sm ?? ""} w="5" />
                <Text>{truncate(account?.address ?? "")}</Text>
                <Badge
                  colorScheme={
                    config?.chainType === "mainnet" ? "green" : "purple"
                  }
                  fontSize={8}
                  pt="1"
                  rounded="full"
                >
                  {config?.chainType}
                </Badge>
              </HStack>
              <ChevronDownIcon boxSize={4} />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverBody>
              <HStack mb={3} justifyContent="start">
                <Image src={config?.iconUrls?.sm ?? ""} w="5" />
                <Text fontWeight={600} color="gray.700">
                  {config?.chainName ?? config?.chainId}
                </Text>
                <Badge
                  colorScheme={
                    config?.chainType === "mainnet" ? "green" : "purple"
                  }
                  fontSize={8}
                  pt="1"
                  rounded="full"
                >
                  {config?.chainType}
                </Badge>
              </HStack>
              <Input
                value={account?.address ?? ""}
                mb={2}
                p={2}
                color="gray.700"
                fontSize="sm"
                readOnly
              />
              <HStack mb={2}>
                <CopyButton
                  leftIcon={<CopyIcon boxSize={4} />}
                  variant="outline"
                  fontWeight={500}
                  color="gray.700"
                  text={account?.address ?? ""}
                  w="full"
                >
                  Copy address
                </CopyButton>
                <Button
                  as="a"
                  href={config?.blockExplorerAddressPages[0]?.replaceAll(
                    "${address}",
                    account?.address ?? ""
                  )}
                  target="_blank"
                  leftIcon={<ExternalLinkIcon boxSize={4} />}
                  variant="outline"
                  fontWeight={500}
                  color="gray.700"
                  w="full"
                >
                  Explorer
                </Button>
              </HStack>
              {/* <Box
                border="1px solid"
                borderColor="gray.300"
                borderRadius="md"
                p={2}
                mb={2}
              >
                <VStack spacing={2} align="flex-start">
                  {TOKENS.map(({ logo, name }) => {
                    return <HoldingItem key={name} logo={logo} name={name} />;
                  })}
                </VStack>
              </Box> */}
              <Button
                leftIcon={<LogOutIcon boxSize={4} />}
                variant="outline"
                onClick={disconnectAndromedaClient}
                fontWeight={500}
                color="gray.700"
                w="full"
              >
                Disconnect
              </Button>
            </PopoverBody>
          </PopoverContent>
        </>
      )}
    </Popover>
  );
};
export default Connected;
