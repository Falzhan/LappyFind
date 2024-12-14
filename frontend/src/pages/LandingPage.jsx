import { Container, VStack, Button, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <Container
      maxW="container.xl"
      h="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <VStack spacing={6} textAlign="center">
        <Text
          fontSize="4xl"
          fontWeight="bold"
          bgGradient="linear(to-r, teal.300, green.400)"
          bgClip="text"
        >
          Welcome to LappyFind
        </Text>
        <Text fontSize="lg" color="gray.500">
          Discover, manage, and find the perfect laptop for you.
        </Text>
        <Link to="/home">
          <Button colorScheme="teal" size="lg">
            Enter Catalog
          </Button>
        </Link>
      </VStack>
    </Container>
  );
};

export default LandingPage;