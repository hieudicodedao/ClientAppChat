import React, { useEffect, useState } from 'react'
import LoginForm from '../Logn-Form/Login-Form'
import LoginUser from '../Login_User/LoginUser'
import './Login.css'
const Login = () => {
	const [isLogin, setIsLogin] = useState(false)
	const handleLogin = () => {
		setIsLogin(true)
	}
	const handleLogout = () => {
		console.log('here')
		console.log(isLogin)
		setIsLogin(false)
		console.log(isLogin)
	}
	const renderForm = () => {
		if (isLogin === true) return <LoginForm handleLogout={handleLogout} />
		if (!isLogin && localStorage.getItem('username')) {
			return <LoginForm handleLogout={handleLogout} />
		}
		return <LoginUser handleLogin={handleLogin} />
	}
	return (
		<div className='background'>
			<div className='image'>
				<img
					src='https://cdn1.vectorstock.com/i/1000x1000/71/65/cute-smiling-robot-chat-bot-say-hi-vector-17337165.jpg'
					alt=''
				/>
			</div>
			<div className='sign-in'>{renderForm()}</div>
		</div>
	)
}

export default Login
