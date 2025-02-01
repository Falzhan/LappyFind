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
import { useState, useEffect } from "react";
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
