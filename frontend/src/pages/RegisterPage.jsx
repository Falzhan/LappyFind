import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const toast = useToast();

  const handleRegister = async () => {
    // API call to register a user
    const res = await fetch("/api/accounts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await res.json();

    if (data.success) {
      toast({
        title: "Success",
        description: "Account created successfully. Please log in.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error",
        description: data.message || "Failed to create account.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container 
      maxW={"container.sm"} 
      minH="90vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <VStack spacing={8} w="full">
        <Heading as={"h1"} size={"2xl"} textAlign={"center"}>
          Create an Account
        </Heading>

        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Username"
              value={userData.username}
              onChange={(e) =>
                setUserData({ ...userData, username: e.target.value })
              }
            />
            <Input
              placeholder="Email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
            <Input
              placeholder="Password"
              type="password"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
            <Button colorScheme="teal" w="full" onClick={handleRegister}>
              Register
            </Button>
          </VStack>
        </Box>
        <Link to="/login">
          <Button variant="link">Already have an account? Sign In</Button>
        </Link>
      </VStack>
    </Container>
  );
};

export default RegisterPage;
