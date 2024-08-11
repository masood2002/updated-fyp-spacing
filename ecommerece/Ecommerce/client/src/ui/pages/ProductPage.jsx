import { Button } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Flex, HStack, Img, Text, Icon, Select} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import ProductImg from '../assets/images/0a48d49733d61d3fa6a2ad469bc69ff3-removebg-preview-transformed.png';
import NavBar from '../components/navBar';
import Footer from '../components/Footer';

function ProductPage() {
  const toast = useToast();
  return (
    <>
      <NavBar />
      <Flex
        justify={'center'}
        h={'100vh'}
        alignItems={'center'}
        flexDir={'column'}
        my={{ base: '6rem', md: '1rem' }}
      >
        <Flex
          mx={{ base: '30px', md: '60px' }}
          justify={'center'}
          rounded={20}
          p={10}
          gap={20}
          boxShadow={'10px 10px 20px rgba(0, 0, 0, 0.1)'}
          flexWrap={'wrap'}
        >
          <Img w={{ base: '60%', md: '30%' }} src={ProductImg} />
          <Flex flexDir={'column'} justify={'center'} gap={2}>
            <Link to="/">
              <HStack>
                <Icon as={ArrowBackIcon} />
                <Text _hover={{ color: 'green' }}>Home</Text>
              </HStack>
            </Link>
            <Text
              fontWeight={'700'}
              fontSize={'40px'}
              textTransform={'uppercase'}
            >
              Product Name
            </Text>
            <Text fontWeight={'500'} fontSize={'15px'}>
              Product Description
            </Text>
            <Text fontWeight={'500'} fontSize={'25px'} color={'green'}>
              $100
            </Text>
            <Text textAlign={'left'} textTransform={'uppercase'}>
              <strong>Category: </strong> Beauty
            </Text>
            <HStack>
            <Text fontWeight={"bold"}>Size:</Text>
            <Select w={"9rem"} placeholder="Select Sizes">
              <option className='hover:bg-red-400'  value="option1">Sm</option>
              <option className='hover:bg-red-400'  value="option1">md</option>
              <option className='hover:bg-red-400'  value="option2">lg</option>
              <option className='hover:bg-red-400'  value="option3">xl</option>
              <option className='hover:bg-red-400'  value="option3">2xl</option>
            </Select>
            </HStack>
            <HStack>
            <Text fontWeight={"bold"}>Color:</Text>
            <Select w={"9rem"} placeholder="Select Colors">
              <option value="option1">Black</option>
              <option value="option1">White</option>
              <option value="option2">Pink</option>
              <option value="option3">xl</option>
              <option value="option3">2xl</option>
            </Select>
            </HStack>
            <HStack mt={4}>
              <Button
                mt={5}
                colorScheme="red"
                display={'inline'}
                onClick={() =>
                  toast({
                    title: 'Product Added to Cart',
                    description:
                      "You've successfully added the product to your cart",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                    position: 'top-right',
                    colorScheme: 'red',
                  })
                }
              >
                Add to Cart
              </Button>
              <Button
                display={'inline'}
                variant="ghost"
                mt={5}
                colorScheme="red"
              >
                Buy Now
              </Button>
            </HStack>
          </Flex>
        </Flex>
      </Flex>
      <Footer />
    </>
  );
}

export default ProductPage;
