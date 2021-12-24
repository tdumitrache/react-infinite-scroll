import React from "react";
import { Flex, Link, Box, Stack, Text, Image } from "@chakra-ui/react";

const Product = ({
  brand,
  name,
  price,
  siteURL,
  imageURL,
  warehouseStock,
  isInStock
}) => {
  return (
    <Link href={siteURL} target="_blank" p="0px">
      <Flex direction="column" maxW="310px" bg="#fff" p="16px" opacity={isInStock ? "1" : "0.5"} overflow="hidden">
        <Text color="#56575A" fontWeight="bold" fontSize="md" mb="12px" >
          {brand}
        </Text>
        <Box overflow="hidden" mx="auto">

        <Image src={imageURL} mb="4px" w="250px" h="375px" _hover={{transform: "scale(1.1)", transition: "transform 2s cubic-bezier(0.25, 0.45, 0.45, 0.95)"}}/>
        </Box>
        <Text color="#56575A" fontWeight="medium" fontSize="sm" mb="8px" noOfLines={1} title={name}>
          {name}
        </Text>
        {!isInStock ? (
          <Text color="red" mb="8px">Produsul nu exista in stoc!</Text>
        ) : (
          <Stack direction="row" spacing="6px" mb="8px">
            {warehouseStock.map((stock) => (
              <Flex
                justify="center"
                align="center"
                border="1px solid #DCDAE4"
                bg="#fff"
                minW="22px"
                px="2px"
                h="22px"
              >
                <Text color="#303236" fontSize="12px">
                  {stock.size}
                </Text>
              </Flex>
            ))}
          </Stack>
        )}

        <Text color="#FF6F40" fontWeight="600">
          {price} lei
        </Text>
      </Flex>
    </Link>
  );
};

export default Product;
