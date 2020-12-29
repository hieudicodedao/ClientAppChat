import React, { useState } from 'react'

const Index = (props) => {
	const { sendMessage } = props
	const [msg, setMsg] = useState('')
	const handleChange = (e) => {
		e.preventDefault()
		setMsg(e.target.value)
	}
	const handleSubmit = (e) => {
		e.preventDefault()
		let [day, month, year] = new Date()
			.toLocaleDateString('en-GB')
			.split('/')
		let [hour, minute, second] = new Date()
			.toLocaleTimeString('en-GB')
			.split(/:| /)
		let obj_date = {
			d: day,
			mo: month,
			y: year,
			h: hour,
			mi: minute,
			s: second,
		}
		sendMessage(msg, obj_date)
		setMsg('')
	}
	return (
		<div className='textmes-btn'>
			<form action=''>
				<input
					type='text'
					className='textmes'
					placeholder='Your message here ...'
					name='msg'
					value={msg}
					id='msg'
					onChange={(e) => handleChange(e)}
				/>
				<button className='btn-enter' onClick={(e) => handleSubmit(e)}>
					{/* Send */}
					<i className='fas fa-paper-plane'></i>
				</button>
			</form>
		</div>
	)
}

export default Index
