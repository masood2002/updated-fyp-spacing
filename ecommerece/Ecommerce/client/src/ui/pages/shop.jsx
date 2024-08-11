
// import {
//   Box,
//   Button,
//   Checkbox,
//   Flex,
//   Grid,
//   GridItem,
//   HStack,
//   Stack,
//   Text,
//   Radio,
//   RadioGroup,
// } from '@chakra-ui/react';
// import NavBar from '../components/navBar';
// import { Link } from 'react-router-dom';
// import Drawer from '../components/Drawer';
// import Footer from '../components/Footer';
// import PrdouctCard from '../components/card';
// import { useState, useEffect } from 'react';
// import axios from 'axios';

// function Shop() {
//   const [priceRange, setPriceRange] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [checked, setChecked] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     getAllCategories();
//     fetchProducts();
//   }, [checked, priceRange]);

//   const getAllCategories = async () => {
//     try {
//       const { data } = await axios.get('/api/v1/category/all-category');
//       if (data?.success) {
//         setCategories(data?.category);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.post('/api/v1/product/product-filters', {
//         checked,
//         priceRange,
//       });
//       setProducts(data?.products);
//       setLoading(false);
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };

//   const handlePriceChange = (value) => {
//     setPriceRange(value);
//   };

//   const handleCategoryFilter = (value, id) => {
//     let all = [...checked];
//     if (value) {
//       all.push(id);
//     } else {
//       all = all.filter((c) => c !== id);
//     }
//     setChecked(all);
//   };

//   return (
//     <>
//       <NavBar />
//       <Box>
//         <Grid templateColumns='repeat(9, 1fr)' gap={4} mt={8} mb={8}>
//           <GridItem
//             colSpan={{ base: '9', md: '4', lg: '2' }}
//             p={5}
//             border='1px solid #e8e8e8'
//             rounded={10}
//             bg='white'
//             boxShadow='md'
//             position='sticky'
//             top={0}
//             h='fit-content'
//             zIndex={10}
//           >
//             <Flex direction='column'>
//               <Flex justify='space-between' align='center' mb={4}>
//                 <Text fontWeight='600' fontSize='3xl'>Filters</Text>
//                 <Box display={{ base: 'none', md: 'none', lg: 'block' }}>
//                   <i className="fa-regular fa-sliders text-xl mt-1 cursor-pointer"></i>
//                 </Box>
//                 <Box display={{ base: 'block', md: 'block', lg: 'none' }}>
//                   <Drawer />
//                 </Box>
//               </Flex>

//               <Flex flexDir='column' gap={8}>
//                 <Text my={3} fontWeight='600' fontSize='18px'>Categories</Text>
//                 <Stack my={2}>
//                   {categories.map((c) => (
//                     <Checkbox
//                       key={c._id}
//                       onChange={(e) => handleCategoryFilter(e.target.checked, c._id)}
//                       colorScheme="red"
//                     >
//                       <Text fontWeight='400'>{c.name}</Text>
//                     </Checkbox>
//                   ))}
//                 </Stack>

//                 <Text fontWeight='600' fontSize='3xl'>Price</Text>
//                 <RadioGroup onChange={handlePriceChange} value={priceRange}>
//                   <Stack spacing={4}>
//                     <Radio value={[0, 20]}>Up to $20</Radio>
//                     <Radio value={[21, 50]}>$21 - $50</Radio>
//                     <Radio value={[51, 100]}>$51 - $100</Radio>
//                     <Radio value={[101, 200]}>$101 - $200</Radio>
//                     <Radio value={[201, Infinity]}>Above $200</Radio>
//                   </Stack>
//                 </RadioGroup>

//                 <Button mt={6} colorScheme="red" onClick={fetchProducts}>
//                   Apply Filters
//                 </Button>
//               </Flex>
//             </Flex>
//           </GridItem>

//           <GridItem p={12} colSpan={{ base: '9', md: '5', lg: '7' }}>
//             <Box>
//               <Text mb={4} fontWeight='700' fontSize='3xl'>Top Trending</Text>
//             </Box>
//             <Flex gap={10} flexWrap='wrap'>
//               {loading ? (
//                 <Text>Loading...</Text>
//               ) : (
//                 products.map((p) => <PrdouctCard key={p._id} product={p} />)
//               )}
//             </Flex>
//           </GridItem>
//         </Grid>
//         <Footer />
//       </Box>
//     </>
//   );
// }

// export default Shop;
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Grid,
  GridItem,
  HStack,
  Stack,
  Text,
  Radio,
  RadioGroup,
} from '@chakra-ui/react';
import NavBar from '../components/navBar';
import { Link } from 'react-router-dom';
import Drawer from '../components/Drawer';
import Footer from '../components/Footer';
import ProductCard from '../components/card'; // Updated component import
import { useState, useEffect } from 'react';
import axios from 'axios';

function Shop() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [priceRange, setPriceRange] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllCategories();
    getTotalProducts();
    fetchProducts();
  }, [checked, priceRange, page]);

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get('/api/v1/category/all-category');
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalProducts = async () => {
    try {
      const { data } = await axios.get('/api/v1/product/product-count');
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const requestBody = {
        checked,
        radio: priceRange, // Ensure this matches the expected format
        page,
      };
      // console.log('Request Body:', requestBody); // Add this line to debug
      const { data } = await axios.post('/api/v1/product/product-filters', requestBody);
      console.log(data);
      setProducts(data?.products);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  
  const handleCategoryFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  const handlePriceChange = (value) => {
    // Ensure value is an array with default values if needed
    setPriceRange(Array.isArray(value) ? value : [0, Infinity]);
  };
  

  return (
    <>
      <NavBar />
      <Box>
        <Grid templateColumns='repeat(9, 1fr)' gap={4} mt={8} mb={8}>
          <GridItem
            colSpan={{ base: '9', md: '4', lg: '2' }}
            p={5}
            border='1px solid #e8e8e8'
            rounded={10}
            bg='white'
            boxShadow='md'
            position='sticky'
            top={0}
            h='fit-content'
            zIndex={10}
          >
            <Flex direction='column'>
              <Flex justify='space-between' align='center' mb={4}>
                <Text fontWeight='600' fontSize='3xl'>Filters</Text>
                <Box display={{ base: 'none', md: 'none', lg: 'block' }}>
                  <i className="fa-regular fa-sliders text-xl mt-1 cursor-pointer"></i>
                </Box>
                <Box display={{ base: 'block', md: 'block', lg: 'none' }}>
                  <Drawer />
                </Box>
              </Flex>

              <Flex flexDir='column' gap={8}>
                <Text my={3} fontWeight='600' fontSize='18px'>Categories</Text>
                <Stack my={2}>
                  {categories.map((c) => (
                    <Checkbox
                      key={c._id}
                      onChange={(e) => handleCategoryFilter(e.target.checked, c._id)}
                      colorScheme="red"
                    >
                      <Text fontWeight='400'>{c.name}</Text>
                    </Checkbox>
                  ))}
                </Stack>

                <Text fontWeight='600' fontSize='3xl'>Price</Text>
                <RadioGroup onChange={handlePriceChange} value={priceRange}>
                  <Stack spacing={4}>
                    <Radio value={[0, 20]}>Up to $20</Radio>
                    <Radio value={[21, 50]}>$21 - $50</Radio>
                    <Radio value={[51, 100]}>$51 - $100</Radio>
                    <Radio value={[101, 200]}>$101 - $200</Radio>
                    <Radio value={[201, Infinity]}>Above $200</Radio>
                  </Stack>
                </RadioGroup>

                <Button mt={6} colorScheme="red" onClick={fetchProducts}>
                  Apply Filters
                </Button>
              </Flex>
            </Flex>
          </GridItem>

          <GridItem p={12} colSpan={{ base: '9', md: '5', lg: '7' }}>
            <Box>
              <Text mb={4} fontWeight='700' fontSize='3xl'>Top Trending</Text>
            </Box>
            <Flex gap={10} flexWrap='wrap'>
              {loading ? (
                <Text>Loading...</Text>
              ) : (
                products.map((p) => <ProductCard key={p._id} product={p} />) // Updated component usage
              )}
            </Flex>
            <Flex justify='center' mt={4}>
              {products.length < total && (
                <Button
                  colorScheme='yellow'
                  onClick={() => setPage(page + 1)}
                >
                  {loading ? 'Loading...' : 'Load More'}
                </Button>
              )}
            </Flex>
          </GridItem>
        </Grid>
        <Footer />
      </Box>
    </>
  );
}

export default Shop;
