import { MinusIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Heading,
    HStack,
    IconButton,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useColorModeValue,
    useDisclosure,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { useState } from "react";
import axios from "axios";

const UserProductCard = ({ product }) => {
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    const { deleteProduct, updateProduct } = useProductStore();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleDeleteProduct = async (pid) => {
        const { success, message } = await deleteProduct(pid);
        toast({
            title: success ? "Success" : "Error",
            description: message,
            status: success ? "success" : "error",
            duration: 3000,
            isClosable: true,
        });
    };

    const handleUpdateProduct = async (pid, updatedProduct) => {
        const { success, message } = await updateProduct(pid, updatedProduct);
        onClose();
        toast({
            title: success ? "Success" : "Error",
            description: success ? "Product updated successfully" : message,
            status: success ? "success" : "error",
            duration: 3000,
            isClosable: true,
        });
    };

    const handlePreviewOpen = () => {
        setIsPreviewOpen(true);
    };

    const handlePreviewClose = () => {
        setIsPreviewOpen(false);
    };

    return (
        <Box
            shadow='lg'
            rounded='lg'
            overflow='hidden'
            transition='all 0.3s'
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
            bg={bg}
        >
            <Image src={product.image} alt={product.name} boxSize="200px" mx="auto" />

            <Box p={4}>
                <HStack justifyContent="space-between">
                    <Heading as='h3' size='md'>
                        {product.name}
                    </Heading>
                    <Text fontWeight='bold' fontSize='xl' color={textColor}>
                        ${product.price}
                    </Text>
                </HStack>
                <HStack spacing={2} justifyContent="center">
                    <IconButton
                        icon={<EditIcon />}
                        onClick={onOpen}
                        colorScheme='blue'
                    />
                    <IconButton
                        icon={<ViewIcon />}
                        onClick={handlePreviewOpen}
                        colorScheme='teal'
                    />
                    <IconButton
                        icon={<MinusIcon />}
                        onClick={() => handleDeleteProduct(product._id)}
                        colorScheme='red'
                    />
                </HStack>
            </Box>

            {/* Preview Modal */}
            <Modal isOpen={isPreviewOpen} onClose={handlePreviewClose} size={"6xl"}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign="center" bg="gray.200" p={2} rounded="md" fontWeight="bold" color="black">
                        {product.name}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Image src={product.image} alt={product.name} boxSize="50%" borderRadius="md" />
                            <Heading size='2xl'>{product.name}</Heading>
                            <Text fontSize='2xl'>Price: ${product.price}</Text>
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='ghost' onClick={handlePreviewClose} bg="gray.200" color={"black"}>
                            Close Preview
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Edit Modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>View Code</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Text fontWeight="bold">Product Name</Text>
                            <Text>{updatedProduct.name}</Text>

                            <Text fontWeight="bold">Price:</Text>
                            <Text>${updatedProduct.price}</Text>

                            <Text fontWeight="bold">Image URL:</Text>
                            <Text>{updatedProduct.image}</Text>
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => handleUpdateProduct(product._id, updatedProduct)}>
                            Update
                        </Button>
                        <Button variant='ghost' onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default UserProductCard;
