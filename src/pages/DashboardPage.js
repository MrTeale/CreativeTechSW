/* =============================================================================== */
// DASHBOARD PAGE COMPONENT
// ----------------------------
// DashboardPage.js
/* =============================================================================== */

// Library Imports
import React from 'react';
// Material UI
import RaisedButton from 'material-ui/RaisedButton';
import muiThemeable from 'material-ui/styles/muiThemeable';
// Local Imports
import Menu from '../menu/Menu';
import MainMenu from '../menu/MainMenu';

/**
*	Dashboard Page Class
*	@name DashboardPage
*	@description Page with dashboard utils
*	@author Michael Smallcombe
*/
class DashboardPage extends React.Component {
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
        const pageStyle={
            backgroundColor: this.props.muiTheme.palette.canvasColor
        }
		const contentStyle={
			fontSize: 20,
			margin: '0 auto',
			marginTop: (this.state.height)/4 + 'px',
			width: '66%',
			height: ((this.state.height-80)/3 * 2) + 'px'
        }
        
		return (
			<div style={pageStyle}>
				<Menu />
				<div style={{textAlign: 'center', alignItems:'vertical'}}>
					{
						this.state.width > 600 && (
							<div style={contentStyle}>
                                <p>
                                    CONTENT REQUIRED
                                </p>
                            </div>
						)
					}
				</div>
			</div>
		);
	}
}

// Export Component
export default muiThemeable()(DashboardPage);
