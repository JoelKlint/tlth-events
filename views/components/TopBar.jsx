import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';

export default class TopBar extends Component {
	constructor(props) {
		super(props);
		this.renderLoggedOutButtons = this.renderLoggedOutButtons.bind(this);
	}
	render() {
		const styles = {
			base: {
				display: 'flex',
				padding: '0.5em 3em',
				alignItems: 'center',
				flexShrink: '0',
				boxShadow: '0px 2px 3px 1px #ccc',
				backgroundColor: '#3366ff',
				justifyContent: 'flex-end'
			}
		}
		return (
			<div style={styles.base}>
				<FlatButton
					label='Subscribe'
				/>
			{this.props.loggedIn ?
				this.renderLoggedInButtons() : this.renderLoggedOutButtons()}

			</div>
		)
	}

	renderLoggedOutButtons() {
		return (
			<div>
				<FlatButton
					label='Login'
					linkButton={true}
					href='/login'
				/>
			</div>
		)
	}

	renderLoggedInButtons() {
		return (
			<div>
				<FlatButton
					label='Add event'
				/>
				<FlatButton
					label='Dashboard'
				/>
				<FlatButton
					label='Logout'
					linkButton={true}
					href='/logout'
				/>
			</div>
		)
	}
}
