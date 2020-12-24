import React, { useEffect, useState } from 'react'
const Index = (props) => {
	const { message, username, index, handleDelete } = props
	const [sentTime, setSentTime] = useState('')
	const checkTime = () => {
		let [day, month, year] = new Date()
			.toLocaleDateString('en-GB')
			.split('/')
		let [hour, minute, second] = new Date()
			.toLocaleTimeString('en-GB')
			.split(/:| /)
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
		const { date } = message
		checkTime()
		setInterval(checkTime, 30000)
		return () => {
			clearInterval()
		}
	}, [])
	return (
		<>
			{message.username === username ? (
				<li class='your-mes message'>
					<i
						class='far fa-trash-alt'
						onClick={() => handleDelete(index, message)}
					></i>
					<div class='content'>
						<p class='text deleted'>{message.text}</p>
					</div>
					<p class='your-text-date'>Sent : {sentTime} </p>
				</li>
			) : (
				<li class='another-person-mes message'>
					<div className='name-text-date'>
						<h4 class='name'>{message.username}</h4>
					</div>

					<div class='content'>
						<p class='text'>{message.text}</p>
					</div>
					<p class='another-text-date'>Sent : {sentTime} </p>
				</li>
			)}
		</>
	)
}

export default Index
