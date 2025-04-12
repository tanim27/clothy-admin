'use client'

import EditProductForm from '@/components/products/EditProductForm'
import { useGetProducts } from '@/hooks/useProducts'
import { CircularProgress } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const EditProductPage = () => {
	const router = useRouter()
	const { id: productId } = useParams()
	const { data: products, isLoading } = useGetProducts()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (!isLoading) setLoading(false)
	}, [isLoading])

	// Find the product
	const product = products?.find((p) => p._id === productId)

	// Redirect if product is not found
	useEffect(() => {
		if (!isLoading && !product) {
			router.push('/products')
		}
	}, [isLoading, product, router])

	if (loading)
		return (
			<div className='flex justify-center items-center h-64'>
				<CircularProgress color='default' />
			</div>
		)

	return (
		<div className='p-6'>
			{product ? (
				<EditProductForm product={product} />
			) : (
				<div className='flex justify-center items-center h-64'>
					<CircularProgress color='default' />
				</div>
			)}
		</div>
	)
}

export default EditProductPage
