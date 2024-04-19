import React from 'react'
import { useLocation } from 'react-router'
import LoginPage from './login/login'
import RegisterPage from './register'

const AuthRootComponent = () => {
	const location = useLocation()
	return location.pathname === '/login' ? (
		<LoginPage />
	) : location.pathname === '/register' ? (
		<RegisterPage />
	) : null
}

export default AuthRootComponent
