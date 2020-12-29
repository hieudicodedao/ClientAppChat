import React from 'react'
const Index = (props) => {
	const { room, username, handleExitRoom } = props
	return (
		<div className='status-room'>
			<div className='user-name'>
				<i className='fas fa-dot-circle'></i>
				<p className='user'>{username}</p>
			</div>
			<div className='room-name'>
				<i className='fas fa-dot-circle'></i>
				<p>Room: {room}</p>
			</div>
			<div
				className='button-close'
				onClick={(e) => {
					e.preventDefault()
					handleExitRoom()
				}}
			>
				<i className='fas fa-times-circle close-btn'></i>
			</div>
		</div>
	)
}

export default Index
