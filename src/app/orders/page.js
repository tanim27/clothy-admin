export const metadata = {
	title: 'Clothy Admin | Orders',
	description: 'Clothy Admin application. Orders Page.',
}

import OrdersList from '@/components/orders/OrdersList'

const page = () => {
	return (
		<div className='p-4 sm:p-6'>
			<h1 className='text-center font-extrabold text-3xl sm:text-4xl mb-6'>
				Orders
			</h1>
			<OrdersList />
		</div>
	)
}

export default page
