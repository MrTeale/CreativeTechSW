/* =============================================================================== */
// APP COMPONENT
// ----------------------------
// App.js
/* =============================================================================== */

// Library Imports
import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {BrowserRouter as Router, Route} from 'react-router-dom';
//import createBrowserHistory from 'history/lib/createBrowserHistory';
// Material UI
import CircularProgress from 'material-ui/CircularProgress';
import muiThemeable from 'material-ui/styles/muiThemeable';
// Firebase
import {FirebaseAuth} from "./helpers/Firebase";
// Debug
import {Debug, DebugLevel} from './helpers/Debug';
// Local Imports
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import TestBuilderPage from './pages/TestBuilderPage';
import LoginPage from './pages/LoginPage';

// Inject Tap Event
injectTapEventPlugin();

/**
*	App Class
*	@name App
*	@description Handles app routes and user authentication process
*	@author Michael Smallcombe
*/
class App extends React.Component {
	/* =============================================================================== */
	// CONSTRUCTOR
	/* =============================================================================== */
	constructor() {
		super();
		this.state = {
			authenticated: false,
			loading: true,
			width: '0',
			height: '0'
		}
	}

	/* =============================================================================== */
	// REACT COMPONENT DEFAULTS
	/* =============================================================================== */
	componentDidMount() {
		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions);
	}

	componentWillMount() {
		// Remove Resize Event Listener
		window.removeEventListener('resize', this.updateWindowDimensions);

		// Handle user authentication through firebase listener
		this.authListener = FirebaseAuth().onAuthStateChanged(user => {
			if (user) {
				// Update Authenticated Status
				this.setState({
					authenticated: true,
					loading: false
				});

				// Verify Email
				if(!user.emailVerified) {
					user.sendEmailVerification();
				}

				//Debug User
				Debug.output(DebugLevel.MILD, "App (ComponentDidMount - User Auth Change)", JSON.stringify(user));

				/*// Redirect Page
				const {history} = this.props;
				history.replaceState(null, '/account');*/
			} else {
				// Update Authenticated Status
				this.setState({
					authenticated: false,
					loading: false
				});
			}
		});
	}

	componentWillUnmount() {
		// Handle firebase authentication listener
		this.authListener();
	}

	/* =============================================================================== */
	// HELPERS
	/* =============================================================================== */
	/* ================================= */
	// Update Window Dimensions
	// description:
	// Updates the width and height states
	// with the current window dimensions
	/* ================================= */
	updateWindowDimensions = () => {
		this.setState({width: window.innerWidth, height: window.innerHeight});
	}

	/* =============================================================================== */
	// COMPONENT RENDER
	/* =============================================================================== */
	render() {
		// Default Page Styling
		const style = {
			color: this.props.muiTheme.palette.textColor,
			fontFamily: this.props.muiTheme.fontFamily,
			minWidth: '330px'
		}

		// Home Route Component
		const Home = () => (
			<div>
				<HomePage />
			</div>
		)
		// Dashboard Route Component
		const Dashboard = () => (
			<div>
				<DashboardPage />
			</div>
		)
		// Login Route Component
		const Login = () => (
			<div>
				<LoginPage />
			</div>
		)
		// Test Builder Route Component
		const TestBuilder = () => (
			<div>
				<TestBuilderPage />
			</div>
		)

		// Authentication Loading
		if(this.state.loading) {
			return (
				<div style={{...style, textAlign:"center", position:"absolute", top: (this.state.height/2)-200, left: (this.state.width/2)-160, color: this.props.muiTheme.palette.alternateTextColor}}>
					<h2>Loading</h2>
					<CircularProgress size={80} thickness={8} color={this.props.muiTheme.palette.primary2Color}/>
				</div>
			)
		} else {
			//let browserHistory = createBrowserHistory();

			// Main Content
			return (
				<Router /*history={browserHistory}*/>
					<div style={style}>
						<Route exact path="/" component={Home}/>
						<Route exact path="/dashboard" component={Dashboard}/>
						<Route exact path="/login" component={Login}/>
						<Route exact path="/create-test" component={TestBuilder}/>
					</div>
				</Router>
			)
		}
	}
}

// Export Component
export default muiThemeable()(App);
