import axiosRequest from '@/utils/axiosRequest'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useGetAllOrders = () => {
	return useQuery({
		queryKey: ['all-orders'],
		queryFn: async () =>
			await axiosRequest({
				url: '/api/orders/',
				method: 'GET',
			}),
	})
}

export const useUpdateOrderStatus = () => {
	return useMutation({
		mutationKey: ['update-order-status'],
		mutationFn: async ({ orderId, status }) => {
			return await axiosRequest({
				url: `/api/orders/${orderId}`,
				method: 'PUT',
				data: { order_status: status },
			})
		},
	})
}

export const useUpdatePaymentStatus = () => {
	return useMutation({
		mutationKey: ['update-payment-status'],
		mutationFn: async ({ orderId, status }) => {
			return await axiosRequest({
				url: `/api/orders/${orderId}/payment/`,
				method: 'PUT',
				data: { payment_status: status },
			})
		},
	})
}
