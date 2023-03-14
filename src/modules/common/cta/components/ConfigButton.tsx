import { useAppUtils } from "@/lib/app/hooks";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure
  } from '@chakra-ui/react'

import {
  Button,
  IconButton
} from "@chakra-ui/react";
import { Settings } from "lucide-react";
import React, { FC, useMemo } from "react";
import { useConfigModal } from "@/modules/modals/hooks";

interface ConfigButtonProps {}
const ConfigButton: FC<ConfigButtonProps> = (props) => {
  const {} = props;
  const open = useConfigModal();
  const { getCollections } = useAppUtils();
 // const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
        <IconButton onClick={open} icon={<Settings />} aria-label={""}>
        </IconButton>


       
       
    </>
  );
};


export default ConfigButton;
