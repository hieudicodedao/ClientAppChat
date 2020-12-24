import React, { useEffect, useReducer, useState } from 'react'
import Nontification from '../Login-nontification/Login-nontificaton'
import Reducer from '../../Reducer/Login'
import InitialState from '../../InitiaState/Login'
// import { Link } from 'react-router-dom'
import { GET_LIST_URL_FOR_LOGIN } from '../../Config/index'
import { useHistory } from 'react-router-dom'
const LoginForm = (props) => {
	let history = useHistory()
	const { handleLogout } = props
	const [state, dispatch] = useReducer(Reducer, InitialState)
	const [error, seterror] = useState([])
	const onSubmitForm = async (e) => {
		e.preventDefault()
		let { room, password } = state
		let error = []
		let isError = false
		//check if( any thing empty)
		if (room === '') {
			error.push("Room can't be empty")
			isError = true
		}
		if (password === '') {
			error.push("Password can't be empty")
			isError = true
		}
		if (error.length === 0) {
			//if room is exist
			let listRoom = null
			await fetch(GET_LIST_URL_FOR_LOGIN)
				.then((res) => res.json())
				.then(
					(rs) => {
						listRoom = rs
					},
					(error) => {
						console.log(error)
					},
				)
			if (listRoom === null) {
				error.push('Connection Error')
				isError = true
			} else {
				let isExistRoom = false
				let isPassword = true
				listRoom.forEach((ele) => {
					if (ele.room !== room) {
					} else {
						if (ele.password !== password) {
							isError = true
							isExistRoom = true
							isPassword = false
						} else {
							isExistRoom = true
						}
					}
				})
				if (!isExistRoom) error.push('Room is not exist')
				if (!isPassword) error.push('Wrong password')
			}
			if (!isError) {
				history.push(`/chat/${room}`)
			} else {
				seterror(error)
			}
		} else {
			seterror(error)
		}
	}
	const onCreate = async (e) => {
		e.preventDefault()
		let { room, password } = state
		let error = []
		let isError = false
		//check if( any thing empty)
		if (room === '') {
			error.push("Room can't be empty")
			isError = true
		}
		if (password === '') {
			error.push("Password can't be empty")
			isError = true
		}
		if (room && password) {
			let listRoom = null
			await fetch(GET_LIST_URL_FOR_LOGIN)
				.then((res) => res.json())
				.then((data) => (listRoom = data))
				.catch((error) => console.log(error))
			if (listRoom === null) {
				error.push('Server is off')
			} else {
				//sever is on
				//we need no room math
				console.log(listRoom)
				let isExistRoom = false
				listRoom.forEach((ele) => {
					if (ele.room === room) {
						isExistRoom = true
					}
				})
				if (isExistRoom) {
					error.push("Room's name existed")
				} else {
					//add new room

					//change router here
					history.push(`/chat/room`)
					await fetch(GET_LIST_URL_FOR_LOGIN + `/${room}/${password}`)
						.then((res) => {
							console.log('send oke')
						})
						.catch((error) => {
							console.log(error)
						})
					console.log('come here')
				}
			}
		}
		seterror(error)
		return error
	}
	return (
		<div class='content'>
			<h1>Welcome</h1>
			<p class='username'>{localStorage.getItem('username')}</p>
			<button
				class='btn-logout'
				onClick={(e) => {
					e.preventDefault()
					localStorage.removeItem('username')
					handleLogout() 
				}} 
			>
				Logout
			</button>
			<h1>Choose Room</h1>

			<hr />
			<form action=''>
				<label htmlFor='room'>Room</label>
				<input
					type='text'
					name='room'
					id='room'
					placeholder='Enter room'
					value={state.room}
					onChange={(e) =>
						dispatch({
							type: 'UPDATE ROOM',
							payload: e.target.value,
						})
					}
				/>
				<label htmlFor='password'>Password</label>
				<input
					type='password'
					name='password'
					id='password'
					placeholder='Enter password'
					value={state.password}
					onChange={(e) =>
						dispatch({
							type: 'UPDATE PASSWORD',
							payload: e.target.value,
						})
					}
				/>
				<div className='control-btn'>
					<button
						class='btn-sign-in'
						onClick={(e) => onSubmitForm(e)}
					>
						GO
					</button>
					<h1>OR</h1>
					<button class='btn-sign-in' onClick={(e) => onCreate(e)}>
						CREATE
					</button>
				</div>

				{/* </Link> */}
				<Nontification error={error} />
			</form>
		</div>
	)
}

export default LoginForm
