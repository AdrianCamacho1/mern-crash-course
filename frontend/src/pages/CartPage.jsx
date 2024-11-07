import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import UserProductCard from '../components/UserProductCard';
import { AddIcon, MinusIcon, Container, SimpleGrid, Text, VStack } from '@chakra-ui/icons';

const CartPage = () => {

    const { fetchProducts, products } = useProductStore();

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);
	console.log("products", products);

  return (
    <Container >
        <VStack spacing={8}>
            
        </VStack>
    </Container>
  )
}

export default CartPage
