import AppProviders from '@/providers/AppProviders'
import '@/styles/globals.css'
import Sidebar from './../components/sidebar/Sidebar'

export const metadata = {
	title: 'Clothy Admin',
	description: 'Clothy Admin application',
}

const RootLayout = ({ children, session }) => {
	return (
		<html lang='en'>
			<body className='min-h-screen bg-[#FDFAF6] flex'>
				<AppProviders session={session}>
					<Sidebar />
					<main className='flex-1 min-h-screen p-6 md:pl-64 overflow-hidden'>
						{children}
					</main>
				</AppProviders>
			</body>
		</html>
	)
}

export default RootLayout
