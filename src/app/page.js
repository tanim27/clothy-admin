'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const HomePage = () => {
	const { data: session, status } = useSession()
	const router = useRouter()

	useEffect(() => {
		if (status === 'authenticated') {
			router.replace('/dashboard')
		} else {
			router.replace('/admin/login')
		}
	}, [status, router])

	return (
		<div className='min-h-screen container flex justify-center items-center mx-auto p-10'></div>
	)
}

export default HomePage
