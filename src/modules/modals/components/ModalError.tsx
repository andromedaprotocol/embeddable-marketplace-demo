import { InfoIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Flex, Text, Textarea } from "@chakra-ui/react";
import { AlertCircle, Copy } from "lucide-react";
import { FC, memo, PropsWithChildren } from "react";
import { useGlobalModalContext } from "../hooks";
import { CopyButton } from "@/modules/common/ui";

const ModalError: FC<PropsWithChildren> = memo(function ModalError({ children }) {
  const { error, setError, close } = useGlobalModalContext();

  const onReport = () => {
    close();
    // setError();
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
          padding: "16px",
          background: "error.500",
          borderRadius: "xl",
          color: "white",
        }}
      >
        <AlertCircle width='40px' height='40px' />
      </Center>

      <Text
        mt="20px"
        fontSize={'20px'}
        sx={{ textAlign: "center", fontWeight: "bold" }}
      >
        {/* {Return the error title by extracting it from the end of the error message} */}
        {error?.message?.split(':')?.pop()?.trim()?.toUpperCase() ?? ''}
      </Text>
      {/* <Text mt="20px" textAlign='center' sx={{ fontWeight: 400, color: "dark.500" }}>
        {error.message.length > 100
          ? truncate(error.message, [25, 50])
          : error.message}
      </Text> */}
      <Textarea
        value={error.message}
        fontSize={'16px'}
        color='dark.500'
        backgroundColor={'dark.100'}
        resize='none'
        mt="20px"
        pb='10px'
      />
      <Flex
        bgColor={'rgba(255, 160, 70, 0.12)'}
        p={'12px 20px'}
        borderRadius='6px'
        mt='20px'
        gap={'10px'}
      >
        <Box>
          <InfoIcon boxSize={3.5} color='rgba(255, 183, 130, 1)' />
        </Box>
        <Text fontSize={'16px'}>
          We apologize for any unclear errors you may encounter. At present there are problems with the foundational chain-level systems that Andromeda runs on top of to appropriately return errors.
          This is expected to be resolved in an upcoming release of CosmWasm 2.0. You can view <u><a href="https://www.youtube.com/watch?v=VNwoLZZSoYs&t=8119s" target="_blank" rel="noopener noreferrer"> here</a></u> for more details.
        </Text>
      </Flex>
      <Flex w="full" justifyContent={'end'}>
        <Button
          variant="outline"
          sx={{
            fontSize: "16px",
            padding: "10px 32px"
          }}
          onClick={onReport}
          mt="40px"
          mr="10px"
          isDisabled={true}
        >
          Report
        </Button>
        {error.message && (
          <CopyButton
            variant="solid"
            sx={{
              fontSize: "16px",
              padding: "10px 16px",
            }}
            text={error.message}
            mt="40px"
            leftIcon={<Copy />}
            fontWeight='bold'
            colorScheme={'primary'}
          >
            Copy
          </CopyButton>
        )}
      </Flex>
    </Box>
  );
});

export default ModalError;
