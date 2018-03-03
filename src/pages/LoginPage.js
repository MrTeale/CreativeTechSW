/* =============================================================================== */
// LOGIN PAGE COMPONENT
// ----------------------------
// Login.js
/* =============================================================================== */

// Library Imports
import React from 'react';
// Material UI
import {
	FontIcon, 
	RaisedButton, 
	FlatButton, 
	TextField
} from 'material-ui';
import muiThemeable from 'material-ui/styles/muiThemeable';
// Firebase
import {FirebaseAuth, loginWithGoogle, loginWithEmail, sendPasswordResetEmail, signupEmail} from "../helpers/Firebase";
// Local Imports
import Menu from '../menu/Menu';
// Constants
const FirebaseAuthKey = "FirebaseAuthInProgress";

/**
*	Login Page Class
*	@name LoginPage
*	@description Dedicated page for logging into account
*	@author Michael Smallcombe
*/
class LoginPage extends React.Component {
	/* =============================================================================== */
	// CONSTRUCTOR
	/* =============================================================================== */
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			width: '0',
			height: '0',
		};
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
	}
	componentDidMount() {
		// Redirect on login
		/*if(FirebaseAuth().currentUser !== null) {
			this.props.browserHistory.push('/');
		}*/

		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions);
	}
	componentWillMount() {
		window.removeEventListener('resize', this.updateWindowDimensions);
	}
	updateWindowDimensions() {
		this.setState({width: window.innerWidth, height: window.innerHeight});
    }
	
	/* =============================================================================== */
	// STATE MODIFIERS
	/* =============================================================================== */
	/* ================================= */
	// Handle Cancel
	// description:
	// hide login dialog box from user
	/* ================================= */
	handleCancel = () => {
		this.setState({open:false});
		this.props.hideLogin();
	}

	/* ================================= */
	// Handle Google Login
	// description:
	// process user's login using google authentication provider
	// to create a new user entry or verify against existing firebase users
	/* ================================= */
	// Handle Google Login
	handleGoogleLogin = () => {
			loginWithGoogle()
					.catch(function (error) {
							alert(error); // or show toast
							localStorage.removeItem(FirebaseAuthKey);
					});
			localStorage.setItem(FirebaseAuthKey, "1");
			this.setState({open:false});
			this.props.hideLogin();
	}

	/* ================================= */
	// Handle Email Login
	// description:
	// process user's login using email and password
	// fields, verifying directly with firebase
	/* ================================= */
	handleEmailLogin = () => {
		loginWithEmail(this.state.email, this.state.password)
				.catch(function (error) {
						alert(error); // or show toast
						localStorage.removeItem(FirebaseAuthKey);
				});
		localStorage.setItem(FirebaseAuthKey, "1");
		this.setState({open:false});
		this.props.hideLogin();
	}

	/* ================================= */
	// Handle Email Signup
	// description:
	// create user using provided email and password
	/* ================================= */
	handleEmailSignup = () => {
		signupEmail(this.state.email, this.state.password)
				.catch(function (error) {
						alert(error); // or show toast
						localStorage.removeItem(FirebaseAuthKey);
				});
		localStorage.setItem(FirebaseAuthKey, "1");
		this.setState({open:false});
		this.props.hideLogin();
	}

	/* ================================= */
	// Handle Password Reset
	// description:
	// send firebase's password reset email
	// to the email provided in the dialog box
	/* ================================= */
	handlePasswordReset = () => {
		sendPasswordResetEmail(this.state.email)
				.catch(function (error) {
						alert(error); // or show toast
						localStorage.removeItem(FirebaseAuthKey);
				});
		localStorage.setItem(FirebaseAuthKey, "1");
	}

	/* ================================= */
  	// On Change
	// description:
	// Update state set values of component
	// according to input event
	// parameters:
	// onChange Event event
  	/* ================================= */
	onChange = (event) => {
		// Set value of component according to input
		this.setState({[event.target.name]: event.target.value});
	}

	/* =============================================================================== */
	// COMPONENT RENDER
	/* =============================================================================== */
	render() {
        const pageStyle={
			backgroundColor: this.props.muiTheme.palette.canvasColor,
			height: (this.state.height)+'px'
        }
		const contentStyle={
			fontSize: 20,
			margin: '0 auto',
			marginTop: (this.state.height)/4 + 'px',
			width: '66%',
			height: ((this.state.height-80)/3 * 2) + 'px'
        }
        const position = {
			display: 'flex',
			flexDirection: 'column',
			height: '100%',
			alignItems:'center',
			justifyContent:'center',
			marginTop: (this.state.height)/8 + 'px',
		}
		const iconStyles = {
				color: "#ffffff"
		};

		const actions = [
			<FlatButton
				label="Cancel"
				onClick={this.handleCancel}
			/>
		];
		return (
			<div style={pageStyle}>
				<Menu />
				<div style={{textAlign: 'center', alignItems:'vertical'}}>
					<div style={position}>
						<div>
							<h2>Login</h2>
							<TextField
								id="login-email"
								ref="email"
								floatingLabelStyle={{color: this.props.muiTheme.palette.accent3}}
								textareaStyle={{color: this.props.muiTheme.palette.textColor}}
								inputStyle={{color: this.props.muiTheme.palette.textColor}}
								style={{textAlign:'center', margin:'0px', width:'100%'}}
								hintText="Email"
								floatingLabelText="Email"
								type="text"
								onChange={this.onChange}
							/>
							<br />
							<TextField
								id="login-password"
								ref="password"
								floatingLabelStyle={{color: this.props.muiTheme.palette.accent3}}
								textareaStyle={{color: this.props.muiTheme.palette.textColor}}
								inputStyle={{color: this.props.muiTheme.palette.textColor}}
								style={{margin: '0px', width: '100%'}}
								hintText="Password"
								floatingLabelText="Password"
								type="password"
								onChange={this.onChange}
							/>
							<br/>
							<FlatButton
								label="Forgot Password"
								onTouchTap={this.handlePasswordReset}
							/>
							<RaisedButton
								label="Sign in"
								labelColor={this.props.muiTheme.palette.textColor}
								backgroundColor={this.props.muiTheme.palette.primary1Color}
								onTouchTap={this.handleEmailLogin}
							/>
							<br />
							<h3 style={{margin:'5px'}}>OR</h3>
							<br />
							<RaisedButton
								style={{marginTop: '10px', width: '100%'}}
								label="Sign in with Google"
								labelColor={"#ffffff"}
								backgroundColor="#dd4b39"
								icon={<FontIcon className="fa fa-google-plus" style={iconStyles}/>}
								onTouchTap={this.handleGoogleLogin}
							/>
							<br />
							<RaisedButton
								style={{marginTop: '10px', width: '100%'}}
								label="New User? Sign Up"
								labelColor={this.props.muiTheme.palette.textColor}
								backgroundColor={this.props.muiTheme.palette.primary1Color}
								onTouchTap={this.handleEmailSignup}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

// Export Component
export default muiThemeable()(LoginPage);
