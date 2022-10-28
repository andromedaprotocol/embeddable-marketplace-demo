import { Box, Divider } from "@chakra-ui/react";
import React, { FC, ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children?: ReactNode;
}
const Layout: FC<LayoutProps> = (props) => {
  const { children } = props;

  return (
    <Box minH="100vh">
      <Box>
        <Navbar />
      </Box>
      <Divider />
      <Box px="24" py="16">
        {children}
      </Box>
    </Box>
  );
};
export default Layout;
