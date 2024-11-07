import { Container, Text, HStack, Heading, Box, Button, ModalBody, ModalCloseButton, Modal, ModalContent, 
    ModalFooter, ModalHeader, ModalOverlay, Input, useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const LoginPage = () => {
    const toast = useToast();
    const [isLoginOpen, setIsLoginOpen] = useState(false); // State for login modal
    const [isRegisterOpen, setIsRegisterOpen] = useState(false); // State for register modal
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); // for confirm password in register form

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
            localStorage.setItem("token", response.data.token);
            toast({
                title: "Login successful",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            setIsLoginOpen(false);
        } catch (error) {
            toast({
                title: "Login failed",
                description: error.response?.data?.message || "Error logging in",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        
        // Basic validation to ensure password and confirm password match
        if (password !== confirmPassword) {
            toast({
                title: "Password mismatch",
                description: "Passwords do not match.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/auth/register", { name, email, password });
            toast({
                title: "Registration successful",
                description: "You can now login with your credentials.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            setIsRegisterOpen(false); // Close the register modal after successful registration
        } catch (error) {
            toast({
                title: "Registration failed",
                description: error.response?.data?.message || "Error registering user",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Container>
            <Text
                fontSize={{ base: "22", sm: "28" }}
                fontWeight={"bold"}
                textTransform={"uppercase"}
                textAlign={"center"}
                bgGradient={"linear(to-r, cyan.400, blue.500)"}
                bgClip={"text"}
            >
                <Link to={"/"}>Login Page</Link>
            </Text>
            <Box p={4}>
                <HStack justifyContent="space-between">
                    <Heading as="h3" size="md">
                        name
                    </Heading>
                    <Text fontWeight="bold" fontSize="xl">
                        $money
                    </Text>
                </HStack>

                {/* Login Modal */}
                <Modal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Login</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Input
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                placeholder="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" onClick={handleLogin}>
                                Login
                            </Button>
                            <Button variant="ghost" onClick={() => setIsLoginOpen(false)}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                {/* Register Modal */}
                <Modal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Register</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Input
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Input
                                placeholder="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                placeholder="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Input
                                placeholder="Confirm Password"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="green" onClick={handleRegister}>
                                Register
                            </Button>
                            <Button variant="ghost" onClick={() => setIsRegisterOpen(false)}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                <HStack spacing={2} justifyContent="center">
                    <Button colorScheme="blue" onClick={() => setIsLoginOpen(true)}>
                        Login
                    </Button>
                    <Button colorScheme="red" onClick={() => setIsRegisterOpen(true)}>
                        Register
                    </Button>
                </HStack>
            </Box>
        </Container>
    );
};

export default LoginPage;
