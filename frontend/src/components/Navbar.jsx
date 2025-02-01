import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Text,
  useColorMode,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { useAuthStore } from "../catalog/auth";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import LaptopCard from "./LaptopCard";
import { useDisclosure } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useLaptopStore } from "../catalog/laptop";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { laptops, fetchLaptops } = useLaptopStore();
  const [userLaptops, setUserLaptops] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch laptops and filter those of the current user
  useEffect(() => {
    if (isAuthenticated) {
      fetchLaptops();
    }
  }, [fetchLaptops, isAuthenticated]);

  useEffect(() => {
    const filtered = laptops.filter((laptop) => laptop.uploader === user?.username || laptop.uploader === user?.email);
    setUserLaptops(filtered);
  }, [laptops, user]);

  // Search filter for user laptops
  const filteredLaptops = userLaptops.filter((laptop) => {
    const query = searchQuery.toLowerCase();
    return (
      laptop.name.toLowerCase().includes(query) ||
      laptop.specs.toLowerCase().includes(query) ||
      laptop.price.toString().includes(query)
    );
  });

  return (
<Container
  maxW="2000px"
  px={4}
  position="sticky"
  top="0"
  zIndex="sticky"
  bg={colorMode === "light" ? "white" : "gray.800"} // Adapts to light/dark mode
  boxShadow="xl"
>
  <Flex h={16} alignItems="center" justifyContent="space-between">
    {/* Left-aligned "LappyFind" */}
    <Text
      bgGradient="linear(to-b, teal.300, green.400)"
      bgClip="text"
      fontSize="5xl"
      fontWeight="extrabold"
    >
      <Link to={"/"}>LappyFind 🖥️</Link>
    </Text>

    {/* Right-aligned buttons */}
    <HStack spacing={4}>
      {isAuthenticated ? (
        <Box>
          <Button variant="link" onClick={onOpen} fontWeight="bold">
            Welcome, {user?.username || user?.email || "User"}!
          </Button>
          <Link to={"/input"}>
            <Button>
              <PlusSquareIcon fontSize={20} />
            </Button>
          </Link>
          <Button onClick={logout}>Logout</Button>
        </Box>
      ) : (
        <>
          <Link to={"/login"}>
            <Button>Login</Button>
          </Link>
          <Link to={"/register"}>
            <Button>Register</Button>
          </Link>
        </>
      )}
      <Button onClick={toggleColorMode}>
        {colorMode === "light" ? <IoMoon /> : <LuSun />}
      </Button>
    </HStack>
  </Flex>

      {/* Modal to display user laptops */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Your Laptops</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} w="full">
              <Input
                placeholder="Search your laptops by name, specs, or price..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                size="lg"
                focusBorderColor="teal.400"
              />
              <VStack spacing={4} w="full">
                {filteredLaptops.map((laptop) => (
                  <LaptopCard key={laptop._id} laptop={laptop} />
                ))}
                {filteredLaptops.length === 0 && (
                  <Text fontSize="lg" color="gray.500" fontWeight="bold">
                    No laptops found.
                  </Text>
                )}
              </VStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Navbar;
