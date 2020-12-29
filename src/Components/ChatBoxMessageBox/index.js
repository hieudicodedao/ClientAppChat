import React, { useEffect, useRef } from 'react'
import ChatBoxMessageBoxItem from '../ChatBoxMessageBoxItem/index'
const Index = (props) => {
	const { messages, username, handleDelete } = props
	const messagesEndRef = useRef(null)

	const scrollToBottom = () => {
		messagesEndRef.current.scrollIntoView({ behavior: 'auto' })
	}

	useEffect(() => {
		scrollToBottom()
	}, [messages])

	const renderMessage = () => {
		return messages.map((message, index) => {
			return (
				<ChatBoxMessageBoxItem
					message={message}
					username={username}
					key={index}
					index={index}
					handleDelete={handleDelete}
				/>
			)
		})
	}
	return (
		<>
			<div className='messagebox'>
				<ul className='message-show-here'>{renderMessage()}</ul>
				<div
					ref={messagesEndRef}
					style={{ float: 'left', clear: 'both' }}
				/>
			</div>
		</>
	)
}

export default Index
