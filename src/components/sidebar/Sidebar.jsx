'use client'

import { Close, Menu } from '@mui/icons-material'
import { CircularProgress } from '@mui/material'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'

const Sidebar = () => {
	const { data: session, status } = useSession()
	const [isOpen, setIsOpen] = useState(false)
	const [isLoggingOut, setIsLoggingOut] = useState(false)

	const toggleSidebar = () => setIsOpen(!isOpen)

	const handleAdminLogout = async () => {
		setIsLoggingOut(true)
		setTimeout(() => {
			signOut({ callbackUrl: '/' })
			setIsLoggingOut(false)
		}, 3000)
		enqueueSnackbar('Logged out successfully.', { variant: 'success' })
	}

	return (
		<div className='relative'>
			<button
				className='p-2 m-4 text-gray-700 dark:text-gray-300 md:hidden'
				onClick={toggleSidebar}
			>
				{isOpen ? <Close fontSize='large' /> : <Menu fontSize='large' />}
			</button>

			<aside
				className={`fixed left-0 top-0 h-full bg-[#1F1F1F] text-white w-64 p-6 transform transition-transform md:translate-x-0 ${
					isOpen ? 'translate-x-0' : '-translate-x-full'
				}`}
			>
				<h2 className='text-2xl font-semibold mb-6'>Menu</h2>
				<nav className='space-y-4'>
					{status === 'authenticated' ? (
						<Link
							href='/dashboard'
							className='block p-3 rounded-lg hover:bg-gray-700'
						>
							Dashboard
						</Link>
					) : (
						<Link
							href='/'
							className='block p-3 rounded-lg hover:bg-gray-700'
						>
							Dashboard
						</Link>
					)}
					{status === 'authenticated' ? (
						<Link
							href='/products'
							className='block p-3 rounded-lg hover:bg-gray-700'
						>
							Products
						</Link>
					) : (
						<Link
							href='/'
							className='block p-3 rounded-lg hover:bg-gray-700'
						>
							Products
						</Link>
					)}
					{status === 'authenticated' ? (
						<Link
							href='/orders'
							className='block p-3 rounded-lg hover:bg-gray-700'
						>
							Orders
						</Link>
					) : (
						<Link
							href='/'
							className='block p-3 rounded-lg hover:bg-gray-700'
						>
							Orders
						</Link>
					)}
					{status === 'authenticated' ? (
						<button
							onClick={handleAdminLogout}
							className='w-full text-start flex items-center gap-2 p-3 rounded-lg hover:bg-gray-700 cursor-pointer'
							disabled={isLoggingOut} // Disable button during logout
						>
							{isLoggingOut ? (
								<CircularProgress
									size={24}
									color='inherit'
								/>
							) : (
								'Logout'
							)}
						</button>
					) : (
						<Link
							href='/'
							className='block p-3 rounded-lg hover:bg-gray-700'
						>
							Login
						</Link>
					)}
				</nav>
			</aside>

			{isOpen && (
				<div
					className='fixed inset-0 bg-black opacity-50 md:hidden'
					onClick={toggleSidebar}
				></div>
			)}
		</div>
	)
}

export default Sidebar
