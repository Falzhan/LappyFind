import { Container, SimpleGrid, VStack, Box, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLaptopStore } from "../catalog/laptop";
import LaptopCard from "../components/LaptopCard";


const HomePage = () => {
  const { fetchLaptops, laptops } = useLaptopStore();

  useEffect(() => {
    fetchLaptops();
  }, [fetchLaptops]);
  console.log("laptops", laptops);

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize="30px"
          fontWeight="bold"
          bgGradient='linear(to-r, teal.300, green.400)'
          bgClip="text"
          textAlign="center"
        >
          Laptop Catalog
        </Text>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3
          }}
          spacin={10}
          w={"full"}
        >
          {laptops.map((laptop) => (
            <LaptopCard key={laptop._id} laptop={laptop}/>
            ))}
        </SimpleGrid>





      {laptops.length === 0 && (
        <Text fontSize='xl' textAlign='center' fontWeight='bold' color='gray.500'>
          Catalog empty :( 
        <Box display='block'>
    <Link to="/input">
      <Text as='span' color='teal.300' _hover={{ textDecoration: 'underline' }}>
        Input Laptop
      </Text>
    </Link>
  </Box>
</Text>
      )}

      </VStack>
    </Container>
  );
};

export default HomePage;
