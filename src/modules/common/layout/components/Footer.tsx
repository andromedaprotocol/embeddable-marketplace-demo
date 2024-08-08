import { Flex, Text, Link } from "@chakra-ui/react";
import React, { FC } from "react";
import useApp from "@/lib/app/hooks/useApp";

interface FooterProps { }

const Footer: FC<FooterProps> = (props) => {
  const { } = props;
  const { config } = useApp();

  return (
    <Flex
      backgroundColor="#101828"
      direction="column"
      textColor="white"
      align='center'
      p='4'
      data-testid="footer"
    >
      <Text data-testid="footer-text">
        More Information about <b>ANDROMEDA</b> can be found <Link href='https://www.andromedaprotocol.io/' target="_blank" data-testid="footer-link">here</Link>
      </Text>
    </Flex>
  );
};

export default Footer;
