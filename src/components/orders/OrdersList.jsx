'use client'

import NotFound from '@/app/not-found'
import {
	Search,
	SearchIconWrapper,
	StyledInputBase,
} from '@/components/customsearchfield/CustomSearchField'
import {
	useGetAllOrders,
	useUpdateOrderStatus,
	useUpdatePaymentStatus,
} from '@/hooks/useOrders'

import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import {
	CircularProgress,
	MenuItem,
	Paper,
	Select,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow
} from '@mui/material'

import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'

const columns = [
	{ id: 'order_id', label: 'Order ID', minWidth: 150, align: 'center' },
	{ id: 'user', label: 'User', minWidth: 150, align: 'center' },
	{ id: 'phone_number', label: 'Phone', minWidth: 150, align: 'center' },
	{ id: 'products', label: 'Products', minWidth: 150, align: 'center' },
	{ id: 'order_status', label: 'Status', minWidth: 150, align: 'center' },
	{ id: 'total_price', label: 'Total ($)', minWidth: 100, align: 'right' },
	{ id: 'payment_status', label: 'Payment', minWidth: 120, align: 'center' },
	{ id: 'created_at', label: 'Created Date', minWidth: 150, align: 'center' },
	{ id: 'updated_at', label: 'Updated Date', minWidth: 150, align: 'center' },
]

const OrdersList = () => {
	const { data: Orders, isLoading, isError } = useGetAllOrders()
	const orders = Array.isArray(Orders?.orders) ? Orders.orders : []

	const updateOrderStatus = useUpdateOrderStatus()
	const updatePaymentStatus = useUpdatePaymentStatus()

	const [searchTerm, setSearchTerm] = useState('')
	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)

	const handleOrderStatusChange = async (orderId, newOrderStatus) => {
		try {
			await updateOrderStatus.mutateAsync({ orderId, status: newOrderStatus })
			enqueueSnackbar('Order status updated successfully', {
				variant: 'success',
			})
			setTimeout(() => {
				window.location.reload()
			}, 2000)
		} catch (error) {
			enqueueSnackbar('Failed to update order status', { variant: 'error' })
		}
	}

	const handlePaymentStatusChange = async (orderId, newPaymentStatus) => {
		try {
			await updatePaymentStatus.mutateAsync({
				orderId,
				status: newPaymentStatus,
			})
			enqueueSnackbar('Payment status updated successfully', {
				variant: 'success',
			})
			setTimeout(() => {
				window.location.reload()
			}, 2000)
		} catch (error) {
			enqueueSnackbar('Failed to update payment status', { variant: 'error' })
		}
	}

	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value)
		setPage(0)
	}

	if (isLoading)
		return (
			<div className='flex justify-center items-center h-screen'>
				<CircularProgress color='default' />
			</div>
		)

	if (isError) return <NotFound />

	const filteredOrders = orders.filter((order) => {
		const term = searchTerm.toLowerCase()

		return (
			order.user?.name.toLowerCase().includes(term) ||
			order.phone_number.toLowerCase().includes(term)
		)
	})

	return (
		<div>
			<div className='flex justify-end ml-6 mb-6'>
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
			</div>

			<div className='flex justify-end ml-6 mb-6'>
				
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
									{filteredOrders.length > 0 ? (
										filteredOrders
											.slice(
												page * rowsPerPage,
												page * rowsPerPage + rowsPerPage,
											)
											.map((order) => (
												<TableRow
													hover
													key={order.order_id}
												>
													<TableCell
														className='font-mono text-xs'
														align='center'
													>
														{order.order_id}
													</TableCell>
													<TableCell align='center'>
														{order.user?.name || 'N/A'}
													</TableCell>
													<TableCell align='center'>
														{order.phone_number}
													</TableCell>
													<TableCell align='center'>
														<div className='flex flex-col gap-2'>
															{order.products?.map((item, index) => (
																<div
																	key={index}
																	className='text-sm leading-tight'
																>
																	<span className='block font-medium'>
																		{item.name}
																	</span>
																	<span className='block text-xs text-gray-600'>
																		Size: {item.size} | Qty: {item.quantity}
																	</span>
																</div>
															))}
														</div>
													</TableCell>
													<TableCell align='center'>
														<Select
															value={order.order_status}
															onChange={(e) =>
																handleOrderStatusChange(
																	order.order_id,
																	e.target.value,
																)
															}
															size='small'
															sx={{
																backgroundColor: 'transparent',
																color: 'black',
																'& .MuiOutlinedInput-notchedOutline': {
																	borderColor: 'gray',
																},
																'&:hover .MuiOutlinedInput-notchedOutline': {
																	borderColor: 'black',
																},
																'&.Mui-focused .MuiOutlinedInput-notchedOutline':
																	{
																		borderColor: 'black',
																	},
																'& .MuiSelect-icon': {
																	color: 'black',
																},
															}}
														>
															<MenuItem value='Pending'>Pending</MenuItem>
															<MenuItem value='Processing'>Processing</MenuItem>
															<MenuItem value='Shipped'>Shipped</MenuItem>
															<MenuItem value='Delivered'>Delivered</MenuItem>
															<MenuItem value='Cancelled'>Cancelled</MenuItem>
														</Select>
													</TableCell>
													<TableCell align='right'>
														${order.total_price?.toFixed(2) || '0.00'}
													</TableCell>
													<TableCell align='center'>
														<Select
															value={order.payment_status}
															onChange={(e) =>
																handlePaymentStatusChange(
																	order.order_id,
																	e.target.value,
																)
															}
															size='small'
															sx={{
																backgroundColor: 'transparent',
																color: 'black',
																'& .MuiOutlinedInput-notchedOutline': {
																	borderColor: 'gray',
																},
																'&:hover .MuiOutlinedInput-notchedOutline': {
																	borderColor: 'black',
																},
																'&.Mui-focused .MuiOutlinedInput-notchedOutline':
																	{
																		borderColor: 'black',
																	},
																'& .MuiSelect-icon': {
																	color: 'black',
																},
															}}
														>
															<MenuItem value='Pending'>Pending</MenuItem>
															<MenuItem value='Paid'>Paid</MenuItem>
														</Select>
													</TableCell>
													<TableCell align='center'>
														{order.created_at
															? new Date(order.created_at).toDateString()
															: 'N/A'}
													</TableCell>
													<TableCell align='center'>
														{order.updated_at
															? new Date(order.updated_at).toDateString()
															: 'N/A'}
													</TableCell>
												</TableRow>
											))
									) : (
										<TableRow>
											<TableCell
												colSpan={8}
												className='text-center py-4'
												align='center'
											>
												No orders found
											</TableCell>
										</TableRow>
									)}
								</TableBody>
							</Table>
						</TableContainer>
						<TablePagination
							rowsPerPageOptions={[10, 25, 100]}
							component='div'
							count={orders.length}
							rowsPerPage={rowsPerPage}
							page={page}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>
					</Paper>
			
			</div>
		</div>
	)
}

export default OrdersList
