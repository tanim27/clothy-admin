'use client'

import { SnackbarProvider } from 'notistack'

const NotistackProvider = ({ children }) => {
	return (
		<SnackbarProvider
			maxSnack={3}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
		>
			{children}
		</SnackbarProvider>
	)
}

export default NotistackProvider
