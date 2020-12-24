import React, { useReducer } from 'react'
import NontificationItem from '../Login-nontification-item/item'
const Loginnontificaton = ({ error }) => {
	const renderListError = () => {
		const errorList = error
		return errorList.map((error, index) => {
			return <NontificationItem error={error} key={index} />
		})
	}
	return (
		<div>
			<ul class='nontify'>{renderListError()}</ul>
		</div>
	)
}

export default Loginnontificaton
