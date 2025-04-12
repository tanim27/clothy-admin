import axiosRequest from '@/utils/axiosRequest'
import { useMutation } from '@tanstack/react-query'

export const useAdminRegister = () => {
	return useMutation({
		mutationKey: 'admin-register',
		mutationFn: async (body) =>
			await axiosRequest({
				url: '/api/auth/admin/register',
				method: 'POST',
				data: body,
			}),
	})
}

export const useAdminLogin = () => {
	return useMutation({
		mutationKey: 'admin-login',
		mutationFn: async (body) =>
			await axiosRequest({
				url: '/api/auth/admin/login',
				method: 'POST',
				data: body,
			}),
	})
}
