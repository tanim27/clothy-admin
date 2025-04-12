import { Button, Typography } from '@mui/material'

const DeleteProductModal = ({ isOpen, onClose, onConfirm, product }) => {
	if (!isOpen) return null

	return (
		<div className='fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-sm z-30'>
			<div className='bg-white p-6 rounded-lg shadow-xl w-96 border border-white/20'>
				<Typography
					variant='h6'
					className='mb-4 font-semibold '
				>
					Confirm Deletion
				</Typography>
				<Typography
					variant='body1'
					className=''
				>
					Are you sure you want to delete &quot;{product?.name}&quot;?
				</Typography>
				<div className='flex justify-end gap-4 mt-4'>
					<button
						onClick={onClose}
						type='button'
						className='w-full border-1 border-gray-300 text-[#1F1F1F] text-md rounded-lg hover:bg-gray-100 flex items-center justify-center gap-2 cursor-pointer'
					>
						Cancel
					</button>
					<Button
						onClick={onConfirm}
						variant='contained'
						color='error'
					>
						Delete
					</Button>
				</div>
			</div>
		</div>
	)
}

export default DeleteProductModal
