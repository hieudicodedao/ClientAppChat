import React, { useEffect, useReducer, useState } from 'react'
import Nontification from '../Login-nontification/Login-nontificaton'
import Reducer from '../../Reducer/LoginUser'
import InitialState from '../../InitiaState/LoginUser'
import { GET_LIST_URL_FOR_USER } from '../../Config/index'
const LoginForm = (props) => {
	const { handleLogin } = props
	const [state, dispatch] = useReducer(Reducer, InitialState)
	const [error, seterror] = useState([])
	const { username, usernamepass } = state
	const handleSignIn = async (e) => {
		e.preventDefault()
		let listError = []
		let users = null
		if (!username || !usernamepass) {
			listError.push('User name or Password can be blank')
			seterror(listError)
			return
		}
		if (username.length <= 6 || usernamepass.length <= 6) {
			listError.push(
				'User Name or Password must be least than 6 characters',
			)
			seterror(listError)
			return
		}
		await fetch(GET_LIST_URL_FOR_USER)
			.then((res) => res.json())
			.then(
				(rs) => {
					users = rs
				},
				(error) => {
					console.log(error)
				},
			)
		let user = null
		user = users.find((t) => {
			return t.username === username && t.password === usernamepass
		})
		if (user === undefined) {
			listError.push('User Name is not exist ,Create Now ?')
			seterror(listError)
			return
		}
		localStorage.setItem('username', username)
		handleLogin()
	}
	const handleSignUp = async (e) => {
		e.preventDefault()
		let listError = []
		let users = null
		if (!username || !usernamepass) {
			listError.push('User name or Password can be blank')
			seterror(listError)
			return
		}
		if (username.length <= 6 || usernamepass.length <= 6) {
			listError.push(
				'User Name or Password must be least than 6 characters',
			)
			seterror(listError)
			return
		}
		await fetch(GET_LIST_URL_FOR_USER)
			.then((res) => res.json())
			.then(
				(rs) => {
					users = rs
				},
				(error) => {
					console.log(error)
				},
			)
		let user = null
		user = users.find((t) => {
			return t.username === username
		})
		if (user !== undefined) {
			listError.push('Account is already existed , try another!')
			seterror(listError)
			return
		}
		localStorage.setItem('username', username)
		handleLogin()
		await fetch(`${GET_LIST_URL_FOR_USER}/${username}/${usernamepass}`)
			.then((res) => res.json())
			.then(
				(data) => console.log('suscessfull' + data),
				(error) => console.log(error),
			)
	}
	return (
		<div class='content'>
			<h1>Login</h1>
			<hr />
			<form action=''>
				<label htmlFor='username'>User Name</label>
				<input
					type='text'
					name='username'
					id='username'
					placeholder='Enter user name'
					value={state.username}
					onChange={(e) =>
						dispatch({
							type: 'UPDATE USER NAME',
							payload: e.target.value,
						})
					}
				/>
				<label htmlFor='usernamepass'>Password</label>
				<input
					type='password'
					name='usernamepass'
					id='usernamepass'
					placeholder='Enter password'
					value={state.usernamepass}
					onChange={(e) =>
						dispatch({
							type: 'UPDATE PASSWORD FOR USER NAME',
							payload: e.target.value,
						})
					}
				/>
				<div className='control-btn'>
					<button
						class='btn-sign-in'
						onClick={(e) => handleSignIn(e)}
					>
						SING IN
					</button>
					<h1>OR</h1>
					<button
						class='btn-sign-in'
						onClick={(e) => handleSignUp(e)}
					>
						SIGN UP
					</button>
				</div>

				{/* </Link> */}
				<Nontification error={error} />
			</form>
		</div>
	)
}

export default LoginForm
