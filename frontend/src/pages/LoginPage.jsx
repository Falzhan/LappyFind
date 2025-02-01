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
import { useState, useEffect } from "react";
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

  const lightBackgrounds = [
    "src/images/backgroundlight.png",
    "src/images/backgroundlight2.png",
  ];

  const darkBackgrounds = [
    "src/images/backgrounddark.png",
    "src/images/backgrounddark2.png",
  ];

  const backgrounds = useColorModeValue(lightBackgrounds, darkBackgrounds);
  const [bgIndex, setBgIndex] = useState(0);

  // Background image slideshow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [backgrounds.length]);

  return (
    <Container 
      maxW={"container.sm"} 
      minH="90vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >

            {/* Background Images with Fade Effect */}
            {backgrounds.map((src, i) => (
          <Box
            key={i}
            position="absolute"
            top="0"
            left="0"
            w="100%"
            h="100%"
            backgroundImage={`url(${src})`}
            backgroundSize="cover"
            backgroundPosition="center"
            opacity={i === bgIndex ? 1 : 0}
            transition="opacity 2s ease-in-out"
          />
        ))}

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
          opacity={2}
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
