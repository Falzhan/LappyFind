import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Text,
  Textarea,
  useColorModeValue,
  useToast,
  VStack,

} from "@chakra-ui/react";
import { useState, useEffect } from "react"; // Update the import to include useEffect
import { useLaptopStore } from "../catalog/laptop";
import { useAuthStore } from "../catalog/auth"; // Import the authentication store

const cpuOptions = [
  "Ryzen 3 3200U",
  "Ryzen 5 3500U",
  "Ryzen 7 3700U",
  "Ryzen 3 4300U",
  "Ryzen 5 4500U",
  "Ryzen 7 4700U",
  "Ryzen 9 4900H",
  "Ryzen 3 5300U",
  "Ryzen 5 5500U",
  "Ryzen 7 5700U",
  "Ryzen 9 5900HX",
  "Ryzen 3 6300U",
  "Ryzen 5 6600U",
  "Ryzen 7 6800U",
  "Ryzen 9 6900HX",
  "Ryzen 3 7320U",
  "Ryzen 5 7530U",
  "Ryzen 5 7600U",
  "Ryzen 5 7535HS",
  "Ryzen 7 7800U",
  "Ryzen 9 7900HX",

  "Core i3-8130U",
  "Core i5-8250U",
  "Core i7-8550U",
  "Core i9-8950HK",
  "Core i3-9100",
  "Core i5-9300H",
  "Core i7-9750H",
  "Core i9-9980HK",
  "Core i3-10110U",
  "Core i5-10310u",
  "Core i5-10210U",
  "Core i5-10300H",
  "Core i7-1065G7",
  "Core i9-10980HK",
  "Core i3-1115G4",
  "Core i5-1135G7",
  "Core i7-1165G7",
  "Core i9-11980HK",
  "Core i3-1215U",
  "Core i3-1220P",
  "Core i5-1235U",
  "Core i5-1240P",
  "Core i5-12450H",
  "Core i7-12700H",
  "Core i9-12900HK",
  "Core i3-1315U",
  "Core i5-1335U",
  "Core i5-13420H",
  "Core i5-13500H",
  "Core i5-1340P",
  "Core i7-13700H",
  "Core i7 13650HX",
  "Core i7-13620H",
  "Core i9-13900HK",
];

const gpuOptions = [
  "Radeon Vega",
  "Radeon Vega 3",
  "Radeon Vega 8",
  "Radeon Vega 10",
  "Radeon Vega 5",
  "Radeon Vega 6",
  "Radeon Vega 7",

  "Radeon 610M",
  "Radeon 660M",
  "Radeon 680M",

  "Intel UHD Graphics",
  "Intel UHD Graphics 620",
  "Intel UHD Graphics 630",
  "Intel Iris Plus Graphics",
  "Intel Iris Xe Graphics",
  "NVIDIA GeForce MX110",
  "NVIDIA GeForce MX130",
  "NVIDIA GeForce MX150",
  "NVIDIA GeForce MX230",
  "NVIDIA GeForce MX250",
  "NVIDIA GeForce MX330",
  "NVIDIA GeForce MX350",
  "NVIDIA GeForce MX450",
  "NVIDIA GeForce MX550",
  "NVIDIA GeForce GTX 1650",
  "NVIDIA GeForce GTX 1660 Ti",
  "NVIDIA GeForce RTX 2050",
  "NVIDIA GeForce RTX 2060",
  "NVIDIA GeForce RTX 3050",
  "NVIDIA GeForce RTX 3060",
  "NVIDIA GeForce RTX 3070",
  "NVIDIA GeForce RTX 3080",
  "NVIDIA GeForce RTX 4050",
  "NVIDIA GeForce RTX 4060",
  "NVIDIA GeForce RTX 4070",
  "NVIDIA GeForce RTX 4080",
  "NVIDIA GeForce RTX 4090",
  "AMD Radeon RX 5500M",

  "AMD Radeon RX 5600M",
  "AMD Radeon RX 5700M",
  "AMD Radeon RX 6600M",
  "AMD Radeon RX 6700M",
  "AMD Radeon RX 6800M",
];

const ramOptions = [
  "2GB DDR3",
  "4GB DDR3",
  "8GB DDR3",
  "16GB DDR3",
  "32GB DDR3",

  "2GB DDR4",
  "4GB DDR4",
  "8GB DDR4",
  "16GB DDR4",
  "32GB DDR4",

  "4GB DDR5",
  "8GB DDR5",
  "16GB DDR5",
  "32GB DDR5",
];

const storageOptions = [
  "128GB SSD",
  "256GB SSD",
  "512GB SSD",
  "1TB SSD",
  
  "512GB HDD",
  "1TB HDD",
  "2TB HDD",

  "128GB SSD + 512GB HDD",
  "128GB SSD + 1TB HDD",
  "128GB SSD + 2TB HDD",
  "256GB SSD + 512GB HDD",
  "256GB SSD + 1TB HDD",
  "256GB SSD + 2TB HDD",
  "512GB SSD + 1TB HDD",
  "512GB SSD + 2TB HDD",
  "1TB SSD + 1TB HDD",
  "1TB SSD + 2TB HDD"
];

// Add this function before the InputPage component
const parseSpecSheet = (text) => {
  const result = {
    cpu: '',
    gpu: '',
    ram: '',
    storage: '',
    name: '',
    condition: '',
    screenSize: '',
    price: ''
  };

  const lowerText = text.toLowerCase();

  // Find screen size first
  const screenSizePattern = /(\d{2}\.?\d?)[\s-]?(inch|"|\'\')/i;
  const screenMatch = text.match(screenSizePattern);
  if (screenMatch) {
    result.screenSize = screenMatch[1] + '"';
  }

  // Updated name pattern to capture model name and clean specs
  const namePattern = /([^\/\n-]+(?:-[^\/\n]+)*)/;
  const nameMatch = text.match(namePattern);
  if (nameMatch) {
    // Clean up the name and add screen size
    let baseName = nameMatch[0]
      .trim()
      .split('/')[0]  // Take only the part before first slash
      .replace(/\s*\(.*?\)/g, '') // Remove parenthetical content
      // Remove common spec patterns
      .replace(/\s+(?:core\s+)?i[3579]-\d{4,5}[a-z0-9]*/i, '')
      .replace(/\s+(?:ryzen|r)[3579]\s*-?\s*\d{4}[a-z0-9]*/i, '')
      .replace(/\s+\d+(?:gb|tb)\s*(?:ssd|hdd)/i, '')
      .replace(/\s+\d+gb\s*(?:ddr[345])?/i, '')
      .replace(/\s+(?:\d{1,2})th\s*gen/i, '')
      .replace(/\s+\d{3,4}p?/i, '') // Remove resolution numbers
      .replace(/\s+(?:windows|win)\s*\d{1,2}/i, '') // Remove Windows version
      .replace(/\s+nvidia\s+[^\s]+/i, '') // Remove NVIDIA GPU specs
      .replace(/\s+radeon\s+[^\s]+/i, '') // Remove Radeon GPU specs
      .replace(/\s+intel\s+[^\s]+/i, '') // Remove Intel GPU specs
      .replace(/\s+,\s+/g, ' ') // Clean up any remaining commas
      .replace(/\s+/g, ' '); // Clean up extra spaces
    
    // Add screen size to cleaned name
    result.name = result.screenSize ? 
      `${baseName.trim()} ${result.screenSize}` : 
      baseName.trim();
  }

  // Find CPU
  // Check for Intel patterns
  const intelPattern = /(?:intel\s+)?(?:core\s+)?i[3579](?:[- ]+\d{4,5}[a-z0-9]*|\s+\d{4,5}[a-z0-9]*)/i;
  const intelMatch = lowerText.match(intelPattern);
  if (intelMatch) {
    const cpuModel = intelMatch[0]
      .toLowerCase()
      .replace('intel', '')
      .replace(/\s+/g, ' ')
      .trim();
    
    // Format the CPU model to match the standard format
    const formattedCpu = cpuModel
      .replace(/^i([3579])\s+(\d{4,5}[a-z0-9]*)/, 'core i$1-$2')
      .replace(/^i([3579])-(\d{4,5}[a-z0-9]*)/, 'core i$1-$2');

    result.cpu = cpuOptions.find(cpu => 
      cpu.toLowerCase() === formattedCpu.toLowerCase()
    ) || `Core ${formattedCpu.charAt(0).toUpperCase() + formattedCpu.slice(1)}`;
  }

  // Check for AMD patterns
  const amdPattern = /(?:amd\s+)?(?:ryzen|r)\s*([3579])\s*-?\s*(\d{4}[a-z0-9]*)/i;
  const amdMatch = lowerText.match(amdPattern);
  if (amdMatch) {
    // Format the CPU model to match the standard format
    let cpuModel = amdMatch[0]
      .toLowerCase()
      .replace(/amd\s+/i, '')
      .replace(/^r\s*([3579])/i, 'ryzen $1')
      .replace(/^ryzen\s*([3579])/i, 'ryzen $1')
      .replace(/\s+/g, ' ')
      .trim();

    // Standardize the format
    cpuModel = cpuModel
      .replace(/ryzen\s*([3579])\s*-?\s*(\d{4}[a-z0-9]*)/i, 'Ryzen $1 $2')
      .toUpperCase();

    result.cpu = cpuOptions.find(cpu => 
      cpu.toUpperCase() === cpuModel
    );
  }

  // Find GPU - Updated to handle special characters and variations
  const cleanText = lowerText.replace(/®|™/g, ''); // Remove special characters
  for (const gpu of gpuOptions) {
    const gpuLower = gpu.toLowerCase();
    if (cleanText.includes(gpuLower) || 
        (gpuLower.includes('radeon') && cleanText.includes(gpuLower.replace('amd radeon', 'radeon'))) ||
        (gpuLower.includes('nvidia') && cleanText.includes(gpuLower.replace('nvidia ', ''))) ||
        (gpuLower.includes('intel') && cleanText.includes(gpuLower.replace('intel ', '')))) {
      result.gpu = gpu;
      break;
    }
  }

  // Find RAM - Updated pattern to be more specific and handle speed
  const ramPattern = /(\d+)\s*gb\s*(?:ddr[345])?(?:\s*\d*\s*(?:mhz|MHz))?/i;
  const ramMatch = cleanText.match(ramPattern);
  if (ramMatch) {
    const size = ramMatch[1];
    const ddrMatch = cleanText.match(/ddr[345]/i);
    const type = ddrMatch ? ddrMatch[0].toUpperCase() : 'DDR4';
    result.ram = `${size}GB ${type}`;
  }

  // Find Storage - Updated pattern to better handle multiple storage configs
  const storagePattern = /(\d+(?:\s*(?:gb|tb))\s*(?:(?:nvme|pcie|m\.2)\s*)?(?:ssd|hdd))/gi;
  const storages = [...lowerText.matchAll(storagePattern)].map(match => 
    match[0].toUpperCase()
      .replace(/NVME|PCIE|M\.2/gi, '')
      .replace(/\s+/g, '')
  );

  if (storages.length > 0) {
    // Sort storages to ensure SSD comes before HDD if both exist
    storages.sort((a, b) => {
      const aIsSSD = a.includes('SSD');
      const bIsSSD = b.includes('SSD');
      return bIsSSD - aIsSSD; // This puts SSDs first
    });

    const storageString = storages.join(' + ');
    result.storage = storageOptions.find(s => 
      s.replace(/\s+/g, '') === storageString
    ) || storageString;
  }

  // Find Price - Updated pattern to handle more variations
  const pricePattern = /(?:PHP|₱)?\s*([0-9,]+(?:\.[0-9]{2})?)/i;
  const priceMatches = text.match(/price\s*:\s*(?:PHP|₱)?\s*([0-9,]+(?:\.[0-9]{2})?)/i) || 
                      text.match(/(?:PHP|₱)\s*([0-9,]+(?:\.[0-9]{2})?)/i);
  
  if (priceMatches) {
    result.price = priceMatches[1].replace(/,/g, '');
  }

  // Determine condition
  result.condition = lowerText.includes('used') || 
                    lowerText.includes('second hand') || 
                    lowerText.includes('pre-owned') ? 'Used' : 'New';

  return result;
};

const InputPage = () => {
  // Add these background-related states and hooks at the start of your component
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

  const { user } = useAuthStore(); // Get the authenticated user
  const [newLaptop, setNewLaptop] = useState({
    name: "",
    specs: "",
    price: "",
    image: "",
    condition: "",
    uploader: user?.username || user?.email || "User", // Initialize with the user's name or email
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCPU, setSelectedCPU] = useState("");
  const [selectedGPU, setSelectedGPU] = useState("");
  const [selectedRAM, setSelectedRAM] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("");

  const toast = useToast();
  const { addLaptop } = useLaptopStore();

  const handleAddLaptop = async () => {
    const specs = `${selectedCPU}/${selectedGPU}/${selectedRAM}/${selectedStorage}`;
    const laptopData = { ...newLaptop, specs };

    const { success, message } = await addLaptop(laptopData);
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
    // Reset fields except the uploader
    setNewLaptop({
      name: "",
      specs: "",
      price: "",
      image: "",
      condition: "",
      uploader: user?.username || user?.email || "User",
    });
    setSearchTerm("");
    setSelectedCPU("");
    setSelectedGPU("");
    setSelectedRAM("");
    setSelectedStorage("");
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setSelectedCPU(term);
  };

  const handleCPUSelect = (e) => {
    setSelectedCPU(e.target.value);
  };

  const handleGPUSelect = (e) => {
    setSelectedGPU(e.target.value);
  };

  const handleRAMSelect = (e) => {
    setSelectedRAM(e.target.value);
  };

  const handleStorageSelect = (e) => {
    setSelectedStorage(e.target.value);
  };

  // In your InputPage component, add this function after the existing handlers
  const handleSpecsPaste = (e) => {
    const pastedText = e.target.value;
    const parsedSpecs = parseSpecSheet(pastedText);

    if (parsedSpecs.cpu || parsedSpecs.gpu || parsedSpecs.ram || parsedSpecs.storage) {
      setSelectedCPU(parsedSpecs.cpu);
      setSelectedGPU(parsedSpecs.gpu);
      setSelectedRAM(parsedSpecs.ram);
      setSelectedStorage(parsedSpecs.storage);
      setSearchTerm(parsedSpecs.cpu);
      setNewLaptop(prev => ({
        ...prev,
        name: parsedSpecs.name,
        condition: parsedSpecs.condition,
        price: parsedSpecs.price // Add this line
      }));
    }
  };

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

      <Container maxW={"container.sm"} position="relative" zIndex={1}>
        <VStack spacing={8}>
          <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
            Add New Laptop
          </Heading>

          {/* Separate box for spec parser */}
          <Box
            w={"200%"}
            bg={useColorModeValue("white", "gray.800")}
            p={6}
            rounded={"lg"}
            shadow={"md"}
            mb={4}
          >
            <VStack spacing={4}>
              <Text fontSize="md" fontWeight="medium" color={useColorModeValue("gray.600", "gray.300")}>
                Paste Specs Here
              </Text>
              <Textarea
                placeholder="Paste all specs in here to auto-fill fields below
Please ensure the specs are correct before hitting submit."
                size="sm"
                h="10px"
                resize="none"
                onChange={handleSpecsPaste}
                bg={useColorModeValue("gray.50", "gray.700")}
                _hover={{
                  borderColor: useColorModeValue("blue.500", "blue.300")
                }}
                _focus={{
                  borderColor: useColorModeValue("blue.500", "blue.300"),
                  boxShadow: "outline"
                }}
              />
            </VStack>
          </Box>

          {/* Main input form box */}
          <Box
            w={"full"}
            bg={useColorModeValue("white", "gray.800")}
            p={6}
            rounded={"lg"}
            shadow={"md"}
          >
            <VStack spacing={4}>
              <Input
                placeholder="Laptop Name"
                name="name"
                value={newLaptop.name}
                onChange={(e) => setNewLaptop({ ...newLaptop, name: e.target.value })}
              />

              <Input
                placeholder="Select CPU"
                list="cpuOptions"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <datalist id="cpuOptions">
                {cpuOptions.map((cpu, index) => (
                  <option key={index} value={cpu} />
                ))}
              </datalist>

              <Input
                placeholder="Select GPU"
                list="gpuOptions"
                value={selectedGPU}
                onChange={handleGPUSelect}
              />
              <datalist id="gpuOptions">
                {gpuOptions.map((gpu, index) => (
                  <option key={index} value={gpu} />
                ))}
              </datalist>

              <Input
                placeholder="Select RAM"
                list="ramOptions"
                value={selectedRAM}
                onChange={handleRAMSelect}
              />
              <datalist id="ramOptions">
                {ramOptions.map((ram, index) => (
                  <option key={index} value={ram} />
                ))}
              </datalist>

              <Input
                placeholder="Select Storage"
                list="storageOptions"
                value={selectedStorage}
                onChange={handleStorageSelect}
              />
              <datalist id="storageOptions">
                {storageOptions.map((storage, index) => (
                  <option key={index} value={storage} />
                ))}
              </datalist>

              <Input
                placeholder="₱ Price"
                name="price"
                type="number"
                value={newLaptop.price}
                onChange={(e) => setNewLaptop({ ...newLaptop, price: e.target.value })}
              />
              <Input
                placeholder="Image URL"
                name="image"
                value={newLaptop.image}
                onChange={(e) => setNewLaptop({ ...newLaptop, image: e.target.value })}
              />
              <select 
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '6px',
                  border: '1px solid',
                  borderColor: useColorModeValue('gray.200', 'gray.600'),
                }}
                name="condition"
                value={newLaptop.condition}
                onChange={(e) => setNewLaptop({ ...newLaptop, condition: e.target.value })}
                required
              >
                <option value="">Select Condition</option>
                <option value="New">New</option>
                <option value="Used">Used</option>
              </select>
              <Input
                placeholder="Sources"
                name="source"
                value={newLaptop.source} 
                onChange={(e) => setNewLaptop({ ...newLaptop, source: e.target.value })}
              />
              <Input
                placeholder="Uploader"
                name="uploader"
                value={newLaptop.uploader} // Pre-filled with the user's name or email
                readOnly // Prevent editing
              />

              <Button colorScheme="blue" onClick={handleAddLaptop} w="full">
                Add Laptop
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default InputPage;
