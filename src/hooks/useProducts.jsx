import axiosRequest from '@/utils/axiosRequest'
import { useMutation, useQuery } from '@tanstack/react-query'

// Fetch all products
export const useGetProducts = () => {
	return useQuery({
		queryKey: ['products'],
		queryFn: async () =>
			await axiosRequest({
				url: '/api/products',
				method: 'GET',
			}),
	})
}

export const useGetProductById = (id) => {
	return useQuery({
		queryKey: ['product', id], // Cache key includes product ID
		queryFn: async () =>
			await axiosRequest({
				url: `/api/products/${id}`, // Adjust the endpoint based on your backend API
				method: 'GET',
			}),
		enabled: !!id, // Prevent the query from running if `id` is undefined
	})
}

// Create a new product
export const useCreateProduct = () => {
	return useMutation({
		mutationKey: ['create-product'],
		mutationFn: async (body) =>
			await axiosRequest({
				url: '/api/products/create',
				method: 'POST',
				data: body,
			}),
	})
}

// Update an existing product

export const useUpdateProduct = () => {
	return useMutation({
		mutationKey: ['updateProduct'], // Mutation key for cache management
		mutationFn: async ({ id, data }) => {
			const formData = new FormData()

			// Append fields to formData
			formData.append('name', data.name)
			formData.append('category', data.category)
			formData.append('sub_category', data.sub_category)
			formData.append('brand', data.brand)
			formData.append('description', data.description)
			formData.append('price', data.price)
			formData.append('offer_price', data.offer_price)

			// Append image if selected
			if (data.image) {
				formData.append('image', data.image)
			}

			// Append boolean fields for best_selling and new_arrival as booleans
			formData.append('best_selling', data.best_selling ? 'true' : 'false') // Boolean will be handled as a string, but backend can interpret it as boolean
			formData.append('new_arrival', data.new_arrival ? 'true' : 'false') // Boolean will be handled as a string, but backend can interpret it as boolean

			// Append stock data
			data.stock.forEach((stockItem, index) => {
				formData.append(`stock[${index}].size`, stockItem.size)
				formData.append(`stock[${index}].quantity`, stockItem.quantity)
			})

			try {
				const response = await axiosRequest({
					url: `/api/products/${id}`,
					method: 'PUT',
					data: formData,
					headers: {
						'Content-Type': 'multipart/form-data', // To handle file uploads
					},
				})

				return response.data // assuming the response structure is data
			} catch (error) {
				console.error('Error updating product:', error)
				// Optional: check if error.response has a more specific message
				if (error.response && error.response.data) {
					console.error('Error response:', error.response.data)
				}
				throw new Error(
					error.message || 'Something went wrong during the update process',
				)
			}
		},
	})
}

// Delete a product
export const useDeleteProduct = () => {
	return useMutation({
		mutationKey: ['delete-product'],
		mutationFn: async (id) =>
			await axiosRequest({
				url: `/api/products/${id}`,
				method: 'DELETE',
			}),
	})
}
