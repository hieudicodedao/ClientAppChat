import React from 'react'
const Index = (props) => {
	const { room, username, handleExitRoom } = props
	return (
		<div class='status-room'>
			<div class='user-name'>
				<i class='fas fa-dot-circle'></i>
				<p class='user'>{username}</p>
			</div>
			<div class='room-name'>
				<i class='fas fa-dot-circle'></i>
				<p>Room: {room}</p>
			</div>
			<div
				class='button-close'
				onClick={(e) => {
					e.preventDefault()
					handleExitRoom()
				}}
			>
				<i class='fas fa-times-circle close-btn'></i>
			</div>
		</div>
	)
}

export default Index
