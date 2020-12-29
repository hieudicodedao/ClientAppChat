import React, { useEffect, useState } from 'react'
import ChatBoxStatusRoom from '../ChatBoxStatusRoom/index'
import ChatBoxMessageBox from '../ChatBoxMessageBox/index'
import ChatBoxTextMesBtn from '../ChatBoxTextMesBtn/index'
import { useHistory } from 'react-router-dom'
import { GET_URL_FOR_SOCKET, GET_URL_FOR_MESSAGES } from '../../Config/index'
import io from 'socket.io-client'
import shortid from 'shortid'
import './index.css'

let socket

const Index = (props) => {
	const { userroom } = props
	const username = userroom[0]
	const room = userroom[1]
	const history = useHistory()
	const [messages, setMessages] = useState([])
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

	const updateListMessagesBecauseOfDeletedItem = (message) => {
	
		message.text = 'Message has been removed'
		message.isDelete = true
		

		let newMessages = []
		messages.forEach((ele) => {
			if (ele.id === message.id) {
		
				newMessages.push({
					...message,
					text: 'Message has been removed',
					isDelete: true,
				})
			} else {
				newMessages.push(ele)
			}
		})
		return newMessages
	}
	//init socket client
	useEffect(() => {
		load_messages_from_server(room)
		socket = io(GET_URL_FOR_SOCKET)
		socket.emit('join', username, room)
	}, [GET_URL_FOR_SOCKET])
	//load data only 1 time and save to list message up
	useEffect(() => {
		load_messages_from_server(room)
	}, [])
	//handle message from server socket , will update list message and re-render
	useEffect(() => {
		socket.on('message', (user_text) => {
			setMessages([...messages, user_text])
		})
	}, [messages])
	//handle delete message from some one guys
	useEffect(() => {
		socket.on('thereisaguyjustdeletething', (message) => {
			if (message) {
				let newMessagexx = updateListMessagesBecauseOfDeletedItem(
					message,
				)
				setMessages(newMessagexx)
			}
		})
	}, [messages])
	// handle send message event (save server and call socket)
	const sendMessage = async (msg, obj_date) => {
		let myid = shortid.generate()
		await fetch(`${GET_URL_FOR_MESSAGES}/${room}`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				username: username,
				text: msg,
				date: obj_date,
				isDelete: false,
				id: myid,
			}),
		})
			.then((res) => {
				return res.json()
			})
			.then(
				(data) => {
					return
				},
				(error) => {
					console.log(error)
					return
				},
			)

		socket.emit('sendMessage', { msg, obj_date ,id : myid})
		setMessages([
			...messages,
			{
				username: username,
				text: msg,
				date: obj_date,
				isDelete: false,
				id: myid,
			},
		])
	}
	// close room exit socket room
	const handleExitRoom = () => {
		localStorage.removeItem('token_room')
		history.replace('/room')
		socket.disconnect(0)
	}
	//handle delete (call server update status and emit event delete)
	const handleDelete = async (message) => {
	
		await fetch(`${GET_URL_FOR_MESSAGES}/${room}`, {
			method: 'PATCH',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				message: message,
			}),
		})
			.then((res) => res.json())
			.then(
				(data) => console.log(data),
				(error) => {
					console.log(error)
				},
			)
			.catch((err) => console.log(err))
		setMessages(updateListMessagesBecauseOfDeletedItem(message))
		socket.emit('ivejustdeletesomeitem', message)
	}

	return (
		<div className='body'>
			<div className='main'>
				<div className='message-board'>
					<ChatBoxStatusRoom
						room={room}
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
