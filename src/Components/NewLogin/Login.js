import React, { useEffect, useState } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { fetchPOST } from './../../Api/index'
import { CHECK_USER_LOGIN } from '../../Config/index'

const Login = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [usernameError, setUsernameError] = useState(['', false])
	const [passwordError, setPasswordError] = useState(['', false])

	const [token_user, setToken_user] = useState('')

	const history = useHistory()

	const handleChange = (e) => {
		if (e.target.name === 'username') {
			setUsername(e.target.value)
			setUsernameError(['', false])
		}
		if (e.target.name === 'password') {
			setPassword(e.target.value)
			setPasswordError(['', false])
		}
	}
	useEffect(() => {
		if (localStorage.getItem('token_user')) history.replace('/room')
	})
	const handleSubmit = async (e) => {
		e.preventDefault()
		setUsernameError(['', false])
		setPasswordError(['', false])
		if (username.length < 6)
			setUsernameError(['At least 6 charaters', true])
		if (password.length < 6)
			setPasswordError(['At least 6 charaters', true])
		if (username.length < 6 || password.length < 6) {
			return
		}
		await fetchPOST({ username, password }, CHECK_USER_LOGIN)
			.then((res) => res.json())
			.then(
				(rs) => {
					if (rs.res && rs.token_user) {
						localStorage.setItem('token_user', rs.token_user)
						history.replace('/room')
						return
					}
					if (rs.err) {
						setUsernameError([
							'User name or password was wrong!',
							true,
						])

						return
					}
				},
				(error) => {
					console.log(error)
				},
			)
	}
	return (
		<>
			<div className='limiter'>
				<div className='container-login100'>
					<div className='wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54'>
						<form className='login100-form validate-form'>
							<span className='login100-form-title p-b-49'>
								{' '}
								Login{' '}
							</span>

							<div
								className={
									usernameError[0] !== ''
										? 'wrap-input100 validate-input m-b-23 alert-validate'
										: 'wrap-input100 validate-input m-b-23'
								}
								data-validate={usernameError[0]}
							>
								<span className='label-input100'>Username</span>
								<input
									className={
										username !== ''
											? usernameError[1] === true
												? 'alert-validate input100 has-val'
												: 'input100 has-val'
											: usernameError[1] === true
											? 'alert-validate input100 '
											: 'input100'
									}
									type='text'
									name='username'
									placeholder='Type your username'
									value={username}
									onChange={(e) => handleChange(e)}
								/>
								<span
									className='focus-input100'
									data-symbol='&#xf206;'
								></span>
							</div>

							<div
								className={
									passwordError[0] !== ''
										? 'wrap-input100 validate-input alert-validate'
										: 'wrap-input100 validate-input'
								}
								data-validate={passwordError[0]}
							>
								<span className='label-input100'>Password</span>
								<input
									className={
										password !== ''
											? passwordError[1] === true
												? 'alert-validate input100 has-val'
												: 'input100 has-val'
											: passwordError[1] === true
											? 'alert-validate input100 '
											: 'input100'
									}
									type='password'
									name='password'
									placeholder='Type your password'
									value={password}
									onChange={(e) => handleChange(e)}
								/>
								<span
									className='focus-input100'
									data-symbol='&#xf190;'
								></span>
							</div>

							<div className='container-login100-form-btn'>
								<div className='wrap-login100-form-btn'>
									<div className='login100-form-bgbtn'></div>
									<button
										className='login100-form-btn'
										onClick={(e) => handleSubmit(e)}
									>
										Login
									</button>
								</div>
							</div>

							<div className='flex-col-c p-t-155'>
								<span className='txt1 p-b-17'>
									{' '}
									Or Sign Up Using{' '}
								</span>

								<Link to='/login/signup'>REGISTER</Link>
							</div>
						</form>
					</div>
				</div>
			</div>

			<div id='dropDownSelect1'></div>
		</>
	)
}

export default Login
