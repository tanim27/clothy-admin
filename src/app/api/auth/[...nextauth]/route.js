import axiosRequest from '@/utils/axiosRequest' // Adjust path if needed
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'admin@example.com',
				},
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, req) {
				try {
					const user = await axiosRequest({
						req, // Pass `req` for server-side token support
						url: '/api/auth/admin/login',
						method: 'POST',
						data: credentials,
					})

					if (user) {
						return user
					} else {
						return null
					}
				} catch (error) {
					throw new Error('Invalid credentials')
				}
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.accessToken = user.token
				token.user = user
			}
			return token
		},
		async session({ session, token }) {
			session.user = token.user
			session.accessToken = token.accessToken
			return session
		},
	},
	pages: {
		signIn: '/login',
	},
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
