import React, { useEffect, useState } from "react";

// Chakra components
import {
  Container,
  Grid,
  Select,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  RadioGroup,
  Radio,
  Stack,
  Flex,
  Text,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

import Product from "../components/Product";

// fetching the data from the API
export async function getServerSideProps() {
  const res = await fetch("https://www.theoutfit.ro/test-react/");
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

const Products = ({ data }) => {
  const [products, setProducts] = useState([]);   
  const [defaultProducts, setDefaultProducts] = useState([]);   // the state for filtering behaviour
  const [activeFilter, setActiveFilter] = useState({
    brand: "",
    category: "",
    size: "",
    price: 0,
  });
  const [productsToShow, setProductsToShow] = useState(16);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setProducts(data.filter((_, index) => index < productsToShow));
    setDefaultProducts(data.filter((_, index) => index < productsToShow));
  }, [productsToShow]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])

  const handleFilterClick = () => {
    const filteredProducts = defaultProducts.filter(
      (product) =>
        product.brand.toLowerCase() === activeFilter.brand.toLowerCase() &&
        activeFilter.category.includes(product.category) &&
        product.warehouseStock.find((el) => el.size === activeFilter.size) &&
        Number(product.price) <= Number(activeFilter.price)
    );
    setProducts(filteredProducts);
  };

  const handleScroll = () => {
    if (products.length === data.length) {
      return;
    } else if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      setProductsToShow(productsToShow => productsToShow + 16)
    }
  };

  return (
    <Container
      maxWidth="1440px"
      mx="auto"
      mb="100px"
      display="flex"
      justify="center"
      flexDirection="column"
    >
      <Button colorScheme="teal" onClick={onOpen} mx="auto" my="28px">
        Filtreaza produsele!
      </Button>
      <Drawer isOpen={isOpen} placement="top" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filtreaza!</DrawerHeader>

          <DrawerBody>
            <Grid templateColumns="repeat(4, 1fr)" maxW="800px" mx="auto">
              <Flex direction="column">
                <Text fontSize="sm" color="#333" fontWeight="bold" mb="24px">
                  Brand
                </Text>
                <RadioGroup
                  onChange={(val) =>
                    setActiveFilter({ ...activeFilter, brand: val })
                  }
                >
                  <Stack direction="column" spacing="8px">
                    <Radio value="Viada">Viada</Radio>
                    <Radio value="Amilla">Amilla</Radio>
                    <Radio value="Saint Tropez">Saint Tropez</Radio>
                    <Radio value="Kaffe Curve">Kaffe Curve</Radio>
                    <Radio value="Alina Cernatescu">Alina Cernatescu</Radio>
                    <Radio value="Fransa">Fransa</Radio>
                    <Radio value="ICHI">ICHI</Radio>
                    <Radio value="Z-ONE">Z-ONE</Radio>
                    <Radio value="Hermosa">Hermosa</Radio>
                  </Stack>
                </RadioGroup>
              </Flex>
              <Flex direction="column">
                <Text fontSize="sm" color="#333" fontWeight="bold" mb="24px">
                  Categorie
                </Text>
                <RadioGroup
                  onChange={(val) =>
                    setActiveFilter({ ...activeFilter, category: val })
                  }
                >
                  <Stack direction="column" spacing="8px">
                    <Radio value="Pantaloni">Pantaloni</Radio>
                    <Radio value="Geanta">Geanta cross-body</Radio>
                    <Radio value="Rochie">Rochie</Radio>
                    <Radio value="Camasa">Camasa</Radio>
                    <Radio value="Bluza">Bluza</Radio>
                    <Radio value="Cardigan">Cardigan</Radio>
                    <Radio value="Sacou">Sacou</Radio>
                  </Stack>
                </RadioGroup>
              </Flex>
              <Flex direction="column">
                <Text fontSize="sm" color="#333" fontWeight="bold" mb="24px">
                  Mărime
                </Text>
                <Select
                  placeholder="S"
                  maxW="75px"
                  cursor="pointer"
                  onChange={(e) =>
                    setActiveFilter({ ...activeFilter, size: e.target.value })
                  }
                >
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XXL">XXL</option>
                  <option value="40">40</option>
                  <option value="42">42</option>
                  <option value="44">44</option>
                  <option value="46">46</option>
                  <option value="48">48</option>
                  <option value="50">50</option>
                  <option value="52">52</option>
                  <option value="54">54</option>
                  <option value="56">56</option>
                </Select>
              </Flex>
              <Flex direction="column">
                <Text fontSize="sm" color="#333" fontWeight="bold" mb="24px">
                  Preț
                </Text>
                <RadioGroup
                  onChange={(val) =>
                    setActiveFilter({ ...activeFilter, price: Number(val) })
                  }
                >
                  <Stack direction="column" spacing="8px">
                    <Radio value="100">Până la 100 RON</Radio>
                    <Radio value="250">Până la 250 RON</Radio>
                    <Radio value="350">Până la 350 RON</Radio>
                    <Radio value="450">Până la 450 RON</Radio>
                    <Radio value="550">Până la 550 RON</Radio>
                  </Stack>
                </RadioGroup>
              </Flex>
            </Grid>
          </DrawerBody>

          <DrawerFooter>
            <Button colorScheme="blue" onClick={handleFilterClick}>
              VIZUALIZARE REZULTATE
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Grid templateColumns={{sm: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)", xl: "repeat(4, 1fr)"}} gap="12px" >
        {products.map(product => {
          return (
            <Product
              brand={product.brand}
              category={product.category}
              name={product.name}
              price={product.price}
              siteURL={product.siteURL}
              imageURL={product.imageURL}
              warehouseStock={product.warehouseStock}
              isInStock={product.warehouseStock.length !== 0}
              key={product.productId}
            />
          );
        })}
      </Grid>
    </Container>
  );
};

export default Products;
