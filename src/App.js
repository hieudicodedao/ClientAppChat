import Login from '../src/Components/Login/Login'
import ChatBox from '../src/Components/ChatBox/index'
import { BrowserRouter as Router, Route } from 'react-router-dom'
function App() {
	return (
		<Router>
			<Route exact path='/' component={Login}></Route>
			<Route path='/chat/:room' component={ChatBox}></Route>
		</Router>
	)
}

export default App
