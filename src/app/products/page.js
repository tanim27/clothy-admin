export const metadata = {
	title: 'Clothy Admin | Products',
	description: 'Clothy Admin application. Products Page.',
}

import ProductsList from '@/components/products/ProductsList'

const page = () => {
	return (
		<div className='p-4 sm:p-6'>
			<h1 className='text-center font-extrabold text-3xl sm:text-4xl mb-6'>
				Products
			</h1>
			<ProductsList />
		</div>
	)
}

export default page
