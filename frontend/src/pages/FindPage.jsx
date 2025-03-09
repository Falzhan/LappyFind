import {
  Container,
  VStack,
  Text,
  Button,
  RadioGroup,
  Radio,
  Stack,
  Box,
  Progress,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  SimpleGrid,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLaptopStore } from "../catalog/laptop";
import LaptopCard from "../components/LaptopCard";

const FindPage = () => {
  const navigate = useNavigate();
  const { laptops } = useLaptopStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    usage: "",
    budget: "",
    screenSize: "",
  });
  const [filteredLaptops, setFilteredLaptops] = useState([]);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSearch = () => {
    // Filter laptops based on criteria
    const filtered = laptops.filter((laptop) => {
      // Usage-based filtering
      const usageMatch = {
        browsing: (specs) => specs.toLowerCase().includes('celeron') || specs.toLowerCase().includes('pentium'),
        documents: (specs) => specs.toLowerCase().includes('i3') || specs.toLowerCase().includes('ryzen 3'),
        work: (specs) => specs.toLowerCase().includes('i5') || specs.toLowerCase().includes('ryzen 5'),
        gaming: (specs) => specs.toLowerCase().includes('i5') || specs.toLowerCase().includes('ryzen 5') || specs.toLowerCase().includes('rtx'),
      };

      // Screen size filtering
      const screenSizeMatch = {
        small: (specs) => specs.toLowerCase().includes('14'),
        medium: (specs) => specs.toLowerCase().includes('15.6'),
        large: (specs) => specs.toLowerCase().includes('16'),
      };

      // Budget filtering
      const budgetNum = parseInt(formData.budget);
      const priceMatch = laptop.price <= budgetNum;

      return (
        usageMatch[formData.usage]?.(laptop.specs) &&
        screenSizeMatch[formData.screenSize]?.(laptop.specs) &&
        priceMatch
      );
    });

    setFilteredLaptops(filtered);
    onOpen(); 
  };

  const boxBg = useColorModeValue("white", "gray.700");
  const boxShadow = useColorModeValue("lg", "dark-lg");
  const textColor = useColorModeValue("gray.600", "gray.200");

  // Add these color mode values for buttons
  const buttonBg = useColorModeValue("gray.100", "gray.700");
  const buttonHoverBg = useColorModeValue("gray.200", "gray.600");
  const selectedBg = useColorModeValue("teal.100", "teal.700");
  const selectedBorder = useColorModeValue("teal.500", "teal.200");

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Box
            w="full"
            bg={boxBg}
            p={8}
            borderRadius="xl"
            boxShadow={boxShadow}
            transition="all 0.3s"
          >
            <Text fontSize="2xl" fontWeight="bold" mb={8} textAlign="center" color={textColor}>
              What would you be using your laptop for?
            </Text>
            <Stack spacing={4}>
              {["browsing", "documents", "gaming", "work"].map((option) => (
                <Box
                  key={option}
                  as="button"
                  w="full"
                  p={4}
                  textAlign="left"
                  borderRadius="md"
                  bg={formData.usage === option ? selectedBg : buttonBg}
                  border="2px"
                  borderColor={formData.usage === option ? selectedBorder : "transparent"}
                  _hover={{ bg: formData.usage === option ? selectedBg : buttonHoverBg }}
                  onClick={() => setFormData({ ...formData, usage: option })}
                  textTransform="capitalize"
                  transition="all 0.2s"
                >
                  {option}
                </Box>
              ))}
            </Stack>
          </Box>
        );

      case 2:
        return (
          <Box
            w="full"
            bg={boxBg}
            p={8}
            borderRadius="xl"
            boxShadow={boxShadow}
            transition="all 0.3s"
          >
            <Text fontSize="2xl" fontWeight="bold" mb={8} textAlign="center" color={textColor}>
              What is your budget?
            </Text>
            <Stack spacing={4}>
              {[
                { value: "15000", label: "Up to ₱15,000" },
                { value: "20000", label: "Up to ₱20,000" },
                { value: "30000", label: "Up to ₱30,000" },
                { value: "40000", label: "Up to ₱40,000" },
                { value: "50000", label: "₱50,000 and above" },
              ].map((option) => (
                <Box
                  key={option.value}
                  as="button"
                  w="full"
                  p={4}
                  textAlign="left"
                  borderRadius="md"
                  bg={formData.budget === option.value ? selectedBg : buttonBg}
                  border="2px"
                  borderColor={formData.budget === option.value ? selectedBorder : "transparent"}
                  _hover={{ bg: formData.budget === option.value ? selectedBg : buttonHoverBg }}
                  onClick={() => setFormData({ ...formData, budget: option.value })}
                  transition="all 0.2s"
                >
                  {option.label}
                </Box>
              ))}
            </Stack>
          </Box>
        );

      case 3:
        return (
          <Box
            w="full"
            bg={boxBg}
            p={8}
            borderRadius="xl"
            boxShadow={boxShadow}
            transition="all 0.3s"
          >
            <Text fontSize="2xl" fontWeight="bold" mb={8} textAlign="center" color={textColor}>
              Is there a specific screen size you prefer?
            </Text>
            <Stack spacing={4}>
              {[
                { value: "small", label: "Small (14\" and below)" },
                { value: "medium", label: "Medium (15.6\")" },
                { value: "large", label: "Large (16\" and above)" },
              ].map((option) => (
                <Box
                  key={option.value}
                  as="button"
                  w="full"
                  p={4}
                  textAlign="left"
                  borderRadius="md"
                  bg={formData.screenSize === option.value ? selectedBg : buttonBg}
                  border="2px"
                  borderColor={formData.screenSize === option.value ? selectedBorder : "transparent"}
                  _hover={{ bg: formData.screenSize === option.value ? selectedBg : buttonHoverBg }}
                  onClick={() => setFormData({ ...formData, screenSize: option.value })}
                  transition="all 0.2s"
                >
                  {option.label}
                </Box>
              ))}
            </Stack>
          </Box>
        );

      default:
        return null;
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

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [backgrounds.length]);

  return (
    <Box position="relative" minH="90vh">
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

      {/* Existing content wrapped in Container */}
      <Container maxW="container.md" py={12} position="relative" zIndex={1}>
        <VStack spacing={8} align="stretch">
          <Progress value={(step / 3) * 100} size="sm" colorScheme="teal" mb={8} />
          
          {renderStep()}

          <Stack direction="row" spacing={4} justify="center" mt={8}>
            {step > 1 && (
              <Button size="lg" onClick={handleBack} variant="outline" colorScheme="teal">
                Back
              </Button>
            )}
            {step < 3 ? (
              <Button
                size="lg"
                onClick={handleNext}
                colorScheme="teal"
                isDisabled={
                  (step === 1 && !formData.usage) ||
                  (step === 2 && !formData.budget)
                }
              >
                Next
              </Button>
            ) : (
              <Button
                size="lg"
                onClick={handleSearch}
                colorScheme="teal"
                isDisabled={!formData.screenSize}
              >
                Find your laptop
              </Button>
            )}
          </Stack>
        </VStack>

        {/* Results Modal */}
        <Modal isOpen={isOpen} onClose={onClose} size="6xl" scrollBehavior="inside">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              Recommended Laptops
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              {filteredLaptops.length === 0 ? (
                <Text fontSize="xl" textAlign="center" color="gray.500">
                  No laptops found matching your criteria.
                </Text>
              ) : (
                <SimpleGrid
                  columns={{ base: 1, md: 2, lg: 3 }}
                  spacing={6}
                  w="full"
                >
                  {filteredLaptops.map((laptop) => (
                    <LaptopCard key={laptop._id} laptop={laptop} />
                  ))}
                </SimpleGrid>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      </Container>
    </Box>
  );
};

export default FindPage;