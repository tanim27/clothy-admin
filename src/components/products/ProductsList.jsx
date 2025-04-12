'use client'

import AddRoundedIcon from '@mui/icons-material/AddRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import {
	Button,
	CircularProgress,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
} from '@mui/material'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'

import NotFound from '@/app/not-found'
import {
	Search,
	SearchIconWrapper,
	StyledInputBase,
} from '@/components/customsearchfield/CustomSearchField'
import DeleteProductModal from '@/components/products/DeleteProductModal'
import { useDeleteProduct, useGetProducts } from '@/hooks/useProducts'

const columns = [
	{ id: 'product', label: 'Product', minWidth: 150, align: 'center' },
	{ id: 'image', label: 'Image', minWidth: 50, align: 'center' },
	{ id: 'description', label: 'Description', minWidth: 150, align: 'center' },
	{ id: 'category', label: 'Category', minWidth: 100, align: 'center' },
	{ id: 'sub_category', label: 'Sub Category', minWidth: 100, align: 'center' },
	{ id: 'brand', label: 'Brand', minWidth: 100, align: 'center' },
	{ id: 'best_selling', label: 'Best Selling', minWidth: 100, align: 'center' },
	{ id: 'new_arrival', label: 'New Arrival', minWidth: 100, align: 'center' },
	{ id: 'price', label: 'Price', minWidth: 80, align: 'right' },
	{ id: 'offer_price', label: 'Offer Price', minWidth: 80, align: 'right' },
	{ id: 'stock', label: 'Stock', minWidth: 100, align: 'center' },
	{ id: 'actions', label: 'Actions', minWidth: 100, align: 'center' },
]

const ProductsList = () => {
	const { data: products = [], isLoading, isError } = useGetProducts()
	const deleteProduct = useDeleteProduct()
	const router = useRouter()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedProduct, setSelectedProduct] = useState(null)
	const [searchTerm, setSearchTerm] = useState('')
	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)

	const handleDelete = async () => {
		if (!selectedProduct) return
		try {
			await deleteProduct.mutateAsync(selectedProduct._id)
			enqueueSnackbar('Product deleted successfully!', { variant: 'success' })
			setTimeout(() => window.location.reload(), 2000)
		} catch (error) {
			enqueueSnackbar(error?.message || 'Failed to delete product', {
				variant: 'error',
			})
		} finally {
			setIsModalOpen(false)
			setSelectedProduct(null)
		}
	}

	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value)
		setPage(0)
	}

	if (isLoading) {
		return (
			<div className='flex justify-center items-center h-screen'>
				<CircularProgress color='default' />
			</div>
		)
	}

	if (isError) return <NotFound />

	const filteredProducts = products.filter((product) => {
		const term = searchTerm.toLowerCase()
		return (
			product.name.toLowerCase().includes(term) ||
			product.category.toLowerCase().includes(term)
		)
	})

	return (
		<div>
			<div className='flex justify-end ml-6 mb-6'>
				<div className='flex justify-center items-center gap-4'>
					<Search>
						<SearchIconWrapper>
							<SearchRoundedIcon />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder='Search…'
							inputProps={{ 'aria-label': 'search' }}
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</Search>

					<Button
						type='button'
						variant='contained'
						startIcon={<AddRoundedIcon />}
						onClick={() => router.push('/products/create')}
						sx={{
							backgroundColor: '#1F1F1F',
							color: '#FFFFFF',
							'&:hover': {
								backgroundColor: '#333333',
							},
						}}
					>
						Create New Product
					</Button>
				</div>
			</div>

			<div className='flex justify-center ml-6 mb-6'>
				<Paper sx={{ width: '100%', overflow: 'hidden' }}>
					<TableContainer sx={{ maxHeight: 1000 }}>
						<Table stickyHeader>
							<TableHead>
								<TableRow>
									{columns.map((column) => (
										<TableCell
											key={column.id}
											align={column.align}
											style={{ minWidth: column.minWidth }}
										>
											{column.label}
										</TableCell>
									))}
								</TableRow>
							</TableHead>
							<TableBody>
								{filteredProducts.length > 0 ? (
									filteredProducts
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map((product) => (
											<TableRow
												hover
												key={product._id}
											>
												<TableCell align='center'>{product.name}</TableCell>
												<TableCell align='center'>
													<Image
														src={product.image}
														alt={product.name}
														height={100}
														width={100}
														className='object-cover rounded mx-auto w-12 h-12'
													/>
												</TableCell>
												<TableCell align='center'>
													{product.description.length > 10
														? product.description.substring(0, 10) + '...'
														: product.description}
												</TableCell>
												<TableCell align='center'>{product.category}</TableCell>
												<TableCell align='center'>
													{product.sub_category}
												</TableCell>
												<TableCell align='center'>{product.brand}</TableCell>
												<TableCell align='center'>
													{product.best_selling ? 'Yes' : 'No'}
												</TableCell>
												<TableCell align='center'>
													{product.new_arrival ? 'Yes' : 'No'}
												</TableCell>
												<TableCell align='right'>${product.price}</TableCell>
												<TableCell align='right'>
													{product.offer_price
														? `$${product.offer_price}`
														: 'N/A'}
												</TableCell>
												<TableCell align='center'>
													{product?.stock.map((item, index) => (
														<div key={index}>
															<p>Size: {item.size}</p>
															<p>Quantity: {item.quantity}</p>
														</div>
													))}
												</TableCell>
												<TableCell align='center'>
													<div className='flex gap-2'>
														<IconButton
															onClick={() =>
																router.push(`/products/edit/${product._id}`)
															}
														>
															<EditRoundedIcon />
														</IconButton>
														<IconButton
															onClick={() => {
																setSelectedProduct(product)
																setIsModalOpen(true)
															}}
														>
															<DeleteRoundedIcon />
														</IconButton>
													</div>
												</TableCell>
											</TableRow>
										))
								) : (
									<TableRow>
										<TableCell
											colSpan={columns.length}
											className='text-center py-4'
											align='center'
										>
											No products found
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[10, 25, 100]}
						component='div'
						count={products.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</Paper>
			</div>

			{/* Delete Product Modal */}
			<DeleteProductModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onConfirm={handleDelete}
				product={selectedProduct}
			/>
		</div>
	)
}

export default ProductsList
