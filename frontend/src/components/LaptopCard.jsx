import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Link,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
import { useLaptopStore } from "../catalog/laptop";
import { useAuthStore } from "../catalog/auth";
import { useState } from "react";

const LaptopCard = ({ laptop }) => {
  const [updatedLaptop, setUpdatedLaptop] = useState({ ...laptop });
  const { user } = useAuthStore();
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "teal.600");

  const { deleteLaptop, updateLaptop, upvoteLaptop, downvoteLaptop } = useLaptopStore();
  const toast = useToast();

  // Separate disclosure hooks for each modal
  const { isOpen: isMainOpen, onOpen: onMainOpen, onClose: onMainClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

  const handleDeleteLaptop = async () => {
    const { success, message } = await deleteLaptop(laptop._id);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onDeleteClose();
    }
  };

  const handleUpdateLaptop = async () => {
    const { success, message } = await updateLaptop(laptop._id, updatedLaptop);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onEditClose();
    }
  };

  const handleUpvote = async () => {
    const { success, message } = await upvoteLaptop(laptop._id);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDownvote = async () => {
    const { success, message } = await downvoteLaptop(laptop._id);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const isUploader = user?.username === laptop.uploader || user?.email === laptop.uploader;

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image src={laptop.image} alt={laptop.name} h={48} w="full" objectFit="cover" />

      <Box p={4}>
        <Heading
          as="h3"
          size="md"
          mb={2}
          onClick={onMainOpen} // Opens the main modal only
          cursor="pointer"
        >
          {laptop.name} - {laptop.specs}
        </Heading>

        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          ₱{laptop.price}
        </Text>

        <HStack spacing={2} justify="space-between">
          <HStack spacing={1}>
            <IconButton
              icon={<ArrowUpIcon />}
              colorScheme="green"
              onClick={(e) => {
                e.stopPropagation();
                handleUpvote();
              }}
              isDisabled={!user}
              aria-label="Upvote"
            />
            <Text>{laptop.upvotes}</Text>

            <IconButton
              icon={<ArrowDownIcon />}
              colorScheme="red"
              onClick={(e) => {
                e.stopPropagation();
                handleDownvote();
              }}
              isDisabled={!user}
              aria-label="Downvote"
            />
            <Text>{laptop.downvotes}</Text>
          </HStack>

          <Text fontSize="sm" color={textColor} fontStyle="italic">
            Sourced from:
            <Link href={laptop.source} isExternal color="white.500">
              {" "}
              {laptop.uploader}{" "}
            </Link>
          </Text>
        </HStack>

        {isUploader && (
          <HStack spacing={2} mt={4}>
            <IconButton
              icon={<EditIcon />}
              onClick={(e) => {
                e.stopPropagation();
                onEditOpen(); // Opens only the edit modal
              }}
              colorScheme="green"
            />
            <IconButton
              icon={<DeleteIcon />}
              onClick={(e) => {
                e.stopPropagation();
                onDeleteOpen(); // Opens only the delete modal
              }}
              colorScheme="red"
            />
          </HStack>
        )}
      </Box>

      {/* Main Modal */}
      <Modal isOpen={isMainOpen} onClose={onMainClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Laptop Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Text>
                <b>Name:</b> {laptop.name}
              </Text>
              <Text>
                <b>Specs:</b> {laptop.specs}
              </Text>
              <Text>
                <b>Price:</b> ₱{laptop.price}
              </Text>
              <Text>
                <b>Sourced from:</b> {laptop.uploader}
              </Text>
              <Text>
                <b>Store:</b> <Link href={laptop.source} isExternal color="white.500">
                  {laptop.source}
              </Link>
              </Text>

              <Image src={laptop.image} alt={laptop.name} />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onMainClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={isEditOpen} onClose={onEditClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Laptop</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Name"
                value={updatedLaptop.name}
                onChange={(e) => setUpdatedLaptop({ ...updatedLaptop, name: e.target.value })}
              />
              <Input
                placeholder="Specs"
                value={updatedLaptop.specs}
                onChange={(e) => setUpdatedLaptop({ ...updatedLaptop, specs: e.target.value })}
              />
              <Input
                placeholder="Price"
                value={updatedLaptop.price}
                onChange={(e) => setUpdatedLaptop({ ...updatedLaptop, price: e.target.value })}
              />
              <Input
                placeholder="Image URL"
                value={updatedLaptop.image}
                onChange={(e) => setUpdatedLaptop({ ...updatedLaptop, image: e.target.value })}
              />
              <Input
                placeholder="Source URL"
                value={updatedLaptop.source} 
                onChange={(e) => setUpdatedLaptop({ ...updatedLaptop, source: e.target.value })}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleUpdateLaptop}>
              Save Changes
            </Button>
            <Button variant="ghost" onClick={onEditClose} ml={3}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete <b>{laptop.name}</b>?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={handleDeleteLaptop}>
              Delete
            </Button>
            <Button variant="ghost" onClick={onDeleteClose} ml={3}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default LaptopCard;
