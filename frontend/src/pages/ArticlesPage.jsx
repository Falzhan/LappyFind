import { 
  Box, 
  Image, 
  Text, 
  Link, 
  VStack, 
  HStack, 
  Flex, 
  Heading, 
  useColorModeValue, 
  Collapse, 
  Button 
} from "@chakra-ui/react";
import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

const articlesGroup1 = [
  {
    title: "Should you Buy an AMD Ryzen or Intel Laptop?",
    subtitle: "When it comes to buying a new laptop, one of the key decisions you need to make is choosing between AMD Ryzen and Intel processors. Both AMD and Intel have been competing fiercely in the laptop market, with each offering their own set of advantages and features. In this article, we will delve into the latest product information to demystify the letters and numbers associated with these processors and help you make an informed decision.... ",
    image: "https://i.ytimg.com/vi/nouIMbgsvAU/maxresdefault.jpg",
    link: "https://www.hardsoftcomputers.co.uk/blog/leasing/should-you-buy-an-amd-ryzen-or-intel-laptop/"
  },
  {
    title: "Intel processors explained: What is Core i3, i5, i7, Ultra and Pentium?",
    subtitle: "The most confusing part of buying a computer is the array of CPUs (also known as processors). Which? explains what you need to know about Intel processors. The most common brand of processor in laptops you can buy is Intel. However, Intel's myriad of marketing names for its various processors can make comparisons extremely tricky... ",
    image: "https://media.product.which.co.uk/prod/images/ar_2to1_900x450/24aac61ea445-shutterstock2347088611.webp",
    link: "https://www.which.co.uk/reviews/laptops/article/intel-processors-explained-what-is-core-i3-i5-i7-and-pentium-av6235O66IQP"
  },
  {
    title: "Understand How AMD Name Their Mobile CPU",
    subtitle: "Hi, today we gonna talk about how AMD names their mobile CPU. From this year AMD will apply the new naming scheme for their mobile CPU and it will be extremely helpful when considering an AMD laptop if you fully understand how AMD name their mobile CPU. Like on paper it’s really not that easy to tell the performance difference between 7640U & 7630U. So let’s dive in...",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQic8MNp2prL1ewyGAwaEjWmOYcZ5IYbdMXdg&s",
    link: "https://www.msi.com/blog/understand-how-amd-name-their-mobile-cpu"
  }
];

const articlesGroup2 = [
  {
    title: "Discrete VS Integrated Laptop GPU: Which one to choose?",
    subtitle: "If you’re reading this, there is a good chance you’re in the market for a new laptop. And maybe while doing research and checking laptop specs, you came across terms like “discrete graphics”, “dedicated GPU”, “integrated GPU” … and you started wondering what exactly the difference is and which one is suitable for your needs. This article aims to explain the two variants and provide some pointers on how to choose the one that best fits your needs...",
    image: "https://i.redd.it/7jtrn601ezo91.jpg",
    link: "https://www.asus.com/content/discrete-vs-integrated-laptop-gpu-which-one-to-choose/"
  },
  {
    title: "AMD Radeon iGPU vs. Intel Iris Xe: What's the Best Integrated Graphics?",
    subtitle: "If you're buying a budget laptop or desktop PC, a discrete GPU probably isn't in your plan. But that doesn't mean you should settle for any CPU with an integrated GPU. And with AMD and Intel integrating GPUs that feature tech used in their more powerful discrete GPU products, you might not even need a separate video card. So, which processor should you get if you don't want to spend on a discrete graphics card but still want to play some games?...",
    image: "https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2023/05/intel-iris-xe-vs-amd-radeon-graphics.jpg?q=70&fit=crop&w=1140&h=&dpr=1",
    link: "https://www.makeuseof.com/amd-radeon-igpu-vs-intel-iris-xe/"
  },
  {
    title: "Everything About NVIDIA’s GPU Naming Scheme: RTX, GTX, GT",
    subtitle: "It’s no secret that Nvidia is the go-to GPU brand for many users, thanks in part to their gaming experience and reliability. However, for a non-tech-savvy user, differentiating between the GPU tiers could be difficult, as the company has changed its naming scheme in the last few years. As a result, here is everything you need to know about Nvidia’s GPU naming scheme...",
    image: "https://fossbytes.com/wp-content/uploads/2022/09/Nvidia-rtx-4080-vs-3080-Ti-vs-3080.jpg",
    link: "https://fossbytes.com/nvidia-gpu-naming-scheme/"
  }
];

const articlesGroup3 = [
  {
    title: "How Much RAM Do I Need for My Laptop? A Complete Guide",
    subtitle: "In the world of computing, computer memory, particularly RAM (Random Access Memory), plays a crucial role in determining your laptop’s performance. But how much RAM do you really need? Is 16GB of RAM good? Can you have too much RAM? These are common questions that many users grapple with when choosing a new laptop or considering an upgrade. In this comprehensive guide, we’ll demystify RAM, explore how much you need for different tasks, and help you make an informed decision about the right amount of RAM for your laptop...",
    image: "https://www.electronicsbazaar.com/pub/media/magefan_blog/ram.png",
    link: "https://www.hp.com/us-en/shop/tech-takes/how-much-ram-do-i-need-in-laptop"
  },
  {
    title: "Choosing The Perfect Laptop Storage Capacity: A Guide",
    subtitle: "When you’re looking for the right laptop, you may be wondering, ‘How much storage do I actually need on my laptop? Storage refers to how much your computer can hold, including apps, files, pictures, and videos. The more storage you have, the more things your computer can keep, and it can find them quicker when you want them. However, having a lot of space may cost you a lot of money; therefore, check on your needs and the amount you are willing to spend on it...",
    image: "https://www.qilingtech.com/img/is-c-drive-ssd/ssd-and-hdd.png",
    link: "https://pcviewed.com/how-much-storage-do-you-need-on-laptop/"
  }
];

// Sources data
const sources = [
  {
    title: "r/laptops",
    image: "https://www.iconpacks.net/icons/2/free-reddit-logo-icon-2436-thumb.png",
    link: "https://www.reddit.com/r/laptops/"
  },
  {
    title: "r/GamingLaptops",
    image: "https://www.iconpacks.net/icons/2/free-reddit-logo-icon-2436-thumb.png",
    link: "https://www.reddit.com/r/GamingLaptops/"
  },
  {
    title: "r/SuggestALaptop",
    image: "https://www.iconpacks.net/icons/2/free-reddit-logo-icon-2436-thumb.png",
    link: "https://www.reddit.com/r/SuggestALaptop/"
  },
  {
    title: "laptop-forums",
    image: "https://i1.feedspot.com/200/5191298.jpg?t=1598883512",
    link: "https://www.laptop-forums.com/"
  }
];

const ArticlesPage = () => {
  const bgColor = useColorModeValue("white", "gray.800"); // Dynamic background
  const textColor = useColorModeValue("gray.800", "white"); // Dynamic text color
  const borderColor = useColorModeValue("gray.300", "gray.600"); // Border adapts to mode

  // State for collapsible sections
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);

  return (
    <Box position="relative" p={10}>
      <Flex gap={6} alignItems="flex-start">
        
        {/* Left Side Box (Articles) */}
        <Box
          p={10}
          borderWidth={1}
          borderRadius="md"
          boxShadow="md"
          flex="1"
          maxW="calc(100% - 380px)"
          bg={bgColor}
          borderColor={borderColor}
        >
          <Heading size="xl" mb={4} color={textColor}>Articles</Heading>

          {/* Main Articles 1 Section */}
          <Box w="full">
            <Button 
              onClick={() => setIsOpen1(!isOpen1)} 
              w="full" 
              justifyContent="space-between"
              display="flex"
              alignItems="center"
              fontSize="xl"
              fontWeight="bold"
              color="black.500"
              borderBottom="1px solid"
              borderColor={borderColor}
              py={2}
            >
              About CPUs
              {isOpen1 ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </Button>

            <Collapse in={isOpen1} animateOpacity>
              <VStack align="start" spacing={5} w="full" mt={3}>
                {articlesGroup1.map((article, index) => (
                  <HStack key={index} w="full" p={3} borderWidth={1} borderRadius="md" boxShadow="sm" borderColor={borderColor}>
                    <Image src={article.image} w="270px" h="200px" borderRadius="md" objectFit="cover"/>
                    <Box>
                      <Link href={article.link} isExternal fontSize="xl" fontWeight="bold" color="teal.400">
                        {article.title}
                      </Link>
                      <Text fontSize="md" color={textColor}>
                        {article.subtitle}
                      </Text>
                    </Box>
                  </HStack>
                ))}
              </VStack>
            </Collapse>
          </Box>

          {/* Main Articles 2 Section */}
          <Box w="full" mt={5}>
            <Button 
              onClick={() => setIsOpen2(!isOpen2)} 
              w="full" 
              justifyContent="space-between"
              display="flex"
              alignItems="center"
              fontSize="xl"
              fontWeight="bold"
              color="black.500"
              borderBottom="1px solid"
              borderColor={borderColor}
              py={2}
            >
              About GPUs
              {isOpen2 ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </Button>

            <Collapse in={isOpen2} animateOpacity>
              <VStack align="start" spacing={5} w="full" mt={3}>
                {articlesGroup2.map((article, index) => (
                  <HStack key={index} w="full" p={3} borderWidth={1} borderRadius="md" boxShadow="sm" borderColor={borderColor}>
                    <Image src={article.image} w="270px" h="200px" borderRadius="md" objectFit="cover"/>
                    <Box>
                      <Link href={article.link} isExternal fontSize="xl" fontWeight="bold" color="teal.400">
                        {article.title}
                      </Link>
                      <Text fontSize="md" color={textColor}>
                        {article.subtitle}
                      </Text>
                    </Box>
                  </HStack>
                ))}
              </VStack>
            </Collapse>
          </Box>

          {/* Main Articles 3 Section */}
          <Box w="full" mt={5}>
            <Button 
              onClick={() => setIsOpen3(!isOpen3)} 
              w="full" 
              justifyContent="space-between"
              display="flex"
              alignItems="center"
              fontSize="xl"
              fontWeight="bold"
              color="black.500"
              borderBottom="1px solid"
              borderColor={borderColor}
              py={2}
            >
              About Memory & Storage
              {isOpen3 ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </Button>

            <Collapse in={isOpen3} animateOpacity>
              <VStack align="start" spacing={5} w="full" mt={3}>
                {articlesGroup3.map((article, index) => (
                  <HStack key={index} w="full" p={3} borderWidth={1} borderRadius="md" boxShadow="sm" borderColor={borderColor}>
                    <Image src={article.image} w="270px" h="200px" borderRadius="md" objectFit="cover"/>
                    <Box>
                      <Link href={article.link} isExternal fontSize="xl" fontWeight="bold" color="teal.400">
                        {article.title}
                      </Link>
                      <Text fontSize="md" color={textColor}>
                        {article.subtitle}
                      </Text>
                    </Box>
                  </HStack>
                ))}
              </VStack>
            </Collapse>
          </Box>
        </Box>

        {/* Top Right Box (Sources) */}
        <Box
          p={5}
          borderWidth={1}
          borderRadius="md"
          boxShadow="lg"
          w="320px"
          position={{ base: "relative", lg: "absolute" }}
          right={10}
          top={10}
          bg={bgColor}
          borderColor={borderColor}
        >
          <Heading size="md" mb={4} color={textColor}>More Sources</Heading>
          <VStack align="start" spacing={4}>
            {sources.map((source, index) => (
              <HStack key={index} w="full">
                <Box>
                  <Link href={source.link} isExternal fontSize="sm" fontWeight="bold" color="teal.400">
                    {source.title}
                  </Link>
                </Box>
                <Image src={source.image} boxSize="50px" borderRadius="md" />
              </HStack>
            ))}
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default ArticlesPage;
