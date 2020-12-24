const Reducer = (state, action) => {
	switch (action.type) {
		case 'ALREADY LOGIN':
			console.log('called')
			return { ...state, isLogin: true }
		case 'ALREADY LOGOUT':
			return { ...state, isLogin: false }
		default:
			return state
	}
}
export default Reducer
