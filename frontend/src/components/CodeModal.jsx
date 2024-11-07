import { useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Code,
} from '@chakra-ui/react';

function CodeModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>View Code</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Source Code</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Code children={<h1>Hello World!</h1>} /> 
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CodeModal;