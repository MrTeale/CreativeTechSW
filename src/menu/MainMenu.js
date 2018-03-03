/* =============================================================================== */
// MAIN MENU COMPONENT
// ----------------------------
// MainMenu.js
/* =============================================================================== */

// Library Imports
import React, {Component} from 'react';
import {
	Link
} from 'react-router-dom'
// Material UI
import {
	FlatButton,
} from 'material-ui';
// Material UI Icons
import SearchIcon from 'material-ui/svg-icons/action/search';
import AccountIcon from 'material-ui/svg-icons/action/account-circle';
import ContactUsIcon from 'material-ui/svg-icons/content/mail';
import muiThemeable from 'material-ui/styles/muiThemeable';

/**
*	Main Menu Class
*	@name Main Menu
*	@description Home Page Menu Component
*	@author Michael Smallcombe
*/
class MainMenu extends Component {
	/* =============================================================================== */
	// CONSTRUCTOR
	/* =============================================================================== */
	constructor(props) {
		super(props);
		this.state = {
			width: '0',
			height: '0',
		};
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
	}
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
		const menuStyle = {
			fontFamily: this.props.muiTheme.fontFamily,
			color: this.props.muiTheme.palette.alternateTextColor,
			margin: 'auto',
			position: 'relative',
			width: '100%',
			height: '100%',
			backgroundColor: 'rgba(0,0,0,0)',
			display: 'flex, -webkit-box, -moz-box, -ms-flexbox, -webkit-flex',
			flexFlow: 'row wrap',
			justifyContent: 'space-around',
		}
		const buttonIconStyle = {
			height: '80px',
			width: '80px',
			margin: '0 auto',
			marginTop: (this.state.width > 600) ? ((this.state.height-64)/9) : ((this.state.height-64)/16),
			overflowY: 'hidden'
		}
		const buttonLabelStyle = {
			top: '-20px',
			margin: '20px 0 0 0',
			padding: '0',
			display: 'block'
		}
		const buttonStyle = {
			color: this.props.muiTheme.palette.alternateTextColor,
			height: '100%',
			width: '33.33333333%'
		}
		const buttonSmallStyle = {
			color: this.props.muiTheme.palette.alternateTextColor,
			height: (this.state.height-80)/3 + 'px',
			width: '100%',
			minWidth: '200px',
			fontSize: '9pt'
		}
		/*const boxQuarterStyle = {
			height: (this.state.height-60)/3 + 'px',
			width: '25%',
			minHeight: '200px',
			fontSize: '10pt'
		}
		const boxSmallStyle = {
			height: (this.state.height-60)/4 + 'px',
			width: '100%',
			minWidth: '200px',
			fontSize: '9pt'
		}*/

		return (
			<div style={menuStyle}>
				<div style={{height: (this.state.height-80)/3 + 'px', width: '100%'}}>
					<FlatButton
						label="Authors"
						labelStyle={buttonLabelStyle}
						containerElement={<Link to={"/claim"}/>}
						style={
							this.state.width > 600 ? (
								{...buttonStyle, backgroundColor: 'rgba(0,0,0,0.8)'}
							) : (
								{...buttonSmallStyle, backgroundColor: 'rgba(0,0,0,0.8)'}
							)
						}
						hoverColor={this.props.muiTheme.palette.canvasColor}
						icon={
							<AccountIcon
								style={buttonIconStyle}
								color={this.props.muiTheme.palette.accent1Color} hoverColor={this.props.muiTheme.palette.canvasColor}
							/>
						}
					/>
					<FlatButton
						label="Explore"
						labelStyle={buttonLabelStyle}
						containerElement={<Link to={"/account"}/>}
						style={
							this.state.width > 600 ? (
								{...buttonStyle, backgroundColor: 'rgba(0,0,0,0.8)'}
							) : (
								{...buttonSmallStyle, backgroundColor: 'rgba(0,0,0,0.8)'}
							)
						}
						icon={
							<SearchIcon
								style={buttonIconStyle}
								color={this.props.muiTheme.palette.accent1Color}
								hoverColor={this.props.muiTheme.palette.canvasColor}
							/>
						}
					/>
					<FlatButton
						label="Contact"
						labelStyle={buttonLabelStyle}
						containerElement={<Link to={"/contact-us"}/>}
						style={
							this.state.width > 600 ? (
								{...buttonStyle, backgroundColor: 'rgba(0,0,0,0.8)'}
							) : (
								{...buttonSmallStyle, backgroundColor: 'rgba(0,0,0,0.8)'}
							)
						}
						icon={
							<ContactUsIcon
								style={buttonIconStyle}
								color={this.props.muiTheme.palette.accent1Color} hoverColor={this.props.muiTheme.palette.canvasColor}
							/>
						}
					/>
				</div>
			</div>
		);
	}
}

// Export Component
export default muiThemeable()(MainMenu);
