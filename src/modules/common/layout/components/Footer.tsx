import { Box, Flex, Text, List, ListItem } from "@chakra-ui/react";
import React, { FC } from "react";
import useApp from "@/lib/app/hooks/useApp";
import Link from "next/link";
import { LINKS } from "@/utils/links";


interface FooterProps {}
const Footer: FC<FooterProps> = (props) => {
  const {} = props;
  const { config } = useApp();

  return (
      <Flex
       
        backgroundColor="#101828"
        direction="column"
        textColor="#FFFFFF"
        >
        <Flex 
         direction="row"
         alignItems="stretch"
         gap="100"
         pl={50}
         py="10"
         flexWrap="wrap"
        
        >
        <Link href={LINKS.home()} passHref>
          <Text as="a" fontSize="lg" fontWeight="bold" px={100}>
            {config.name}
          </Text>
        </Link>
        <List spacing={3} fontSize="sm">
            <ListItem fontWeight="bold">App</ListItem>
            <ListItem>Collections</ListItem>
        </List>
        <List spacing={3} fontSize="sm">
            <ListItem fontWeight="bold">Company</ListItem>
            <ListItem>Help Center</ListItem>
            <ListItem>Subscribe</ListItem>
        </List>
        <List spacing={3} fontSize="sm">
            <ListItem fontWeight="bold">Connect</ListItem>
            <ListItem>Twitter</ListItem>
            <ListItem>Instagram</ListItem>
        </List>
        <List spacing={3} fontSize="sm">
            <ListItem fontWeight="bold">Legal</ListItem>
            <ListItem>Privacy Policy</ListItem>
            <ListItem>Terms of Service</ListItem>
        </List>
        </Flex>
        <Text as="a" fontSize="sm" mx="auto" pb={7}>
            &copy;2022 XYZ
        </Text>
      </Flex>
  
  );
};
export default Footer;
