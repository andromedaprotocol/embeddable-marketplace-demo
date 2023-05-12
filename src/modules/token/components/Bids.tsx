import { DiscordIcon, DownloadIcon, ShareIcon, TwitterIcon, ExternalLinkIcon, FolderOpenIcon, ProfileIcon } from "@/modules/common/icons";
import { NFTInfo } from "@andromedaprotocol/andromeda.js";
import { Box, Divider, Flex, Icon, Link, Text, Image, Modal, Button, Heading, Textarea } from "@chakra-ui/react";
import { Share } from "lucide-react";
import React, { FC, useState } from "react";
import useApp from "@/lib/app/hooks/useApp";
import { useChainConfig } from "@/lib/graphql/hooks/chain";
import { ITokenUriObject } from "@/lib/graphql/hooks/collection/useGetTokenUriObject";
import { useGetTokenAuctionStateFromColId } from "@/lib/graphql/hooks/auction";
import { useGetBids } from "@/lib/graphql/hooks/auction/useGetBids";


interface BidsProps {
   token:NFTInfo;
   cw721:{
    name?: string;
    symbol?: string;
    address?: string;
    id?: string;
   };
   tokenId: string;
   tokenUriObject: ITokenUriObject;
   adoType: string;
   adoAddress: string;
}
const Bids: FC<BidsProps> = (props) => {
  const  token  = props.token;
  const cw721 = props.cw721;
  const domain = window.location.hostname;
  const tokenId = props.tokenId;
  const tokenUriObject = props.tokenUriObject;
  const adoType = props.adoType;
  const adoAddress = props.adoAddress;
  const encodedName = encodeURIComponent(token.extension.name);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [metadata, setMetadata] = useState(null);
  
  const {
    config,
  } = useApp();
  const { data: chainConfig } = useChainConfig(config.chainId ?? "");

  const { data: auctionState } = useGetTokenAuctionStateFromColId(
    cw721.id || "" , 
    tokenId
  );
  
  const {data:bids} = useGetBids(
    adoAddress, Number(auctionState?.auction_id)
  )
  
  
  function truncateAddress(inputString: string) {
    
    const shortAddress = `${inputString.substring(0, 8)}...${inputString.slice(-4)}`;
    return shortAddress;
    
  }
  return (
        <>
            <Box border="1px" borderColor="gray.300" borderRadius="15" p="10">
                    
              {bids && [...bids].reverse().map((bid, index) => (
                <Box key={index} mt="4" >
                    <Flex justifyContent="space-between">
                    <Link href={chainConfig?.blockExplorerAddressPages[0].replace('${address}', '') + bid.bidder} target="_blank">
                       <ProfileIcon boxSize={"2em"} mr="15px"></ProfileIcon>
                         {truncateAddress(bid.bidder)}
                    </Link>
                   
                    <Text fontWeight="light" fontSize="sm">{bid.amount}<span> - {auctionState?.coin_denom?.toUpperCase()}</span></Text>
                        
                    </Flex>
                <Divider orientation="horizontal" mt="7" />
                </Box>
            ))}
              
            </Box>
      </>
  );
};
export default Bids;
