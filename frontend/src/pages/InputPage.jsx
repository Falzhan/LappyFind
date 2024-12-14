import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useLaptopStore } from "../catalog/laptop";

const InputPage = () => {
  const [newLaptop, setNewLaptop] = useState({
    name: "",
    specs: "",
    price: "",
    image: "",
  });

  const toast = useToast();
  const { addLaptop } = useLaptopStore();

  const handleAddLaptop = async () => {
    const { success, message } = await addLaptop(newLaptop);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true,
      });
    }
    setNewLaptop({ name: "", specs: "", price: "", image: "" });
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Add New Laptop
        </Heading>

        <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
          <VStack spacing={4}>
            <Input
              placeholder='Laptop Name'
              name='name'
              value={newLaptop.name}
              onChange={(e) => setNewLaptop({ ...newLaptop, name: e.target.value })}
            />
            <Input
              placeholder='Specs'
              name='specs'
              type='name'
              value={newLaptop.specs}
              onChange={(e) => setNewLaptop({ ...newLaptop, specs: e.target.value })}
            />
            <Input
              placeholder='Price'
              name='price'
              type='number'
              value={newLaptop.price}
              onChange={(e) => setNewLaptop({ ...newLaptop, price: e.target.value })}
            />
            <Input
              placeholder='Image URL'
              name='image'
              value={newLaptop.image}
              onChange={(e) => setNewLaptop({ ...newLaptop, image: e.target.value })}
            />

            <Button colorScheme='blue' onClick={handleAddLaptop} w='full'>
              Add Laptop
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default InputPage;
