import { Box, Spinner, Text } from "@chakra-ui/react";
import { FC, memo, ReactNode } from "react";

interface ModalLoadingProps {
  title: string;
  children?: ReactNode;
}

const ModalLoading: FC<ModalLoadingProps> = memo(function ModalLoading({
  title,
  children,
}) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "20px",
      }}
    >
      <Spinner label="" sx={{ width: "100px", height: "100px" }} />
      <Text mt="60px" sx={{ textAlign: "center", fontWeight: "bold" }}>
        {title}
      </Text>
      {children}
    </Box>
  );
});

export default ModalLoading;
