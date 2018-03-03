/* =============================================================================== */
// HOME PAGE COMPONENT
// ----------------------------
// HomePage.js
/* =============================================================================== */

// Library Imports
import React from 'react';
// Material UI
import RaisedButton from 'material-ui/RaisedButton';
import muiThemeable from 'material-ui/styles/muiThemeable';
// Local Imports
import Menu from '../menu/Menu';
import MainMenu from '../menu/MainMenu';
// Assets
import VideoMP4 from '../assets/Meeting.mp4';

/**
*	Home Page Class
*	@name Home Page
*	@description Landing page for the IOBJECT site
*	@author Michael Smallcombe
*/
class HomePage extends React.Component {
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
		// Style Settings
		const overlayStyle = {
			backgroundColor: "rgba(0,0,0,0.8)",
			opacity: '20%',
			fontFamily: this.props.muiTheme.fontFamily,
			fontSize: 50,
			color: this.props.muiTheme.palette.alternateTextColor,
			position: "fixed",
			top: "50%",
			left: "50%",
			minWidth: "100%",
			minHeight: "100%",
			width: "auto",
			height: "auto",
			zIndex: "-100",
			transform: "translateX(-50%) translateY(-50%)",
			backgroundSize: "cover"
		}
		const slideStyle = {
			zIndex: -1,
			height: (this.state.height-64)/3 * 2 + 'px',
			maxHeight: (this.state.height-64)/3 * 2 + 'px',
			width: '100%'
		}
		const videoStyle = {
			position: "fixed",
			top: "50%",
			left: "50%",
			minWidth: "100%",
			minHeight: "100%",
			width: "auto",
			height: "auto",
			zIndex: "-100",
			transform: "translateX(-50%) translateY(-50%)",
			backgroundSize: "cover"
		}
		const contentStyle={
			fontSize: 20,
			margin: '0 auto',
			marginTop: (this.state.height)/4 + 'px',
			width: '66%',
			height: ((this.state.height-80)/3 * 2) + 'px'
		}
		/*const pageStyle = {
			position: 'relative',
			width: '100%',
			height: '100%',
			backgroundColor: 'rgba(0,0,0,0)',
			display: 'flex, -webkit-box, -moz-box, -ms-flexbox, -webkit-flex',
			flexFlow: 'row wrap',
			justifyContent: 'flex-start'
		}*/
		return (
			<div>
				<Menu />
				<div style={{textAlign: 'center', alignItems:'vertical'}}>
					{
						this.state.width > 600 && (
							<div style={slideStyle}>
								<video style={videoStyle} playsInline autoPlay muted loop>
									<source src={VideoMP4} type="video/mp4" />
								</video>
								<div ref="overlay" style={overlayStyle}>
									<div style={contentStyle}>
										<p>
											A customisable interviewing tool for qualitative research with in depth analysis using machine learning and natural language processing for report generation.
										</p>
										<p>
											Customisable test that allows for moderation and more accurate, quality data to be obtained while also saving time with inbuilt analysis 
										</p>
									</div>
								</div>
							</div>
						)
					}
					<MainMenu />
				</div>
			</div>
		);
	}
}

// Export Component
export default muiThemeable()(HomePage);
