import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { fetchPOST } from './../../Api/index'
import { CHECK_ROOM, IS_EXIST_USER } from '../../Config/index'

const Login = () => {
	const [room, setRoom] = useState('')
	const [password, setPassword] = useState('')
	const [roomError, setRoomError] = useState(['', false])
	const [passwordError, setPasswordError] = useState(['', false])

	const [username, setUsername] = useState('')

	const history = useHistory()

	const handleChange = (e) => {
		if (e.target.name === 'room') {
			setRoom(e.target.value)
			setRoomError(['', false])
		}
		if (e.target.name === 'password') {
			setPassword(e.target.value)
			setPasswordError(['', false])
		}
	}
	const handleLogOut = (e) => {
		e.preventDefault()
		if (localStorage.getItem('token_user'))
			localStorage.removeItem('token_user')
		history.replace('/login')
	}
	const handleSubmit = async (e) => {
		e.preventDefault()
		setRoomError(['', false])
		setPasswordError(['', false])
		await fetchPOST({ room, password }, CHECK_ROOM)
			.then((res) => res.json())
			.then(
				(rs) => {
					if (rs.res && rs.token_room) {
						localStorage.setItem('token_room', rs.token_room)
						history.replace(`/chat/${room}`)
						return
					}
					if (rs.err) {
						setRoomError(['Room or Password was wrong', true])
						return
					}
				},
				(error) => {
					console.log(error)
				},
			)
	}

	useEffect(() => {
		if (!localStorage.getItem('token_user')) {
			console.log('oke')
			history.replace('/login')
		} else {
			isExistUser()
		}
	})
	const isExistUser = async () => {
		await fetch(IS_EXIST_USER, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'authorization-user': `Bear ${localStorage.getItem(
					'token_user',
				)}`,
			},
		})
			.then((res) => {
				if (res.status === 403) {
					localStorage.removeItem('token_user')
					history.replace('/login')
					return
				}
				return res.json()
			})
			.then((rs) => {
				if (rs.username) {
					setUsername(rs.username)
				}
			})
			.catch((err) => console.log(err))
	}

	return localStorage.getItem('token_user') ? (
		<>
			<div className='limiter'>
				<div className='container-login100'>
					<div className='wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54'>
						<form className='login100-form validate-form'>
							<span className='login100-form-title p-b-49'>
								{' '}
								<span className='username-pro'>
									{username}
								</span>{' '}
								<br />
								Tell Us Your Room{' '}
							</span>

							<div
								className={
									roomError[0] !== ''
										? 'wrap-input100 validate-input m-b-23 alert-validate'
										: 'wrap-input100 validate-input m-b-23'
								}
								data-validate={roomError[0]}
							>
								<span className='label-input100'>Username</span>
								<input
									className={
										room !== ''
											? roomError[1] === true
												? 'alert-validate input100 has-val'
												: 'input100 has-val'
											: roomError[1] === true
											? 'alert-validate input100 '
											: 'input100'
									}
									type='text'
									name='room'
									placeholder='Type your room'
									value={room}
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
										Enter
									</button>
								</div>
							</div>

							<div className='flex-col-c p-t-155'>
								<span className='txt1 p-b-17'>
									{' '}
									Or Create New Room Using{' '}
								</span>

								<Link to='/room/create'>CREATE</Link>
								<span className='txt1 p-b-17'>
									{' '}
									If You Want Log Out{' '}
								</span>
								<Link to='login'>
									<button
										onClick={(e) => {
											handleLogOut(e)
										}}
									>
										LOG OUT
									</button>
								</Link>
							</div>
						</form>
					</div>
				</div>
			</div>

			<div id='dropDownSelect1'></div>
		</>
	) : (
		<></>
	)
}

export default Login
