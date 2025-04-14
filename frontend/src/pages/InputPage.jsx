import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  useToast,
  VStack,

} from "@chakra-ui/react";
import { useState } from "react";
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
  "Ryzen 3 7530U",
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
  "Radeon Vega 3",
  "Radeon Vega 8",
  "Radeon Vega 10",
  "Radeon Vega 5",
  "Radeon Vega 6",
  "Radeon Vega 7",
  "Radeon 660M",
  "Radeon 680M",
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
  "4GB DDR3",
  "8GB DDR3",
  "16GB DDR3",
  "32GB DDR3",
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

const InputPage = () => {
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

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Add New Laptop
        </Heading>

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
  );
};

export default InputPage;
