import { useAllChainConfig } from "@/lib/graphql/hooks/chain";
import { useWallet } from "@/lib/wallet";
import {
  ChevronDownIcon,
  CopyIcon,
  ExternalLinkIcon,
  LogOutIcon,
  ProfileIcon,
} from "@/modules/common/icons";
import { CopyButton } from "@/modules/common/ui";
import { truncate } from "@/utils/text";
import {
  Button,
  HStack,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import React, { FC } from "react";

interface ConnectedProps {}
const Connected: FC<ConnectedProps> = (props) => {
  const {} = props;
  const { data: configs } = useAllChainConfig();
  const { disconnect, config, setChainId, account } = useWallet();

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
              <HStack mr={8}>
                <ProfileIcon boxSize={8} />
                <Text>{truncate(account?.address ?? "")}</Text>
              </HStack>
              <ChevronDownIcon boxSize={4} />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverBody>
              <HStack mb={3} justifyContent="space-between">
                {/* <Icon
                  boxSize={9}
                  p={1}
                  borderRadius="full"
                  border="1px solid"
                  borderColor="gray.300"
                /> */}
                <Text fontWeight={600} color="gray.700">
                  {config?.chainId}
                </Text>
                <Menu>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    Switch
                  </MenuButton>
                  <MenuList>
                    {configs?.map((config) => (
                      <MenuItem
                        onClick={() => {
                          setChainId(config.chainId);
                        }}
                        key={config.chainId}
                      >
                        {config.chainId}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
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
                onClick={disconnect}
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
