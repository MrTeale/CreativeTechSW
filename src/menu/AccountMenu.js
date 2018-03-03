/* =============================================================================== */
// ACCOUNT MENU COMPONENT
// ----------------------------
// AccountMenu.js
/* =============================================================================== */

// Library Imports
import React, {Component} from 'react';
import {
	Link
} from 'react-router-dom'
// Material UI
import {
	Menu,
	MenuItem,
	IconButton,
	RaisedButton,
	Avatar
} from 'material-ui';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import FaceIcon from 'material-ui/svg-icons/action/face';
import DropDownIcon from 'material-ui/svg-icons/navigation/arrow-drop-down'
import AccountIcon from 'material-ui/svg-icons/action/account-circle';
import muiThemeable from 'material-ui/styles/muiThemeable';
// Firebase
import {logout, FirebaseAuth} from "../helpers/Firebase";
// Debug
import {Debug, DebugLevel} from '../helpers/Debug';
// Local Classes
import {truncate} from '../helpers/Functions';
import Login from '../login/Login';

/**
*	Account Menu Class
*	@name Account Menu
*	@description Account Menu Component
*	@author Michael Smallcombe
*/
class AccountMenu extends Component {
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
	// Handle Toggle
	// description:
	// toggles the menu component to open/close
	// according to opposite of the state
	// that is currently set
	/* ================================= */
	handleToggle = (event) => this.setState({
		open: !this.state.open,
		anchorEl: event.currentTarget
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

	/* =============================================================================== */
	// HELPERS
	/* =============================================================================== */
	/* ================================= */
	// Update Window Dimensions
	// description:
	// Updates the width and height states
	// with the current window dimensions
	/* ================================= */
	updateWindowDimensions = () => this.setState({
		width: window.innerWidth,
		height: window.innerHeight
	});

	/* =============================================================================== */
	// COMPONENT RENDER
	/* =============================================================================== */
	render() {
		const FullLabel = () => (
			<span>
				{truncate(this.state.user.name, 20)}
				<DropDownIcon
					style={{position: "relative", top: "50%", transform: "translateY(-50%)"}}
					color={this.props.muiTheme.palette.alternateTextColor}
				/>
			</span>
		)

		const SmallLabel = () => (
			<span>
				<DropDownIcon
					style={{position: "relative", top: "50%", transform: "translateY(-50%)"}}
					color={this.props.muiTheme.palette.alternateTextColor}
				/>
			</span>
		)

		return (
			<div>
				{this.state.loggedIn === true ? (
					<div style={{color: this.props.muiTheme.palette.alternateTextColor}}>
						{(this.state.width < 400) ? (
							<IconButton
								onTouchTap={this.handleToggle}
								tooltip="Account"
								style={{backgroundColor: this.props.muiTheme.palette.primary1Color}}
								iconStyle={{color: this.props.muiTheme.palette.alternateTextColor}}
							>
								<AccountIcon  />
							</IconButton>
						) : (
							<RaisedButton
								onTouchTap={this.handleToggle}
								style={{marginTop: '5px'}}
								primary={true}
								labelStyle={{color: this.props.muiTheme.palette.alternateTextColor}}
								label={
									(this.state.width > 800) ? (
										<FullLabel />
									) : (
										<SmallLabel />
									)
								}
								labelPosition="after"
								icon={
										<Avatar
											size={30}
											color={this.props.muiTheme.palette.alternateTextColor}
											backgroundColor={this.props.muiTheme.palette.accent1Color}
											src={this.state.user.photo}
											icon={<FaceIcon />}
										/>
								}
							/>
						)}
						<Popover
							open={this.state.open}
							onRequestClose={this.handleClose}
							anchorEl={this.state.anchorEl}
							anchorOrigin={{horizontal: "right", vertical: "bottom"}}
							targetOrigin={{horizontal: "right", vertical: "top"}}
							animation={PopoverAnimationVertical}
						>
							<Menu>
								<MenuItem
									containerElement={<Link to="/account" />}
									primaryText="Account"
								/>
								<MenuItem
									containerElement={<Link to="/claims" />}
									primaryText="View Claims" />
								<MenuItem
									primaryText="Sign out"
									onClick={this.handleLogout}
								/>
							</Menu>
						</Popover>
					</div>
				) : (
					<RaisedButton
						style={{marginTop: '5px'}}
						label="Login"
						primary={true}
						onTouchTap={this.showLoginOverlay}
					/>
				)}
				<div>
					<Login hideLogin={this.hideLoginOverlay} open={this.state.showLogin}/>
				</div>
			</div>
		);
	}
}

// Export Component
export default muiThemeable()(AccountMenu);
