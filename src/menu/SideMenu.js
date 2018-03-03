/* =============================================================================== */
// MENU COMPONENT
// ----------------------------
// Menu.js
/* =============================================================================== */

// Library Imports
import React, {Component} from 'react';
import {
	Link
} from 'react-router-dom'
// Material UI
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import FaceIcon from 'material-ui/svg-icons/action/face';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import muiThemeable from 'material-ui/styles/muiThemeable';
// Firebase
import {logout, FirebaseAuth} from "../helpers/Firebase";
// Debug
import {Debug, DebugLevel} from "../helpers/Debug";
// Local Classes
import Login from '../login/Login';
// Assets
import Logo from '../assets/images/iObject.svg';

/**
*	Menu Class
*	@name Menu
*	@description Side Menu Component
*	@author Michael Smallcombe
*/
class Menu extends Component {
	/* =============================================================================== */
  	// CONSTRUCTOR
  	/* =============================================================================== */
	constructor(props) {
		super(props);

		// Populate user state object if current user exists
		let user = (FirebaseAuth().currentUser !== null) ? (
			{
				id: FirebaseAuth().currentUser.uid,
				name: FirebaseAuth().currentUser.displayName,
				email: FirebaseAuth().currentUser.email,
				photo: (FirebaseAuth().currentUser.photoURL != null) ? (FirebaseAuth().currentUser.photoURL) : (null)
			}
		) : (
			null
		);

		// Set Initial State
		this.state = {
			open: false,
			showLogin: false,
			loggedIn: (user !== null),
			user: user,
		}
	}

	/* =============================================================================== */
	// STATE MODIFIERS
	/* =============================================================================== */
	/* ================================= */
  	// Show Login Overlay
  	// description:
	// sets login overlay to open and
	// closes the open side menu
  	/* ================================= */
	showLoginOverlay = () => this.setState({
		showLogin:true,
		open:false
	});

	/* ================================= */
  // Hide Login Overlay
  // description:
	// hides login overlay and
	// closes the open side menu
  /* ================================= */
	hideLoginOverlay = () => this.setState({
		showLogin:false,
		open:false
	});

	/* ================================= */
  // Handle Logout
  // description:
	// triggers Firebase logout procedure
	// and updates component state
  /* ================================= */
	handleLogout = () => {
		logout().then(function () {
			Debug.output(DebugLevel.MILD, "Menu (handleLogout)", "User Logged Out from Firebase");
		});
		this.setState({
			loggedIn: false,
			open: false
		});
	}

	/* ================================= */
	// Handle Toggle
	// description:
	// toggles the menu component to open/close
	// according to opposite of the state
	// that is currently set
	/* ================================= */
	handleToggle = () => this.setState({
		open: !this.state.open
	});

	/* =============================================================================== */
	// COMPONENT RENDER
	/* =============================================================================== */
	render() {
		const style = {
			position: "fixed",
			height: "auto",
			backgroundColor: this.props.muiTheme.palette.accent1Color,
			minWidth: '330px'
		}
		const titleStyle = {
			fontFamily: "refrigerator-deluxe, sans-serif",
			fontStyle: "normal",
			fontWeight: 400,
			textAlign: "center",
			backgroundColor: this.props.muiTheme.palette.accent1Color,
			backgroundImage: "url("+Logo+")",
			backgroundSize: '250px 50px',
			backgroundRepeat: "no-repeat",
			backgroundPosition: "center"
		}

		return (
			<div>
				<AppBar
					style={style}
					titleStyle={titleStyle}
					iconElementLeft={<IconButton onTouchTap={this.handleToggle}><MenuIcon /></IconButton>}
				/>
				<Drawer
					docked={false}
					open={this.state.open}
					onRequestChange={(open) => this.setState({open})}
				>
					{this.state.loggedIn === true ? (
						<MenuItem
							disabled
							style={{marginTop: 10, minHeight: 100, textAlign: 'center'}}
							primaryText={(this.state.user.name != null) ? this.state.user.name : this.state.user.email}
						>
							<Avatar
								color={this.props.muiTheme.palette.alternateTextColor} backgroundColor={this.props.muiTheme.palette.accent1Color}
								src={this.state.user.photo}
								icon={<FaceIcon />}
							/>
						</MenuItem>
					) : null}
					<Divider />
					<MenuItem
						onClick={this.handleToggle}
						containerElement={<Link to="/" />}
						primaryText="Home"
					/>
					{this.state.loggedIn === false ? (
						<MenuItem
							onClick={this.showLoginOverlay}
							primaryText="Login"
						/>
					):(
						<div>
							<MenuItem
								onClick={this.handleLogout}
								primaryText="Logout"
							/>
						</div>
					)}
				</Drawer>
				<div>
					<Login hideLogin={this.hideLoginOverlay} open={this.state.showLogin}/>
				</div>
			</div>
		);
	}
}

// Export Component
export default muiThemeable()(Menu);
