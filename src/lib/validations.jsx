import * as Yup from 'yup'

export const AdminLoginValidationSchema = Yup.object({
	email: Yup.string().email('Invalid email').required('Email is required'),
	password: Yup.string().required('Password is required'),
})

export const AdminRegisterValidationSchema = Yup.object({
	name: Yup.string().required('Name is required'),
	email: Yup.string().email('Invalid email').required('Email is required'),
	password: Yup.string()
		.min(6, 'Password must be at least 6 characters')
		.required('Password is required'),
})

export const AddProductValidationSchema = Yup.object().shape({
	name: Yup.string()
		.trim()
		.min(3, 'Product name must be at least 3 characters')
		.required('Product name is required'),

	description: Yup.string()
		.trim()
		.min(10, 'Product Description must be at least 10 characters')
		.required('Product description is required'),

	price: Yup.number()
		.typeError('Price must be a number')
		.min(1, 'Price must be greater than 0')
		.required('Price is required'),

	offer_price: Yup.number()
		.nullable()
		.transform((value, originalValue) => (originalValue === '' ? null : value))
		.min(1, 'Offer price must be greater than 0')
		.when('price', (price, schema) =>
			price != null
				? schema.max(price - 1, 'Offer price must be less than the price')
				: schema,
		),

	image: Yup.mixed().required('Image is required'),

	stock: Yup.array()
		.of(
			Yup.object().shape({
				size: Yup.string().trim().required('Size is required'),
				quantity: Yup.number()
					.typeError('Quantity must be a number')
					.integer('Quantity must be a whole number')
					.min(0, 'Quantity cannot be negative')
					.required('Quantity is required'),
			}),
		)
		.min(1, 'At least one stock entry is required')
		.test('unique-sizes', 'Stock sizes must be unique', (stock) => {
			const sizes = stock.map((item) => item.size?.toLowerCase())
			return sizes.length === new Set(sizes).size
		}),

	category: Yup.string().trim().required('Product category is required'),

	sub_category: Yup.string()
		.trim()
		.required('Product sub-category is required'),

	brand: Yup.string().trim().required('Brand name is required'),

	best_selling: Yup.boolean().nullable(),
	new_arrival: Yup.boolean().nullable(),
})

export const EditProductValidationSchema = Yup.object().shape({
	name: Yup.string()
		.trim()
		.min(3, 'Product name must be at least 3 characters')
		.required('Product name is required'),

	category: Yup.string().trim().required('Product category is required'),

	price: Yup.number()
		.typeError('Price must be a number')
		.min(1, 'Price must be greater than 0')
		.required('Price is required'),

	offer_price: Yup.number()
		.nullable()
		.transform((value, originalValue) => (originalValue === '' ? null : value))
		.min(1, 'Offer price must be greater than 0')
		.when('price', (price, schema) =>
			price != null
				? schema.max(price - 1, 'Offer price must be less than the price')
				: schema,
		),

	description: Yup.string()
		.trim()
		.min(10, 'Description must be at least 10 characters')
		.required('Product description is required'),

	image: Yup.mixed().notRequired(), // optional during edit

	stock: Yup.array()
		.of(
			Yup.object().shape({
				size: Yup.string().trim().required('Size is required'),
				quantity: Yup.number()
					.transform((value, originalValue) =>
						String(originalValue).trim() === ''
							? undefined
							: Number(originalValue),
					)
					.typeError('Quantity must be a number')
					.integer('Quantity must be a whole number')
					.min(0, 'Quantity cannot be negative')
					.required('Quantity is required'),
			}),
		)
		.min(1, 'At least one stock entry is required')
		.test('unique-sizes', 'Stock sizes must be unique', (stock) => {
			const sizes = stock.map((item) => item.size)
			return sizes.length === new Set(sizes).size
		}),
})
