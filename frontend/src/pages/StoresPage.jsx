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
import { useState, useEffect } from "react"; 
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

const brandStores = [
  {
    title: "MSI",
    image: "https://i.pinimg.com/736x/c9/51/8a/c9518a174630b7a991e3959f3930c7ee.jpg", 
    link: "https://ph.msi.com/Laptops/Products"
  },
  {
    title: "Gigabyte",
    image: "https://i.pinimg.com/736x/1b/54/22/1b54223094c5a715c80eebff6d92f3c0.jpg", 
    link: "https://www.gigabyte.com/ph/Laptop"
  },
  {
    title: "Lenovo",
    image: "https://cdn.dribbble.com/userupload/42180759/file/original-de10636ea89f602e3c64b9a96b2d7815.png?resize=400x300", 
    link: "https://www.lenovo.com/ph/en/laptops/"
  },
  {
    title: "HP",
    image: "https://static.vecteezy.com/system/resources/previews/016/460/778/non_2x/hp-company-logo-with-realistic-shadow-popular-computer-and-laptop-manufacturing-companies-logotype-free-png.png", 
    link: "https://www.hp.com/ph-en/laptops-and-2-in-1s/essential.html#browse-models"
  },
  {
    title: "Acer",
    image: "https://static.vecteezy.com/system/resources/previews/019/136/299/non_2x/acer-logo-acer-icon-free-free-vector.jpg", 
    link: "https://store.acer.com/en-ph/laptop"
  },
  {
    title: "Asus",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUeCtFtb8CItGCteSy5ri-8lkOW3Fn2EsRsg&s", 
    link: "https://www.asus.com/ph/laptops/"
  },
  {
    title: "Dell",
    image: "https://www.freeiconspng.com/uploads/dell-icon-9.png", 
    link: "https://www.dell.com/en-ph/shop/scc/sc/laptops/"
  },
  {
    title: "Chuwi",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5QHQE1SL6tLwQzmLzuRgPaofARnAWYaCuxg&s", 
    link: "https://chuwiphilippines.com/"
  },
  {
    title: "Huawei",
    image: "https://wallpapercat.com/w/full/4/4/4/2149358-3840x2160-desktop-4k-huawei-logo-wallpaper-photo.jpg", 
    link: "https://consumer.huawei.com/ph/laptops/"
  }
];

const localStores = [
  {
    title: "Villman",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3vyMycWU0Si71HwnN4CWtUFRl2gXsWliPNA&s", 
    link: "https://villman.com/Category/Notebook-PCs"
  },
  {
    title: "EasyPC",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSCFGTr00LjuGvHxsNGcHBqKN5qrLDfYBLSQ&s", 
    link: "https://easypc.com.ph/collections/laptops"
  },
  {
    title: "PCX",
    image: "https://pcx.com.ph/cdn/shop/articles/PCX-Branches-Square_0a041eef-2d06-44b6-b42b-fa409146784d.jpg?v=1738806627&width=1000", 
    link: "https://pcx.com.ph/collections/laptops"
  },
  {
    title: "DynaQuest",
    image: "https://www.couponzguru.ph/wp-content/uploads/2020/05/DynaQuest-PC-Coupon-Codes.jpg", 
    link: "https://dynaquestpc.com/collections/notebooks"
  },
  {
    title: "LaptopFactory",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ09WH943sjExvwG9Debn67cY9aXRTUuD05gA&s", 
    link: "https://laptopfactory.com.ph/"
  },
  {
    title: "Octagon",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/cf813982342435.Y3JvcCwxMDIyLDgwMCwxODcsMA.jpg", 
    link: "https://www.octagon.com.ph/collections/laptop"
  },
  {
    title: "PCWorx",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDREEGDTHGnTJyUByS39ei9KthrGecQWD_Uw&s", 
    link: "https://pcworx.ph/collections/laptop"
  },
  {
    title: "TipidPC",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkSNLWP07TymOgnHRoT08Ac_StN4EYbI3cog&s", 
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
