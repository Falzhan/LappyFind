import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast, VStack } from "@chakra-ui/react";
import { useLaptopStore } from "../catalog/laptop";
import { useState } from "react";


const LaptopCard = ({laptop}) => {
    const [updatedLaptop, setUpdatedLaptop] = useState(laptop);
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "teal.600");

    const {deleteLaptop, updateLaptop} = useLaptopStore()
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleDeleteLaptop = async (pid) => {
      const {success, message} = await deleteLaptop(pid)
      if (!success) {
        toast({
          title: 'Error',
          description: message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Success',
          description: message,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
    };

    const handleUpdateLaptop = async (pid) => {
      const {success, message} = await updateLaptop(pid, updatedLaptop)
      if (!success) {
        toast({
          title: 'Error',
          description: message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });} 
        
        else {
        toast({
          title: 'Success',
          description: message,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        onClose();
      }
    };
    



  return (
        <Box
          shadow="lg"
          rounded="lg"
          overflow="hidden"
          transition='all 0.3s'
          _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
          bg={bg}
        >
          <Image src={laptop.image} alt={laptop.name} h={48} w="full" objectFit='cover' />

          <Box p={4}>
            <Heading as="h3" size="md" mb={2}>
                {laptop.name} - {laptop.specs}
            </Heading>
    
            <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
              ₱{laptop.price}
            </Text>

            <HStack spacing={2}>
                <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='green' />
                <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteLaptop(laptop._id)} colorScheme='red' />
            </HStack>
          </Box>

          <Modal isOpen={isOpen} onClose={onClose}>

				<ModalOverlay />

				<ModalContent>
					<ModalHeader>Update Laptop</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack spacing={4}>
							<Input
								placeholder='Laptop Name'
								name='name'
								value={updatedLaptop.name}
								onChange={(e) => setUpdatedLaptop({ ...updatedLaptop, name: e.target.value })}
							/>
              <Input
								placeholder='Price'
								name='specs'
								value={updatedLaptop.specs}
								onChange={(e) => setUpdatedLaptop({ ...updatedLaptop, specs: e.target.value })}
							/>
							<Input
								placeholder='Price'
								name='price'
								type='number'
								value={updatedLaptop.price}
								onChange={(e) => setUpdatedLaptop({ ...updatedLaptop, price: e.target.value })}
							/>
							<Input
								placeholder='Image URL'
								name='image'
								value={updatedLaptop.image}
								onChange={(e) => setUpdatedLaptop({ ...updatedLaptop, image: e.target.value })}
							/>
						</VStack>
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme='green'
							mr={3}
							onClick={() => handleUpdateLaptop(laptop._id, updatedLaptop)}
						>
							Update
						</Button>
						<Button variant='ghost' onClick={onClose}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
};
export default LaptopCard