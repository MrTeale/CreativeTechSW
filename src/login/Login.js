/* =============================================================================== */
// LOGIN DIALOG COMPONENT
// ----------------------------
// login.js
/* =============================================================================== */

// Library Imports
import React from 'react';
// Material UI
import {FontIcon, RaisedButton, FlatButton, TextField, Dialog} from "material-ui";
import muiThemeable from 'material-ui/styles/muiThemeable';
// Firebase
import {loginWithGoogle, loginWithEmail, sendPasswordResetEmail, signupEmail} from "../helpers/Firebase";
// Constants
const FirebaseAuthKey = "FirebaseAuthInProgress";

/**
*	Login Class
*	@author Michael Smallcombe
*/
class Login extends React.Component {
	/* =============================================================================== */
	// CONSTRUCTOR
	/* =============================================================================== */
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			open: this.props.open,
		};
	}

	// Handle Incoming Properties
	componentWillReceiveProps(props) {
		this.setState({open: props.open});
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
		const position = {
			display: 'flex',
			flexDirection: 'column',
			height: '100%',
			alignItems:'center',
			justifyContent:'center'
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
			<Dialog
				autoDetectWindowHeight
				title="Login"
				bodyStyle={{height:'100%', width:'100%'}}
				titleStyle={{height:'30px', padding:'24px', paddingTop:'10px', paddingBottom:'0px'}}
				actions={actions}
				open={this.state.open}
				modal={false}
				onRequestClose={this.handleCancel}
			>
			<div style={position}>
				<div style={{}}>
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
							labelColor={this.props.muiTheme.palette.alternateTextColor}
							backgroundColor={this.props.muiTheme.palette.primary1Color}
							onTouchTap={this.handleEmailLogin}
					/>
				</div>
				<h3 style={{margin:'5px'}}>OR</h3>
				<div>
					<hr style={{margin:'2px', padding: '0px'}}/>
					<RaisedButton
							label="Sign in with Google"
							labelColor={"#ffffff"}
							backgroundColor="#dd4b39"
							icon={<FontIcon className="fa fa-google-plus" style={iconStyles}/>}
							onTouchTap={this.handleGoogleLogin}
					/>
					<RaisedButton
							label="New User? Sign Up"
							labelColor={this.props.muiTheme.palette.alternateTextColor}
							backgroundColor={this.props.muiTheme.palette.primary1Color}
							onTouchTap={this.handleEmailSignup}
					/>
				</div>
			</div>
			</Dialog>
		);
	}
}

// Export Component
export default muiThemeable()(Login);
