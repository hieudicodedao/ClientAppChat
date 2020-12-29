import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './Components/NewLogin/Login'
import LoginRegister from './Components/NewLoginRegister/LoginRegister'
import Room from './Components/NewRoom/Room'
import RoomRegister from './Components/NewRoomRegister/RoomRegister'
import ChatBoxWrap from '../src/Components/ChatBoxWrap/ChatBoxWrap'

function App() {
	return (
		// <Router>
		// 	<Route exact path='/' component={Login}></Route>
		// 	<Route path='/chat/:room' component={ChatBox}></Route>
		// </Router>
		// <LoginX />

		<Router>
			<Route exact path='/login' component={Login} />
			<Route exact path='/login/signup' component={LoginRegister} />
			<Route exact path='/chat/:room' component={ChatBoxWrap}></Route>
			<Route exact path='/oke' children={<h1>oke</h1>}></Route>
			<Route exact path='/room' component={Room} />
			<Route exact path='/room/create' component={RoomRegister} />
		</Router>
	)
}

export default App
