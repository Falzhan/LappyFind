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
  // Carousel images
  const images = [
    { src: "src/images/AMDSummary.jpg", alt: "AMD Summary" },
    { src: "src/images/IntelSummary.jpg", alt: "Intel Summary" },
    { src: "src/images/NvideaSummary.jpg", alt: "Nvidea Summary" },
  ];

  const [currentImage, setCurrentImage] = useState(0);

  // Auto-slide functionality for carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [images.length]);

  const bottomTextColor = useColorModeValue("white", "gray.800");

  // Background images for light and dark themes
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
    }, 3000);
    return () => clearInterval(interval);
  }, [backgrounds.length]);

  return (
    <Box>
      {/* Welcome Section */}
      <Container
        maxW="100%"
        h="90vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="relative"
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

        <VStack spacing={6} textAlign="center" zIndex={1}>
          <Text
            fontSize="8xl"
            fontWeight="bold"
            bgGradient="linear(to-r, teal.300, green.400)"
            bgClip="text"
          >
            Welcome to LappyFind
          </Text>
          <Text fontSize="3xl" color="gray.500">
            Find and Discover the Perfect Laptop for You.
          </Text>
          <RouterLink to="/home">
            <Button colorScheme="teal" size="lg">
              Get Started
            </Button>
          </RouterLink>
        </VStack>
      </Container>

      {/* Naming Schemes Explanation */}
      <Container maxW="container.xl" textAlign="center" py={6}>
        <Text fontSize="xl" fontWeight="bold" mt={10} mb={4}>
          Understanding Intel, AMD, and NVIDIA Naming Schemes
        </Text>
        <Text fontSize="md" color="gray.500">
          Intel, AMD and NVIDIA use specific naming conventions to identify their
          processors. Intel's naming scheme includes the brand, generation,
          SKU, and suffix (e.g., Intel Core i7-10750H). AMD's naming scheme
          includes the brand, generation, SKU, and suffix (e.g., AMD Ryzen 7
          4800H). 
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
          onClick={() =>
            setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
          }
          colorScheme="teal"
        />
        <IconButton
          icon={<ArrowForwardIcon />}
          position="absolute"
          right="10px"
          top="50%"
          transform="translateY(-50%)"
          onClick={() =>
            setCurrentImage((prev) => (prev + 1) % images.length)
          }
          colorScheme="teal"
        />
      </Box>

      <VStack spacing={6} textAlign="center" zIndex={1} mt={4} mb={20}>
      <RouterLink to="/articles">
            <Button colorScheme="teal" size="lg">
              Learn More
            </Button>
          </RouterLink>
      </VStack>

      {/* Footer */}
      <Box py={10} bg="teal.500">
        <Container maxW="container.xl">
          <Text
            fontSize="2xl"
            fontWeight="bold"
            textAlign="center"
            mb={6}
            color={bottomTextColor}
          >
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
