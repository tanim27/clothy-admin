import axios from 'axios'
import { getToken } from 'next-auth/jwt' // For server-side token retrieval
import { getSession } from 'next-auth/react'

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL

const axiosRequest = async ({ req, ...options }) => {
	let token = null

	if (typeof window !== 'undefined') {
		// Client-side: Use getSession()
		const session = await getSession()
		token = session?.accessToken
	} else if (req) {
		// Server-side: Use getToken()
		token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
	}

	const headers = token ? { Authorization: `Bearer ${token}` } : {}

	const onSuccess = (res) => res.data
	const onError = (err) => {
		throw err.response?.data || 'An error occurred'
	}

	return axios({ ...options, headers, withCredentials: true })
		.then(onSuccess)
		.catch(onError)
}

export default axiosRequest
