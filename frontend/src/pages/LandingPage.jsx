import {
  Container,
  VStack,
  Button,
  Text,
  Box,
  Image,
  HStack,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

const LandingPage = () => {
  const images = [
    { src: "src/images/AMDSummary.jpg", alt: "AMD Summary" },
    { src: "src/images/IntelSummary.jpg", alt: "Intel Summary" },
    // Add more images as needed
  ];

  const [currentImage, setCurrentImage] = useState(0);

  // Auto-slide functionality with useEffect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 10000); // Change every 10 seconds
    return () => clearInterval(interval); // Clean up on component unmount
  }, [images.length]);

  const carouselBg = useColorModeValue("gray.100", "gray.700");
  const bottomTextColor = useColorModeValue("white", "gray.800");

  const handlePrev = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const Background = [
    { src: "src/images/background.jpg", alt: "Welcome Background" },
  ];

  const BackgroundImages = [
    { src: "src/images/backgroundlight.jpg", alt: "Welcome Background Light" },
    { src: "src/images/backgrounddark.png", alt: "Welcome Background Dark" },
  ];
  
  const bgImage = useColorModeValue(BackgroundImages[0].src, BackgroundImages[1].src);
  
  return (
    <Box>
      {/* Welcome Section */}
      <Container
        maxW="100%"
        h="90vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        backgroundImage={`url(${bgImage})`} // Use the background image
        backgroundSize="cover"
        backgroundPosition="center"
      >
        <VStack spacing={6} textAlign="center">
          <Text
            fontSize="8xl"
            fontWeight="bold"
            bgGradient="linear(to-r, teal.300, green.400)"
            bgClip="text"
          >
            Welcome to LappyFind
          </Text>
          <Text fontSize="3xl" color="gray.500">
            Discover and find the perfect laptop for you.
          </Text>
          <RouterLink to="/home">
            <Button colorScheme="teal" size="lg">
              Enter Catalog
            </Button>
          </RouterLink>
        </VStack>
      </Container>

      {/* Naming Schemes Explanation */}
      <Container maxW="container.xl" textAlign="center" py={6}>
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Understanding Intel and AMD Naming Schemes
        </Text>
        <Text fontSize="md" color="gray.500">
          Intel and AMD use specific naming conventions to identify their processors. Intel's naming scheme includes the brand, generation, SKU, and suffix (e.g., Intel Core i7-10750H). AMD's naming scheme includes the brand, generation, SKU, and suffix (e.g., AMD Ryzen 7 4800H).
        </Text>
      </Container>

      {/* Carousel Section */}
      <Box
        position="relative"
        height="60vh"
        width="100%"
        overflow="hidden"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {/* Images */}
        <HStack
          spacing={0}
          height="100%"
          width={`${images.length * 100}%`}
          transform={`translateX(-${currentImage * 100}%)`}
          transition="transform 1s ease-in-out"
          justifyContent="left"
          alignItems="left"
        >
          {images.map((image, index) => (
            <Box
              key={index}
              flex="0 0 100%"
              height="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Image
                src={image.src}
                alt={image.alt}
                objectFit="contain"
                maxH="100%"
                maxW="100%"
              />
            </Box>
          ))}
        </HStack>

        {/* Navigation Buttons */}
        <IconButton
          icon={<ArrowBackIcon />}
          position="absolute"
          left="10px"
          top="50%"
          transform="translateY(-50%)"
          onClick={handlePrev}
          colorScheme="teal"
        />
        <IconButton
          icon={<ArrowForwardIcon />}
          position="absolute"
          right="10px"
          top="50%"
          transform="translateY(-50%)"
          onClick={handleNext}
          colorScheme="teal"
        />
      </Box>



      {/* Footer */}
      <Box py={10} bg="teal.500">
        <Container maxW="container.xl">
          <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={6} color={bottomTextColor}>
            About LappyFind
          </Text>
          <Text fontSize="md" color={bottomTextColor} textAlign="justify">
              LappyFind is your ultimate destination for discovering laptops that
            meet your needs. Our platform offers an extensive catalog of
            laptops, enabling users to browse, compare, and select the perfect
            machine. With community-driven insights and expert recommendations,
            finding the right laptop has never been easier.
          </Text>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
