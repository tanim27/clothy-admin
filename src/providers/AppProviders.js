'use client'

import { CustomAuthProvider } from '@/context/AuthContext'
import AuthProvider from './AuthProvider'
import NotistackProvider from './NotistackProvider'
import ReactQueryProvider from './ReactQueryProvider'

const AppProviders = ({ children, session }) => {
	return (
		<ReactQueryProvider>
			<AuthProvider session={session}>
				<CustomAuthProvider>
					<NotistackProvider>{children}</NotistackProvider>
				</CustomAuthProvider>
			</AuthProvider>
		</ReactQueryProvider>
	)
}

export default AppProviders
