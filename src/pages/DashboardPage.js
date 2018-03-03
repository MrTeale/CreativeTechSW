/* =============================================================================== */
// DASHBOARD PAGE COMPONENT
// ----------------------------
// DashboardPage.js
/* =============================================================================== */

// Library Imports
import React from 'react';
// Material UI
import muiThemeable from 'material-ui/styles/muiThemeable';
import {
	FlatButton,
	Divider,
	Subheader
} from 'material-ui';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';

import ActionInfo from 'material-ui/svg-icons/action/info';
// Local Imports
import Menu from '../menu/Menu';

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
			backgroundColor: this.props.muiTheme.palette.canvasColor,
			height: (this.state.height)+'px',
			width: '100%'
        }
		const contentStyle={
			fontFamily: this.props.muiTheme.fontFamily,
			color: this.props.muiTheme.palette.textColor,
			margin: '0 auto',
			marginTop: (this.state.height)/4 + 'px',
			position: 'relative',
			width: '80%',
			height: '100%',
			backgroundColor: 'rgba(0,0,0,0)',
			display: 'flex, -webkit-box, -moz-box, -ms-flexbox, -webkit-flex',
			justifyContent: 'space-around',
			alignItems: 'center',
		}
		const flexContainer = {
			alignItems: 'center',
			display: 'flex',
			flexDirection: 'row',
			padding: 0,
		}

		return (
			<div style={pageStyle}>
				<Menu />
				<div style={{textAlign: 'center'}}>
					{
						this.state.width > 600 && (
							<div style={contentStyle}>
								<h2>Projects</h2>
								<List style={flexContainer}>
									<ListItem
										key="appid1"
										primaryText="Altus Analyst"
										nestedItems={[
											<Subheader>Tests</Subheader>,
											<ListItem
												primaryText="Interface Colours"
											/>
										]}
									/>
									<ListItem 
										key="appid2"
										primaryText="Intergreat"
									/>
									<ListItem 
										key="appid3"
										primaryText="That App" 
									/>
									<ListItem 
										primaryText="SoleMate"
										key="appid4"
									/>
								</List>
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
