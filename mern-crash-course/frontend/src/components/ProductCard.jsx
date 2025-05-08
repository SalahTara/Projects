import { Box, Button, Dialog, Heading, HStack, IconButton, Image, Input, Portal, Text, VStack  } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { useColorModeValue } from './ui/color-mode'
import { MdModeEditOutline } from 'react-icons/md';
import { useProductStore } from '../store/product';
import { toaster } from "../components/ui/toaster";



const ProductCard = ({product}) => {
	const [updatedProduct, setUpdatedProduct] = useState(product);
	const textcolor = useColorModeValue("gray.600, gray.200");
	const bg = useColorModeValue("white", "gray.800");
	const {deleteProduct, updateProduct} = useProductStore();
	const handleDeleteProduct = async (pid) => {
		const {success, message} = await deleteProduct(pid)
		console.log("Success: ", success);
		console.log("Message", message);
			toaster.create({
				title: success ? "Success" : "Error",
				description: message,
				type: success ? "success" : "error",
			 })

	}
	const handleUpdatedProduct = async (pid, updatedProduct) => {
		const {success, message} = await updateProduct(pid, updatedProduct)
		console.log("Success: ", success);
		console.log("Message", message)
			toaster.create({
				title: success ? "Success" : "Error",
				description: message,
				type: success ? "success" : "error",
			 })

	}
  return (
	<Box
		shadow='lg'
		rounded='lg'
		overflow='hidden'
		transition='all 0.3s'
		_hover={{ transform: "translateY(-5px)", shadow: "xl" }}
		bg={bg}
	>
		<Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />

		<Box p={4}>
			<Heading as='h3' size='md' mb={2}>
				{product.name}
			</Heading>
			<Text fontWeight='bold' fontSize='xl' color={textcolor} mb={4}>
				${product.price}
			</Text>
			<HStack spacing={2}>
			<Dialog.Root>
            <Dialog.Trigger asChild>
				<IconButton  colorPalette='blue'><MdModeEditOutline /></IconButton>
            </Dialog.Trigger>
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>Dialog Title</Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body>
				  <VStack spacing={4}>
							<Input
								placeholder='Product Name'
								name='name'
								value={updatedProduct.name}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
							/>
							<Input
								placeholder='Price'
								name='price'
								type='number'
								value={updatedProduct.price}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
							/>
							<Input
								placeholder='Image URL'
								name='image'
								value={updatedProduct.image}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
							/>
						</VStack>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
						<Button variant='ghost'>
							Cancel
						</Button>
                    </Dialog.ActionTrigger>
					<Dialog.ActionTrigger asChild>
				  <Button
							colorScheme='blue'
							mr={3}
							onClick={() => handleUpdatedProduct(product._id, updatedProduct)}
						>
							Update
						</Button>
                  </Dialog.ActionTrigger>
                  </Dialog.Footer>
				
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
					<IconButton
						onClick={() => handleDeleteProduct(product._id)}
						colorPalette='red'
					>
						<FaTrash />
					</IconButton>
			</HStack> 
		</Box>
	</Box>


  )
}

export default ProductCard