import InputBase from '@mui/material/InputBase'
import { styled } from '@mui/material/styles'

export const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: '#e0e0e0',
	boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
	'&:hover': {
		// backgroundColor: '#f0f0f0 ',
		boxShadow: '0 4px 12px rgba(0, 0, 0, 0.21)',
	},
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(1),
		width: 'auto',
	},
}))

export const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}))

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	width: '100%',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		[theme.breakpoints.up('sm')]: {
			width: '20ch', // increased from 12ch to 20ch
			'&:focus': {
				width: '30ch', // increased from 20ch to 30ch
			},
		},
	},
}))
