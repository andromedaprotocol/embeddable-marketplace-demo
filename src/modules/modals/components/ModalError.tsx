import { CopyButton } from "@/modules/common/ui";
import { truncate } from "@/utils/text";
import { Box, Button, Center, Text, useToast } from "@chakra-ui/react";
import { AlertCircle, Copy } from "lucide-react";
import { FC, memo, ReactNode } from "react";
import { useGlobalModalContext } from "../hooks";

interface ModalErrorProps {
  children: ReactNode;
}
const ModalError: FC<ModalErrorProps> = memo(function ModalError(props) {
  const { children } = props;
  const { error, setError, close } = useGlobalModalContext();

  const onClose = () => {
    close();
    setError();
  };

  if (!error) return <>{children}</>;
  console.error(error);
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
        fontSize: "14px",
      }}
    >
      <Center
        sx={{
          width: "80px",
          height: "80px",
          padding: "23px",
          background: "#FEE4E2",
          borderRadius: "50%",
          color: "#D92D20",
        }}
      >
        <AlertCircle style={{ width: "32px", height: "32px" }} />
      </Center>

      <Text
        mt="40px"
        sx={{ textAlign: "center", fontWeight: "bold", color: "#B42318" }}
      >
        Something went wrong!
      </Text>
      <Text mt="10px" sx={{ fontWeight: 400, color: "#D92D20" }}>
        {error.message.length > 100
          ? truncate(error.message, [25, 50])
          : error.message}
      </Text>
      <Center>
        {error.message.length > 100 && (
          <CopyButton
            variant="solid"
            sx={{
              fontSize: "16px",
              padding: "10px 16px",
              "&:hover": { bg: "#7F56D9" },
              bg: "#7F56D9",
            }}
            text={error.message}
            mt="40px"
            mr="10px"
          >
            <Copy />
          </CopyButton>
        )}
        <Button
          variant="outline"
          sx={{ fontSize: "16px", padding: "10px 32px" }}
          onClick={onClose}
          mt="40px"
        >
          Close
        </Button>
      </Center>
    </Box>
  );
});

export default ModalError;
