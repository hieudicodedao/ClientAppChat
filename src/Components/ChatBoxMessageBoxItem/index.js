import React, { useEffect, useState } from 'react'
const Index = (props) => {
	const { message, username, handleDelete } = props
	const [sentTime, setSentTime] = useState('')

	const checkTime = () => {
		let [day, month, year] = new Date()
			.toLocaleDateString('en-GB')
			.split('/')
		let [hour, minute] = new Date().toLocaleTimeString('en-GB').split(/:| /)
		let { date } = message
		if (
			parseInt(date.y) === parseInt(year) &&
			parseInt(date.mo) === parseInt(month) &&
			parseInt(date.d) === parseInt(day)
		) {
			if (parseInt(date.h) !== parseInt(hour)) {
				if (parseInt(hour) - parseInt(date.h) === 1) {
					let time = 60 - parseInt(date.mi) + parseInt(minute)
					if (time < 60) {
						setSentTime(time + 'minutes ago')
						return
					}
				}
				setSentTime(`${parseInt(hour) - parseInt(date.h)} hours ago`)
				return
			}
			if (parseInt(date.mi) !== parseInt(minute)) {
				setSentTime(
					`${parseInt(minute) - parseInt(date.mi)} minutes ago`,
				)
				return
			} else {
				setSentTime('Just now')
				return
			}
		}

		setSentTime(
			`${date.h}:${date.mi}:${date.s} ${date.d}/${date.mo}/${date.y}`,
		)
	}
	useEffect(() => {
		checkTime()
		setInterval(checkTime, 30000)
		return () => {
			clearInterval()
		}
	})
	return (
		<>
			{message.username === username ? (
				<li className='your-mes message'>
					{!message.isDelete ? (
						<i
							className='far fa-trash-alt'
							onClick={() => handleDelete(message)}
						></i>
					) : null}
					<div className='content'>
						{message.isDelete ? (
							<p className=' deleted'>{message.text}</p>
						) : (
							<p className='text'>{message.text}</p>
						)}
					</div>
					<p className='your-text-date'>Sent : {sentTime} </p>
				</li>
			) : (
				<li className='another-person-mes message'>
					<div className='name-text-date'>
						<h4 className='name'>{message.username}</h4>
					</div>

					<div className='content'>
						{message.isDelete ? (
							<p className='deleted'>{message.text}</p>
						) : (
							<p className='text'>{message.text}</p>
						)}
					</div>
					<p className='another-text-date'>Sent : {sentTime} </p>
				</li>
			)}
		</>
	)
}

export default Index
