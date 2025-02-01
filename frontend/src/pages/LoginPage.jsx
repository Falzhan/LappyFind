import { 
  Box, 
  Button, 
  Container, 
  Input, 
  VStack, 
  Heading, 
  useToast, 
  Spinner, 
  useColorModeValue 
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../catalog/auth";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthStore();
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!credentials.email || !credentials.password) {
      toast({
        title: "Validation Error",
        description: "Please enter both email and password.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      const { success, message } = await login(credentials);
      if (success) {
        navigate("/home");
      } else {
        toast({ title: "Login Failed", description: message, status: "error", duration: 3000, isClosable: true });
      }
    } catch (error) {
      toast({ title: "Error", description: "Something went wrong. Please try again.", status: "error", duration: 3000, isClosable: true });
    } finally {
      setIsLoading(false);
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
          Login
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
              placeholder="Email"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            />
            <Input
              placeholder="Password"
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
            <Button
              onClick={handleLogin}
              colorScheme="teal"
              w="full"
              isDisabled={isLoading}
            >
              {isLoading ? <Spinner size="sm" /> : "Login"}
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default LoginPage;
