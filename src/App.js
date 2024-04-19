import { Routes, Route } from 'react-router'
import './App.css'
import AuthRootComponent from './components/auth/index'
import LoginPage from './components/auth/login/login'

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<LoginPage />} />
				<Route path='/login' element={<AuthRootComponent />} />
				<Route path='/register' element={<AuthRootComponent />} />
			</Routes>
		</div>
	)
}

export default App
