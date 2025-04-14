import { 
  Box, 
  SimpleGrid, 
  Image, 
  Text, 
  Link, 
  Heading, 
  useColorModeValue, 
  Collapse, 
  Button 
} from "@chakra-ui/react";
import { useState, useEffect } from "react"; // Add useEffect import
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

const brandStores = [
  {
    title: "MSI",
    image: "", // Add image URL here
    link: "https://ph.msi.com/Laptops/Products"
  },
  {
    title: "Gigabyte",
    image: "", // Add image URL here
    link: "https://www.gigabyte.com/ph/Laptop"
  },
  {
    title: "Lenovo",
    image: "", // Add image URL here
    link: "https://www.lenovo.com/ph/en/laptops/"
  },
  {
    title: "HP",
    image: "", // Add image URL here
    link: "https://www.hp.com/ph-en/laptops-and-2-in-1s/essential.html#browse-models"
  },
  {
    title: "Acer",
    image: "", // Add image URL here
    link: "https://store.acer.com/en-ph/laptop"
  },
  {
    title: "Asus",
    image: "", // Add image URL here
    link: "https://www.asus.com/ph/laptops/"
  },
  {
    title: "Dell",
    image: "", // Add image URL here
    link: "https://www.dell.com/en-ph/shop/scc/sc/laptops/"
  },
  {
    title: "Chuwi",
    image: "", // Add image URL here
    link: "https://chuwiphilippines.com/"
  },
  {
    title: "Huawei",
    image: "", // Add image URL here
    link: "https://consumer.huawei.com/ph/laptops/"
  }
];

const localStores = [
  {
    title: "Villman",
    image: "", // Add image URL here
    link: "https://villman.com/Category/Notebook-PCs"
  },
  {
    title: "EasyPC",
    image: "", // Add image URL here
    link: "https://easypc.com.ph/collections/laptops"
  },
  {
    title: "PCX",
    image: "", // Add image URL here
    link: "https://pcx.com.ph/collections/laptops"
  },
  {
    title: "DynaQuest",
    image: "", // Add image URL here
    link: "https://dynaquestpc.com/collections/notebooks"
  },
  {
    title: "LaptopFactory",
    image: "", // Add image URL here
    link: "https://laptopfactory.com.ph/"
  },
  {
    title: "Octagon",
    image: "", // Add image URL here
    link: "https://www.octagon.com.ph/collections/laptop"
  },
  {
    title: "TipidPC",
    image: "", // Add image URL here
    link: "https://tipidpc.com/catalog.php?cat=13&sec=s"
  }
];

const StoresPage = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const cardBg = useColorModeValue("gray.50", "gray.700");

  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isLocalOpen, setIsLocalOpen] = useState(true);

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

  const StoreCard = ({ store }) => (
    <Link href={store.link} isExternal _hover={{ textDecoration: 'none' }}>
      <Box
        shadow="lg"
        rounded="lg"
        overflow="hidden"
        transition="all 0.3s"
        _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
        bg={cardBg}
        w="300px"
        h="200px"
        mx="auto"
      >
        <Image 
          src={store.image} 
          alt={store.title}
          h="150px"
          w="full"
          objectFit="cover"
        />
        <Box p={4}>
          <Text 
            fontSize="lg" 
            fontWeight="bold" 
            color={textColor}
            textAlign="center"
          >
            {store.title}
          </Text>
        </Box>
      </Box>
    </Link>
  );

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

      <Box position="relative" zIndex={1}>
        <Box maxW="1200px" mx="auto" p={8}>
          {/* Brand Stores Section */}
          <Box mb={8}>
            <Button 
              onClick={() => setIsBrandOpen(!isBrandOpen)}
              w="full"
              justifyContent="space-between"
              mb={4}
              bg={bgColor}
              borderWidth={1}
              borderColor={borderColor}
            >
              <Heading size="lg">Brand Stores</Heading>
              {isBrandOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </Button>
            
            <Collapse in={isBrandOpen} animateOpacity>
              <Box display="flex" justifyContent="center">
                <SimpleGrid 
                  columns={{ base: 1, md: 2, lg: 3 }} 
                  spacing={8}
                  maxW="1000px"
                  mx="auto"
                  justifyItems="center"
                  alignItems="center"
                >
                  {brandStores.map((store) => (
                    <StoreCard key={store.title} store={store} />
                  ))}
                </SimpleGrid>
              </Box>
            </Collapse>
          </Box>

          {/* Local Stores Section */}
          <Box>
            <Button 
              onClick={() => setIsLocalOpen(!isLocalOpen)}
              w="full"
              justifyContent="space-between"
              mb={4}
              bg={bgColor}
              borderWidth={1}
              borderColor={borderColor}
            >
              <Heading size="lg">Local Stores</Heading>
              {isLocalOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </Button>
            
            <Collapse in={isLocalOpen} animateOpacity>
              <Box display="flex" justifyContent="center">
                <SimpleGrid 
                  columns={{ base: 1, md: 2, lg: 3 }} 
                  spacing={8}
                  maxW="1000px"
                  mx="auto"
                  justifyItems="center"
                  alignItems="center"
                >
                  {localStores.map((store) => (
                    <StoreCard key={store.title} store={store} />
                  ))}
                </SimpleGrid>
              </Box>
            </Collapse>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default StoresPage;
