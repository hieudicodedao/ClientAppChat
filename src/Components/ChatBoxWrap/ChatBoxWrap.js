import React, { useEffect, useState } from 'react'
import ChatBox from './../ChatBox/index'
import { DO_WE_NEED_RENDER } from './../../Config/index'
import { useHistory, useParams } from 'react-router-dom'

const ChatBoxWrap = () => {
	const [userroom, setUserroom] = useState(['', '', false])
	const history = useHistory()
	const params = useParams()

	const checkValidate = async () => {
		await fetch(DO_WE_NEED_RENDER, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'authorization-user': `Bear ${localStorage.getItem(
					'token_user',
				)}`,
				'authorization-room': `Bear ${localStorage.getItem(
					'token_room',
				)}`,
			},
			body: JSON.stringify({
				room: params.room,
			}),
		})
			.then((res) => {
				if (res.status === 403) {
					history.replace('/login')
					return
				}
				return res.json()
			})
			.then(
				(rs) => {
					setUserroom([rs.username, rs.room, true])
					return
				},
				(err) => console.log(err),
			)
			.catch((err) => console.log(err))
	}
	useEffect(() => {
		if (!localStorage.getItem('token_user')) {
			history.replace('/login')
			return
		}
		if (!localStorage.getItem('token_room')) {
			history.replace('/room')
			return
		}
		checkValidate()
	})

	return (
		<>
			{userroom[2] === true ? (
				<ChatBox userroom={userroom} />
			) : (
				<h1>Loading.....</h1>
			)}
		</>
	)
}

export default ChatBoxWrap
