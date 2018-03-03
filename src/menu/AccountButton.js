//!!!
//!!!  TO BE IMPLEMENTED
//!!!
//!!!
/* =============================================================================== */
// ACCOUNT BUTTON COMPONENT
// ----------------------------
// AccountButton.js
/* =============================================================================== */

// Library Imports
import React, {Component} from 'react';
import {
	Link
} from 'react-router-dom'
// Material UI
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Menu from 'material-ui/Menu';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Avatar from 'material-ui/Avatar';
import FaceIcon from 'material-ui/svg-icons/action/face';
import DropDownIcon from 'material-ui/svg-icons/navigation/expand-more'
import AccountIcon from 'material-ui/svg-icons/action/account-circle';
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
*	Account Button Class
* @name Account Button
* @description Account Menu and Login Button
*	@author Michael Smallcombe
*/
class AccountButton extends Component {
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

		// Update Dimensions
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
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
	updateWindowDimensions() {
		this.setState({width: window.innerWidth, height: window.innerHeight});
	}

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

		// Login Button for Login Dialog display
		const LoginButton = {
			<RaisedButton
				label="Login"
				primary={true}
				onTouchTap={this.showLoginOverlay}
			/>
		}

		return (
			{this.state.loggedIn === true ? (
			{(this.state.width < 400) ? (
				<IconButton
					onTouchTap={this.handleToggle}
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
							this.state.user.name
						) : (
							(this.state.width > 400) ? (
								<DropDownIcon />
							) : (
								null
							)
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
			) : (
				<LoginButton />
			)}
		);
	}
}

// Export Component
export default muiThemeable()(AccountMenu);
