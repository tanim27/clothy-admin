'use client'

import { AdminLoginForm } from '@/components/auth/AdminAuthForm'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const AdminLoginPage = () => {
	const { data: session, status } = useSession()
	const router = useRouter()

	useEffect(() => {
		if (status === 'authenticated') {
			router.replace('/dashboard')
		}
	}, [status, router])

	return (
		<div className='min-h-screen container flex justify-center items-center mx-auto p-10'>
			<AdminLoginForm />
		</div>
	)
}

export default AdminLoginPage
