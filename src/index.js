/* =============================================================================== */
// INDEX
// ----------------------------
// index.js
/* =============================================================================== */

// Library Imports
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
// Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
	red700,
	grey300,
	grey900,
	orange500,
	blueGrey50,
	white, black, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
// Local Imports
import App from './App.js';

// Theme Settings
const muiTheme = getMuiTheme({
	fontFamily: 'Roboto, sans-serif',
	palette: {
		primary1Color: darkBlack,
		primary2Color: orange500,
		primary3Color: white,
		accent1Color: orange500,
		accent2Color: grey300,
		accent3Color: blueGrey50,
		textColor: white,
		alternateTextColor: black,
		canvasColor: grey900,
		borderColor: grey300,
		pickerHeaderColor: red700,
		shadowColor: fullBlack,
	},
});

/**
*	Index Class
*	@name Index
*	@description Main react component for application
*	@author Michael Smallcombe
*/
export class Index extends Component {
	componentWillMount() {
		// Reset Body Spacing
		document.body.style.margin = 0;
	}

	render() {
		return <MuiThemeProvider muiTheme={muiTheme}><App /></MuiThemeProvider>;
	}
}

// React Render Function
ReactDOM.render(<Index/>, document.getElementById('root'));
