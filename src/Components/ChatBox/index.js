import React, { useEffect, useState } from 'react'
import './index.css'
import ChatBoxStatusRoom from '../ChatBoxStatusRoom/index'
import ChatBoxMessageBox from '../ChatBoxMessageBox/index'
import ChatBoxTextMesBtn from '../ChatBoxTextMesBtn/index'
import { Redirect, useHistory, useParams } from 'react-router-dom'
import io from 'socket.io-client'
import { GET_URL_FOR_SOCKET, GET_URL_FOR_MESSAGES } from '../../Config/index'
let socket
const Index = () => {
	const history = useHistory()
	const param = useParams()
	const username = localStorage.getItem('username')
	const [messages, setMessages] = useState([])
	const [nums, setNums] = useState(0)
	const { room } = param
	const load_messages_from_server = async (room) => {
		await fetch(`${GET_URL_FOR_MESSAGES}/${room}`)
			.then((res) => res.json())
			.then(
				(data) => {
					if (data.room_name) {
						setMessages(data.messages)
					}
				},
				(error) => console.log(error),
			)
	}

	useEffect(() => {
		load_messages_from_server(room)
		socket = io(GET_URL_FOR_SOCKET)
		socket.emit('join', username, room)
	}, [])
	useEffect(() => {
		load_messages_from_server(room)
	}, [])
	useEffect(() => {
		socket.on('message', (user_text) => {
			setMessages([...messages, user_text])
		})
	}, [messages])
	useEffect(() => {
		socket.on('updateNums', (socketnums) => {
			setNums(socketnums)
		})
	}, [nums])
	const sendMessage = async (msg, obj_date) => {
		await fetch(`${GET_URL_FOR_MESSAGES}/${room}`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				username: username,
				text: msg,
				date: obj_date,
			}),
		})
			.then((res) => res.json())
			.then(
				(data) => {
					console.log(data)
					return
				},
				(error) => {
					console.log(error)
					return
				},
			)
		socket.emit('sendMessage', { msg, obj_date })
		setMessages([
			...messages,
			{
				username: username,
				text: msg,
				date: obj_date,
			},
		])
	}
	const handleExitRoom = () => {
		history.replace('/')
		socket.disconnect(0)
	}

	const handleDelete = (index, message) => {
		console.log(index, message)
	}

	return localStorage.getItem('username') === null ? (
		<Redirect to='/' />
	) : (
		<div class='body'>
			<div class='main'>
				<div class='message-board'>
					<ChatBoxStatusRoom
						room={param.room}
						username={username}
						handleExitRoom={handleExitRoom}
					/>
					<ChatBoxMessageBox
						messages={messages}
						username={username}
						handleDelete={handleDelete}
					/>
					<ChatBoxTextMesBtn sendMessage={sendMessage} />
				</div>
			</div>
		</div>
	)
}

export default Index
