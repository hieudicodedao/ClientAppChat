const Reducer = (state, action) => {
	switch (action.type) {
		case 'UPDATE ROOM':
			return { ...state, room: action.payload }

		case 'UPDATE PASSWORD':
			return { ...state, password: action.payload }

		default:
			return state
	}
}
export default Reducer
