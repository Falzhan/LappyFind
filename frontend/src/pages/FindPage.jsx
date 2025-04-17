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
  const { fetchLaptops, laptops } = useLaptopStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { 
    isOpen: isNoLaptopsOpen, 
    onOpen: onNoLaptopsOpen, 
    onClose: onNoLaptopsClose 
  } = useDisclosure();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    condition: "", // Add this line
    usage: "",
    budget: "",
    screenSize: "",
  });
  const [filteredLaptops, setFilteredLaptops] = useState([]);
  const [availableLaptops, setAvailableLaptops] = useState(0);

  const handleNext = () => {
    setStep(step + 1);
  };

  useEffect(() => {
    fetchLaptops();
  }, [fetchLaptops]);

  const handleBack = () => {
    setStep(step - 1);
  };

  const matchCondition = (laptop) => {
    return laptop.condition === formData.condition;
  };

  const matchUsage = (laptop) => {
    switch (formData.usage) {
      case 'browsing':
        return laptop.specs.toLowerCase().includes('celeron') ||
               laptop.specs.toLowerCase().includes('pentium');
      case 'office tasks':
        return laptop.specs.toLowerCase().includes('core i3') || 
               laptop.specs.toLowerCase().includes('ryzen 3');
      case 'work':
        return laptop.specs.toLowerCase().includes('core i5') ||
               laptop.specs.toLowerCase().includes('core i7') || 
               laptop.specs.toLowerCase().includes('ryzen 5') || 
               laptop.specs.toLowerCase().includes('ryzen 7') ;
      case 'gaming':
        return (laptop.specs.toLowerCase().includes('rtx')|| 
               laptop.specs.toLowerCase().includes('gtx') ||
               laptop.specs.toLowerCase().includes('mx')) &&
               laptop.specs.toLowerCase().includes('nvidia');
      default:
        return false;
    }
  };

  const matchScreenSize = (laptop) => {
    switch (formData.screenSize) {
      case 'small':
        return laptop.name.toLowerCase().includes('14"') || 
               laptop.name.toLowerCase().includes('11.6"');
      case 'normal':
        return laptop.name.toLowerCase().includes('15.6"');
      case 'large':
        return laptop.name.toLowerCase().includes('16"');
      default:
        return false;
    }
  };

  const matchBudget = (laptop) => {
    const budgetMap = {
      '15000': 15000,
      '20000': 20000,
      '30000': 30000,
      '40000': 40000,
      '50000': 50000
    };
    
    const maxBudget = budgetMap[formData.budget];
    if (formData.budget === '50000') {
      return true; // For "₱50,000 and above" option
    }
    return laptop.price <= maxBudget;
  };

  // Add this helper function after the existing matchBudget function
  const getFormattedSelections = () => {
    const selections = [];
    
    if (formData.condition) selections.push(formData.condition);
    if (formData.usage) selections.push(formData.usage.charAt(0).toUpperCase() + formData.usage.slice(1));
    if (formData.budget) selections.push(`₱${formData.budget}`);
    if (formData.screenSize) {
      const sizeLabels = {
        small: "Small Screen",
        normal: "Normal Screen",
        large: "Large Screen"
      };
      selections.push(sizeLabels[formData.screenSize]);
    }
    
    return selections.length > 0 ? selections.join(" - ") : "";
  };

  const handleSearch = () => {
    const filtered = laptops.filter((laptop) => 
      matchCondition(laptop) && matchUsage(laptop) && matchScreenSize(laptop) && matchBudget(laptop)
    );

    setFilteredLaptops(filtered);
    onOpen();
  };

  const updateAvailableLaptopsCount = () => {
    const filtered = laptops.filter((laptop) => {
      const conditionMatch = !formData.condition || matchCondition(laptop);
      const usageMatch = !formData.usage || matchUsage(laptop);
      const screenMatch = !formData.screenSize || matchScreenSize(laptop);
      const budgetMatch = !formData.budget || matchBudget(laptop);
      
      return conditionMatch && usageMatch && screenMatch && budgetMatch;
    });

    setAvailableLaptops(filtered.length);
    
    if (filtered.length === 0 && (formData.condition || formData.usage || formData.budget || formData.screenSize)) {
      onNoLaptopsOpen();
    }
  };

  useEffect(() => {
    if (laptops.length > 0) {
      setAvailableLaptops(laptops.length);
    }
  }, [laptops]);

  useEffect(() => {
    updateAvailableLaptopsCount();
  }, [formData]);

  const boxBg = useColorModeValue("white", "gray.700");
  const boxShadow = useColorModeValue("lg", "dark-lg");
  const textColor = useColorModeValue("gray.600", "gray.200");

  // Add these color mode values for buttons
  const buttonBg = useColorModeValue("gray.100", "gray.700");
  const buttonHoverBg = useColorModeValue("gray.200", "gray.600");
  const selectedBg = useColorModeValue("teal.100", "teal.700");
  const selectedBorder = useColorModeValue("teal.500", "teal.200");

  const handleReset = () => {
    setFormData({
      condition: "",
      usage: "",
      budget: "",
      screenSize: "",
    });
    setStep(1);
  };

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
              How would you like your laptop?
            </Text>
            <Stack spacing={4}>
              {[
                { value: "New", label: "Brand New" },
                { value: "Used", label: "Used" }
              ].map((option) => (
                <Box
                  key={option.value}
                  as="button"
                  w="full"
                  p={4}
                  textAlign="center" 
                  borderRadius="md"
                  bg={formData.condition === option.value ? selectedBg : buttonBg}
                  border="2px"
                  borderColor={formData.condition === option.value ? selectedBorder : "transparent"}
                  _hover={{ bg: formData.condition === option.value ? selectedBg : buttonHoverBg }}
                  onClick={() => setFormData({ ...formData, condition: option.value })}
                  transition="all 0.2s"
                >
                  {option.label}
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
              What would you be using your laptop for?
            </Text>
            <Stack spacing={4}>
              {["browsing", "office tasks", "work", "gaming"].map((option) => (
                <Box
                  key={option}
                  as="button"
                  w="full"
                  p={4}
                  textAlign="center"  // Changed from 'left' to 'center'
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
              What is your budget?
            </Text>
            <Stack spacing={4}>
              {[
                { value: "20000", label: "Below ₱20,000" },
                { value: "30000", label: "Below ₱30,000" },
                { value: "40000", label: "Below ₱40,000" },
                { value: "50000", label: "Up to ₱50,000 and above" },
              ].map((option) => (
                <Box
                  key={option.value}
                  as="button"
                  w="full"
                  p={4}
                  textAlign="center"  // Changed from 'left' to 'center'
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

      case 4:
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
                { value: "normal", label: "Normal (15.6\")" },
                { value: "large", label: "Large (16\" and above)" },
              ].map((option) => (
                <Box
                  key={option.value}
                  as="button"
                  w="full"
                  p={4}
                  textAlign="center"  // Changed from 'left' to 'center'
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

      {/* Existing content wrapped in Container */ }
      <Container maxW="container.md" py={12} pb={24} position="relative" zIndex={1}>
        <VStack spacing={8} align="stretch" mb={16}>
          <Progress value={(step / 4) * 100} size="sm" colorScheme="teal" mb={8} />
          
          {renderStep()}

          {/* Replace the existing Stack component containing the buttons with this: */}
          <Stack direction="row" spacing={4} justify="space-between" mt={8} w="full">
            <Box>
              {step > 1 && (
                <Button size="lg" onClick={handleBack} variant="outline" colorScheme="teal">
                  Back
                </Button>
              )}
            </Box>

            {/* Only show Reset button after step 1 */}
            {step > 1 && (
              <Button
                size="lg"
                onClick={handleReset}
                colorScheme="gray"
                variant="outline"
              >
                Reset
              </Button>
            )}

            <Box>
              {step < 4 ? (
                <Button
                  size="lg"
                  onClick={handleNext}
                  colorScheme="teal"
                  isDisabled={
                    (step === 1 && !formData.condition) ||
                    (step === 2 && !formData.usage) ||
                    (step === 3 && !formData.budget)
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
            </Box>
          </Stack>
        </VStack>

        {/* Sticky Count Bar */}
        <Box
          position="fixed"
          bottom="0"
          left="0"
          right="0"
          bg={boxBg}
          p={4}
          borderTop="1px"
          borderColor="gray.200"
          boxShadow="0 -4px 6px -1px rgba(0, 0, 0, 0.1)"
          zIndex={1000}
        >
          <Container maxW="container.md">
            <VStack spacing={1}>
              {getFormattedSelections() && (
                <Text textAlign="center" color={textColor}>
                  {getFormattedSelections()}
                </Text>
              )}
              <Text textAlign="center" fontWeight="bold" color={textColor}>
                Available Laptops: {availableLaptops}
              </Text>
            </VStack>
          </Container>
        </Box>

        {/* No Laptops Modal */}
        <Modal isOpen={isNoLaptopsOpen} onClose={onNoLaptopsClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>No Laptops Available</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Text>
                There are no laptops matching your current selection criteria. 
                Please try adjusting your filters.
              </Text>
            </ModalBody>
          </ModalContent>
        </Modal>

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