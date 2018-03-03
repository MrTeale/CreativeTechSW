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
	red700,	red900,	//redA700,
	//grey100,
	grey300, //grey800,
	grey900,
	//brown500,
	white, black, darkBlack, fullBlack,
	purple900,
	yellow900
} from 'material-ui/styles/colors';
// Local Imports
import App from './App.js';

// Theme Settings
const muiTheme = getMuiTheme({
	fontFamily: 'Roboto, sans-serif',
	palette: {
		primary1Color: purple900,
		primary2Color: grey900,
		primary3Color: white,
		accent1Color: 'rgb(255, 193, 0)',
		accent2Color: grey300,
		accent3Color: yellow900,
		textColor: darkBlack,
		alternateTextColor: white,
		canvasColor: white,
		borderColor: grey300,
		pickerHeaderColor: red700,
		shadowColor: fullBlack,
	},
});

/**
*	Index Class
* @name Index
* @description Main react component for application
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
