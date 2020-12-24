import React from 'react'
import ChatBoxMessageBoxItem from '../ChatBoxMessageBoxItem/index'
const Index = (props) => {
	const { messages, username, handleDelete } = props

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
		<div class='messagebox'>
			<ul class='message-show-here'>{renderMessage()}</ul>
		</div>
	)
}

export default Index
