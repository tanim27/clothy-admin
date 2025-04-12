import OrdersList from '@/components/orders/OrdersList'
import ProductsList from '@/components/products/ProductsList'

const page = () => {
	return (
		<div className='p-4 sm:p-6 space-y-6'>
			<h1 className='text-center font-extrabold text-3xl sm:text-4xl mb-6'>
				Dashboard
			</h1>
			<OrdersList />
			<ProductsList />
		</div>
	)
}

export default page
