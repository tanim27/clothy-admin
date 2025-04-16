export const metadata = {
	title: 'Clothy Admin | Add Product',
	description: 'Clothy Admin application. Add product Page.',
}

import AddProductForm from '@/components/products/AddProductForm'

const CreateProductPage = () => {
	return (
		<div className='p-6'>
			<AddProductForm />
		</div>
	)
}

export default CreateProductPage
