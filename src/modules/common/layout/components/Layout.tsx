import { Box } from "@chakra-ui/react";
import React, { FC, ReactNode } from "react";

interface LayoutProps {
  children?: ReactNode;
}
const Layout: FC<LayoutProps> = (props) => {
  const { children } = props;

  return (
    <Box>
      <Box borderBottom="1px" borderColor="gray.300" py="8"></Box>
      <Box px="24" py="6">
        {children}
      </Box>
    </Box>
  );
};
export default Layout;
