'use client'

import { useCreateProduct } from '@/hooks/useProducts'
import { AddProductValidationSchema } from '@/lib/validations'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { Button } from '@mui/material'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'

const AddProductForm = () => {
	const { data: session } = useSession()
	const createProduct = useCreateProduct()
	const router = useRouter()

	const initialValues = {
		name: '',
		category: '',
		price: '',
		description: '',
		offer_price: '',
		image: '',
		stock: [],
		sub_category: '',
		brand: '',
		best_selling: false,
		new_arrival: false,
	}

	const handleSubmit = async (values, { setSubmitting, resetForm }) => {
		try {
			const formData = new FormData()

			Object.keys(values).forEach((key) => {
				if (key === 'image') {
					formData.append('image', values.image)
				} else {
					formData.append(key, values[key])
				}
			})

			values.stock.forEach((stock, index) => {
				formData.append(`stock[${index}].size`, stock.size)
				formData.append(`stock[${index}].quantity`, stock.quantity)
			})

			console.log('Form data: ', values)

			await createProduct.mutateAsync(formData)
			enqueueSnackbar('Product added successfully!', { variant: 'success' })
			resetForm()
			setTimeout(() => router.push('/products'), 2000)
		} catch (error) {
			enqueueSnackbar(error?.message, { variant: 'error' })
		} finally {
			setSubmitting(false)
		}
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={AddProductValidationSchema}
			onSubmit={handleSubmit}
		>
			{({ setFieldValue, values }) => (
				<Form className='max-w-xl mx-auto space-y-6 bg-white p-8 rounded-xl shadow-lg'>
					<h1 className='font-bold text-[#1F1F1F] text-3xl text-center mb-4'>
						Add New Product
					</h1>

					<div className='space-y-1'>
						<label className='block text-lg font-medium text-[#1F1F1F] mb-2'>
							Product Name
						</label>
						<Field
							type='text'
							name='name'
							className='w-full px-4 py-3 border border-gray-300 rounded-lg'
						/>
						<ErrorMessage
							name='name'
							component='div'
							className='text-red-600 text-sm mt-1'
						/>
					</div>

					<div className='space-y-1'>
						<label className='block text-lg font-medium text-[#1F1F1F] mb-2'>
							Product Category
						</label>
						<Field
							type='text'
							name='category'
							className='w-full px-4 py-3 border border-gray-300 rounded-lg'
						/>
						<ErrorMessage
							name='category'
							component='div'
							className='text-red-600 text-sm mt-1'
						/>
					</div>

					{/* Sub-category Field */}
					<div className='space-y-1'>
						<label className='block text-lg font-medium text-[#1F1F1F] mb-2'>
							Product Type
						</label>
						<Field
							type='text'
							name='sub_category'
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
							className='w-full px-4 py-3 border border-gray-300 rounded-lg'
						/>
						<ErrorMessage
							name='brand'
							component='div'
							className='text-red-600 text-sm mt-1'
						/>
					</div>

					<div className='space-y-1'>
						<label className='block text-lg font-medium text-[#1F1F1F] mb-2'>
							Product Description
						</label>
						<Field
							type='text'
							name='description'
							className='w-full px-4 py-3 border border-gray-300 rounded-lg'
						/>
						<ErrorMessage
							name='description'
							component='div'
							className='text-red-600 text-sm mt-1'
						/>
					</div>

					{/* Best Selling */}
					<div className='space-y-1'>
						<label className='block text-lg font-medium text-[#1F1F1F] mb-2'>
							Best Selling Product?
						</label>
						<Field
							type='checkbox'
							name='best_selling'
							className='mr-2 leading-tight'
						/>
						<span className='text-sm'>Mark as best selling</span>
					</div>

					{/* New Arrival */}
					<div className='space-y-1'>
						<label className='block text-lg font-medium text-[#1F1F1F] mb-2'>
							New Arrival Product?
						</label>
						<Field
							type='checkbox'
							name='new_arrival'
							className='mr-2 leading-tight'
						/>
						<span className='text-sm'>Mark as new arrival</span>
					</div>

					{/* Image Upload Field */}
					<div className='space-y-1'>
						<label className='block text-lg font-medium text-[#1F1F1F] mb-2'>
							Image
						</label>
						<input
							type='file'
							name='image'
							accept='image/*'
							onChange={(e) => setFieldValue('image', e.target.files[0])}
							className='w-full px-4 py-3 border border-gray-300 rounded-lg'
						/>
						<ErrorMessage
							name='image'
							component='div'
							className='text-red-600 text-sm mt-1'
						/>
					</div>

					<div className='space-y-1'>
						<label className='block text-lg font-medium text-[#1F1F1F] mb-2'>
							Price
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

					<div className='space-y-1'>
						<label className='block text-lg font-medium text-[#1F1F1F] mb-2'>
							Offer price
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
							Stock
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

					<button
						type='submit'
						className='w-full py-3 border-1 border-gray-300 text-[#1F1F1F] text-lg font-semibold rounded-lg hover:bg-gray-100 cursor-pointer'
					>
						Save Product
					</button>
				</Form>
			)}
		</Formik>
	)
}

export default AddProductForm
