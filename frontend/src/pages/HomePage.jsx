import { Container, SimpleGrid, VStack, Box, Text, Input, HStack, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLaptopStore } from "../catalog/laptop";
import LaptopCard from "../components/LaptopCard";

const HomePage = () => {
  const { fetchLaptops, laptops } = useLaptopStore();
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [filteredLaptops, setFilteredLaptops] = useState([]); // State for filtered laptops
  const [sortOrder, setSortOrder] = useState("default"); // State for sort order

  useEffect(() => {
    fetchLaptops();
  }, [fetchLaptops]);

  useEffect(() => { 
    // Filter laptops based on the search query
    const filtered = laptops.filter((laptop) => {
      const query = searchQuery.toLowerCase();

      // Check if the query is numeric (for price search)
      const isNumeric = !isNaN(query) && query.trim() !== "";
      if (isNumeric) {
        const numericQuery = Number(query);
        const priceRangeLower = numericQuery - 5000;
        const priceRangeUpper = numericQuery + 5000;

        // Check if the laptop price is within the range
        return laptop.price >= priceRangeLower && laptop.price <= priceRangeUpper;
      }

      // Check other fields (name, specs, uploader)
      return (
        laptop.name.toLowerCase().includes(query) ||
        laptop.specs.toLowerCase().includes(query) ||
        laptop.uploader.toLowerCase().includes(query)
      );
    });

    // Sort laptops based on the sort order
    let sortedLaptops;
    if (sortOrder === "priceAsc") {
      sortedLaptops = filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "priceDesc") {
      sortedLaptops = filtered.sort((a, b) => b.price - a.price);
    } else {
      sortedLaptops = filtered.sort((a, b) => b.upvotes - a.upvotes);
    }

    setFilteredLaptops(sortedLaptops);
  }, [searchQuery, laptops, sortOrder]);

  const toggleSortOrder = () => {
    if (sortOrder === "default") {
      setSortOrder("priceAsc");
    } else if (sortOrder === "priceAsc") {
      setSortOrder("priceDesc");
    } else {
      setSortOrder("default");
    }
  };

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize="30px"
          fontWeight="bold"
          bgGradient="linear(to-r, teal.300, green.400)"
          bgClip="text"
          textAlign="center"
        >
          Laptop Catalog
        </Text>

        {/* Search Bar and Sort Button */}
        <HStack w="full" spacing={4}>
          <Input
            placeholder="Search by name, specs, store, or price..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="lg"
            focusBorderColor="teal.400"
            w="full"
          />
          <Button onClick={toggleSortOrder} colorScheme="teal">
            {sortOrder === "default" && "Sort by Price ↑"}
            {sortOrder === "priceAsc" && "Sort by Price ↓"}
            {sortOrder === "priceDesc" && "Sort by Upvotes"}
          </Button>
        </HStack>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          spacing={10}
          w={"full"}
        >
          {filteredLaptops.map((laptop) => (
            <LaptopCard key={laptop._id} laptop={laptop} />
          ))}
        </SimpleGrid>

        {filteredLaptops.length === 0 && (
          <Text fontSize="xl" textAlign="center" fontWeight="bold" color="gray.500">
            No laptops match your search. <br />
            You can add a new one by going to{" "}
            <Box display="inline">
              <Link to="/input">
                <Text as="span" color="teal.300" _hover={{ textDecoration: "underline" }}>
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
