'use client'

import { useUpdateProduct } from '@/hooks/useProducts'
import { EditProductValidationSchema } from '@/lib/validations'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { Button } from '@mui/material'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'

const EditProductForm = ({ product }) => {
	const { data: session } = useSession()
	const editProduct = useUpdateProduct()
	const router = useRouter()

	const initialValues = {
		name: product.name || '',
		category: product.category || '',
		sub_category: product.sub_category || '', // Added sub_category
		brand: product.brand || '', // Added brand
		image: '', // Empty initially, allowing users to change the image if they want to
		description: product.description || '',
		price: product.price || '',
		offer_price: product.offer_price || '',
		stock: Array.isArray(product.stock) ? product.stock : [], // Ensure stock is always an array
		best_selling: product.best_selling || false, // Added best_selling
		new_arrival: product.new_arrival || false, // Added new_arrival
	}

	const handleSubmit = async (values, { setSubmitting, resetForm }) => {
		const formData = new FormData()

		// Ensure stock is always an array
		const stock = Array.isArray(values.stock) ? values.stock : []
		console.log('Stock: ', stock)

		// Defensive check
		if (!Array.isArray(values.stock)) {
			console.error('Stock is undefined or not an array', values.stock)
			return // Stop execution if stock is invalid
		}

		if (Array.isArray(values.stock)) {
			values.stock.forEach((stock, index) => {
				formData.append(`stock[${index}].size`, stock.size)
				formData.append(`stock[${index}].quantity`, stock.quantity)
			})
		}

		// Append all fields to the form data
		Object.keys(values).forEach((key) => {
			if (key === 'image' && values.image) {
				formData.append('image', values.image)
			} else if (key !== 'stock') {
				formData.append(key, values[key])
			}
		})

		try {
			console.log('Sending request with:', values)
			await editProduct.mutateAsync({ id: product._id, data: values })
			enqueueSnackbar('Product updated successfully!', { variant: 'success' })
			setTimeout(() => router.push('/products'), 2000)
		} catch (error) {
			console.error('API Request Error:', error.response?.data || error.message)
			enqueueSnackbar(error?.message || 'Failed to update product', {
				variant: 'error',
			})
		}
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={EditProductValidationSchema}
			onSubmit={handleSubmit}
		>
			{({ setFieldValue, values }) => (
				<Form className='max-w-xl mx-auto space-y-6 bg-white p-8 rounded-xl shadow-lg'>
					<h1 className='font-bold text-[#1F1F1F] text-3xl text-center mb-4'>
						Edit Product
					</h1>

					{/* Product Name Field */}
					<div className='space-y-1'>
						<label className='block text-lg font-medium text-[#1F1F1F] mb-2'>
							Product Name
						</label>
						<Field
							type='text'
							name='name'
							autoComplete='off'
							className='w-full px-4 py-3 border border-gray-300 rounded-lg'
						/>
						<ErrorMessage
							name='name'
							component='div'
							className='text-red-600 text-sm mt-1'
						/>
					</div>

					{/* Category Field */}
					<div className='space-y-1'>
						<label className='block text-lg font-medium text-[#1F1F1F] mb-2'>
							Product Category
						</label>
						<Field
							type='text'
							name='category'
							autoComplete='off'
							className='w-full px-4 py-3 border border-gray-300 rounded-lg'
						/>
						<ErrorMessage
							name='category'
							component='div'
							className='text-red-600 text-sm mt-1'
						/>
					</div>

					{/* Sub Category Field */}
					<div className='space-y-1'>
						<label className='block text-lg font-medium text-[#1F1F1F] mb-2'>
							Product Type
						</label>
						<Field
							type='text'
							name='sub_category'
							autoComplete='off'
							className='w-full px-4 py-3 border border-gray-300 rounded-lg'
						/>
						<ErrorMessage
							name='sub_category'
							component='div'
							className='text-red-600 text-sm mt-1'
						/>
					</div>

					{/* Brand Field */}
					<div className='space-y-1'>
						<label className='block text-lg font-medium text-[#1F1F1F] mb-2'>
							Brand Name
						</label>
						<Field
							type='text'
							name='brand'
							autoComplete='off'
							className='w-full px-4 py-3 border border-gray-300 rounded-lg'
						/>
						<ErrorMessage
							name='brand'
							component='div'
							className='text-red-600 text-sm mt-1'
						/>
					</div>

					{/* Description Field */}
					<div className='space-y-1'>
						<label className='block text-lg font-medium text-[#1F1F1F] mb-2'>
							Product Description
						</label>
						<Field
							as='textarea'
							name='description'
							className='w-full px-4 py-3 border border-gray-300 rounded-lg resize-none'
						/>
						<ErrorMessage
							name='description'
							component='div'
							className='text-red-600 text-sm mt-1'
						/>
					</div>

					{/* Best Selling Field */}
					<div className='space-y-1'>
						<label className='block text-lg font-medium text-[#1F1F1F] mb-2'>
							Best Selling Product?
						</label>
						<Field
							type='checkbox'
							name='best_selling'
							className='mr-2 leading-tight'
							onChange={(e) => {
								setFieldValue('best_selling', e.target.checked)
							}}
							checked={values.best_selling} // Ensure checkbox is checked based on form value
						/>
						<span className='text-sm'>Mark as best selling</span>
					</div>

					{/* New Arrival Field */}
					<div className='space-y-1'>
						<label className='block text-lg font-medium text-[#1F1F1F] mb-2'>
							New Arrival Product?
						</label>
						<Field
							type='checkbox'
							name='new_arrival'
							className='mr-2 leading-tight'
							onChange={(e) => {
								setFieldValue('new_arrival', e.target.checked)
							}}
							checked={values.new_arrival} // Ensure checkbox is checked based on form value
						/>
						<span className='text-sm'>Mark as new arrival</span>
					</div>

					{/* Image Upload Field */}
					<div className='space-y-1'>
						<label className='block text-lg font-medium text-[#1F1F1F] mb-2'>
							Product Image
						</label>
						<div className='relative'>
							<input
								type='file'
								name='image'
								accept='image/*'
								onChange={(e) => {
									const file = e.target.files[0]
									setFieldValue('image', file)
								}}
								className='w-full px-4 py-3 border border-gray-300 rounded-lg'
							/>
							{/* Display the file name if selected */}
							{values.image && (
								<div className='absolute top-0 right-0 text-sm text-gray-700 mt-3 mr-3'>
									{values.image.name}
								</div>
							)}
						</div>
						<ErrorMessage
							name='image'
							component='div'
							className='text-red-600 text-sm mt-1'
						/>
					</div>

					{/* Price Field */}
					<div className='space-y-1'>
						<label className='block text-lg font-medium text-[#1F1F1F] mb-2'>
							Product Price
						</label>
						<Field
							type='number'
							name='price'
							className='w-full px-4 py-3 border border-gray-300 rounded-lg'
						/>
						<ErrorMessage
							name='price'
							component='div'
							className='text-red-600 text-sm mt-1'
						/>
					</div>

					{/* Offer Price Field */}
					<div className='space-y-1'>
						<label className='block text-lg font-medium text-[#1F1F1F] mb-2'>
							Product Offer Price
						</label>
						<Field
							type='number'
							name='offer_price'
							className='w-full px-4 py-3 border border-gray-300 rounded-lg'
						/>
						<ErrorMessage
							name='offer_price'
							component='div'
							className='text-red-600 text-sm mt-1'
						/>
					</div>

					{/* Stock Field */}
					<div className='space-y-1'>
						<label className='block text-lg font-medium text-[#1F1F1F] mb-2'>
							Product Stock
						</label>
						{values.stock.map((stock, index) => (
							<div
								key={index}
								className='flex items-center space-x-2'
							>
								<Field
									type='text'
									name={`stock[${index}].size`}
									placeholder='Size'
									className='w-1/2 px-4 py-3 border border-gray-300 rounded-lg'
								/>
								<Field
									type='number'
									name={`stock[${index}].quantity`}
									placeholder='Quantity'
									className='w-1/2 px-4 py-3 border border-gray-300 rounded-lg'
								/>
								<button
									type='button'
									onClick={() =>
										setFieldValue(
											'stock',
											values.stock.filter((_, i) => i !== index),
										)
									}
									className='text-red-600 font-semibold cursor-pointer'
								>
									&times;
								</button>
							</div>
						))}

						<Button
							type='button'
							variant='contained'
							color='default'
							startIcon={<AddRoundedIcon />}
							onClick={() =>
								setFieldValue('stock', [
									...values.stock,
									{ size: '', quantity: '' },
								])
							}
							sx={{
								backgroundColor: '#1F1F1F',
								color: '#FFFFFF',
								'&:hover': {
									backgroundColor: '#333333',
								},
							}}
						>
							Add Stock
						</Button>
					</div>

					{/* Submit Button */}
					<button
						type='submit'
						className='w-full py-3 border-1 border-gray-300 text-[#1F1F1F] text-lg font-semibold rounded-lg hover:bg-gray-100 flex items-center justify-center gap-2 cursor-pointer'
					>
						Update Product
					</button>
				</Form>
			)}
		</Formik>
	)
}

export default EditProductForm
