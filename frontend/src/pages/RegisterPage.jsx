// frontend/pages/RegisterPage.js
import { useState } from 'react';
import axios from 'axios';
import { Container, Box, Input, Button, Text, useToast } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:5000/api/auth/register", {
                name,
                email,
                password
            });

            toast({
                title: "Registration Successful",
                description: "You can now login with your credentials.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            
            // Optionally redirect to login page after successful registration
            // You can use useNavigate from react-router-dom for this.
            // navigate("/login");

            // Clear form fields
            setName('');
            setEmail('');
            setPassword('');
        } catch (error) {
            toast({
                title: "Registration Failed",
                description: error.response?.data?.message || "Error registering user.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxW="md" centerContent>
            <Box w="100%" p={4} borderRadius="md" boxShadow="lg">
                <Text fontSize="2xl" fontWeight="bold" mb={4}>Register</Text>

                <form onSubmit={handleRegister}>
                    <Input
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        mb={4}
                        isRequired
                    />
                    <Input
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        mb={4}
                        isRequired
                    />
                    <Input
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        mb={4}
                        isRequired
                    />

                    <Button colorScheme="blue" isLoading={loading} type="submit" width="full" mb={4}>
                        Register
                    </Button>

                    <Text textAlign="center">
                        Already have an account? <Link to="/login">Login here</Link>
                    </Text>
                </form>
            </Box>
        </Container>
    );
};

export default RegisterPage;
