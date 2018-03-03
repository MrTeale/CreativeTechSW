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
//import Logo from '';

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
		window.removeEventListener('resize', this.updateWindowDimensions);
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

	/* ================================= */
	// Handle Close
	// description:
	// sets the menu to a closed state
	/* ================================= */
	handleClose = (event) => this.setState({
		open: false,
		anchorEl: event.currentTarget
	});

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
		const style = {
			position: "fixed",
			height: "auto",
			backgroundColor: this.props.muiTheme.palette.primary1Color,
			minWidth: '330px'
		}
		const titleStyle = {
			fontFamily: "refrigerator-deluxe, sans-serif",
			fontStyle: "normal",
			fontWeight: 400,
			textAlign: "center",
			backgroundColor: this.props.muiTheme.palette.primary1Color,
			//backgroundImage: "url("+Logo+")",
			backgroundSize: "250px 50px",
			backgroundRepeat: "no-repeat",
			backgroundPosition: ((this.state.width)/2)-200 + 'px center'
		}
		const offset = {
			position:'relative',
			height:'65px'
		}

		return (
			<div>
				<AppBar
					style={style}
					onTitleTouchTap={this.handleToggle}
					titleStyle={
						// Reduce Logo Size for Smaller Screens
						(this.state.width > 500) ? (
							{...titleStyle, backgroundSize: "250px 50px", backgroundPosition: ((this.state.width)/2)-200 + 'px center'}
						) : (
							(this.state.width > 330) ? (
								{...titleStyle, backgroundSize: "200px 40px", backgroundPosition: ((this.state.width)/2)-166 + 'px center'}
							) : (
								{...titleStyle, backgroundSize: "200px 40px", backgroundPosition: "center"}
							)
						)}
					iconElementLeft={<IconButton onTouchTap={this.handleToggle}><MenuIcon /></IconButton>}
				/>
				<Drawer
					docked={false}
					open={this.state.open}
					onRequestChange={(open) => this.setState({open})}
					style={{backgroundColor: this.props.muiTheme.palette.primary1Color, color: this.props.muiTheme.palette.alternateTextColor}}
				>
					{this.state.loggedIn === true ? (
						<MenuItem
							containerElement={<Link to="/account" />}
							style={{marginTop: 10, minHeight: 100, textAlign: 'center'}}
							primaryText={(this.state.user.name != null) ? this.state.user.name : this.state.user.email}
						>
							<Avatar
								color={this.props.muiTheme.palette.alternateTextColor} backgroundColor={this.props.muiTheme.palette.primary1Color}
								src={this.state.user.photo}
								icon={<FaceIcon />}
							/>
						</MenuItem>
					) : null}
					<Divider />
					<MenuItem
						onClick={this.handleClose}
						containerElement={<Link to="/" />}
						primaryText="Home"
					/>
					<MenuItem
						onClick={this.handleClose}
						containerElement={<Link to="/claim" />}
						primaryText="Claim"
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
				<div style={offset}></div>
			</div>
		);
	}
}

// Export Component
export default muiThemeable()(Menu);
