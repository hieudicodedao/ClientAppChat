const Reducer = (state, action) => {
	switch (action.type) {
		case 'UPDATE USER NAME':
			return { ...state, username: action.payload }

		case 'UPDATE PASSWORD FOR USER NAME':
			return { ...state, usernamepass: action.payload }

		default:
			return state
	}
}
export default Reducer
