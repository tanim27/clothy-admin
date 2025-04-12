import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const CustomAuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)

	const login = async (email, password) => {
		// Call your backend API to authenticate user
		const response = await fetch('/api/auth/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
		})
		const userData = await response.json()
		setUser(userData)
	}

	const logout = () => {
		setUser(null)
	}

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)
