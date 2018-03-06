/* =============================================================================== */
// DEMO TEST PAGE COMPONENT
// ----------------------------
// DemoTestPage.js
/* =============================================================================== */

// Library Imports
import React from 'react';
// Material UI
import muiThemeable from 'material-ui/styles/muiThemeable';
import {
	TextField,
	Toggle,
	RadioButtonGroup,
	RadioButton,
	RaisedButton
} from 'material-ui';
// Local Imports
import Menu from '../menu/Menu';

/**
*	Demo Test Page Class
*	@name DemoTestPage
*	@description Static demo test page to work with the backend
*	@author Michael Smallcombe
*/
class DemoTestPage extends React.Component {
	/* =============================================================================== */
	// CONSTRUCTOR
	/* =============================================================================== */
	constructor(props) {
		super(props);
		this.state = {
			width: '0',
			height: '0',
			question1: false,
			question2: 3,
			question3: 0,
			question4: ""
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
	// STATE MODIFIERS RENDER
	/* =============================================================================== */
    /* ================================= */
	// On Change
	// description:
	// Update value state of component
	// according to input event
	// parameters:
	// onChange Event event
	/* ================================= */
	onChange = (event) => {
		// Set value of component according to input
		this.setState({[event.target.name]: event.target.value});
	}
	submitForm = () => {
		let answers = [this.state.question1, this.state.question2, this.state.question3, this.state.question4];
		console.log(JSON.stringify({"answers": answers}));
		let targetUrl = 'https://us-central1-interview-your-app.cloudfunctions.net/datastore';
			fetch(targetUrl, {
				method: 'POST',
				headers: {
					'Origin': 'interview-your-app.appspot.com',
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*'
				},
				data: {body: JSON.stringify({"answers": answers})}
			})
			.then(response => response.json())
			.then(body => console.log(body));
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
			marginTop: '80px',
			width: '66%',
			height: ((this.state.height-80)/3 * 2) + 'px'
        }
        
		return (
			<div style={pageStyle}>
				<Menu />
				<div style={{textAlign: 'center', alignItems:'vertical'}}>
					<div style={contentStyle}>
						<p>1. Would you do another startup weekend (if it was similar to this event)?</p>
						<Toggle
							name="question1"
							value={this.state.question1}
							onChange={this.onChange}
						/>
						<br/>
						<p>2. Say a quick Thank You to the team behind this amazing event</p>
						<RadioButtonGroup 
							name="question2" 
							defaultSelected="3" 
							onChange={this.onChange} 
							valueSelected={this.state.question2}
							style={{color: this.props.muiTheme.palette.primary2Color}}
						>
							<RadioButton
								iconStyle={{color: this.props.muiTheme.palette.primary2Color}}
								value="1"
								label="1"
							/>
							<RadioButton
								iconStyle={{color: this.props.muiTheme.palette.primary2Color}}
								value="2"
								label="2"
							/>
							<RadioButton
								iconStyle={{color: this.props.muiTheme.palette.primary2Color}}
								value="3"
								label="3"
							/>
							<RadioButton
								iconStyle={{color: this.props.muiTheme.palette.primary2Color}}
								value="4"
								label="4"
							/>
							<RadioButton
								iconStyle={{color: this.props.muiTheme.palette.primary2Color}}
								value="5"
								label="5"
							/>
						</RadioButtonGroup>
						<br/>
						<p>3. How many hours were working hours? (when the workspace was open)</p>
						<TextField
							hintStyle={{color: this.props.muiTheme.palette.primary2Color}}
							floatingLabelStyle={{color: this.props.muiTheme.palette.primary2Color}}
							name="question3"
							type="number"
							hintText="Question 3"
							floatingLabelText="Hours"
							value={this.state.question3}
							onChange={this.onChange}
							required
						/>
						<br/>
						<p>4. Say a quick Thank You to the team behind this amazing event</p>
						<TextField
							hintStyle={{color: this.props.muiTheme.palette.primary2Color}}
							floatingLabelStyle={{color: this.props.muiTheme.palette.primary2Color}}
							name="question4"
							type="text"
							hintText="Leave a message..."
							floatingLabelText="Leave a message"
							value={this.state.question4}
							onChange={this.onChange}
							multiLine={true}
							rows={2}
							required
						/>
						<br/>
						<RaisedButton
							label="Submit"
							disableTouchRipple={true}
							disableFocusRipple={true}
							onTouchTap={this.submitForm}
						/>
					</div>
				</div>
			</div>
		);
	}
}

// Export Component
export default muiThemeable()(DemoTestPage);
