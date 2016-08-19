import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import isNil from 'lodash/isNil'

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

    const subscribeClick = () => {
      if( isNil(this.props.subscribeLink) ) {
        alert('Choose a guild')
      }
    }

		return (
			<div style={styles.base}>
				<FlatButton
					label='Subscribe'
          href={ this.props.subscribeLink}
          linkButton={ isNil(this.props.subscribeLink) ? false : true}
          onTouchTap={subscribeClick}
				/>
			{this.props.loggedIn ?
				this.renderLoggedInButtons() : this.renderLoggedOutButtons()}

			</div>
		)
	}

	renderLoggedOutButtons() {
		let counter = 1;
		const buttons = [];
		buttons.push(
			<FlatButton
				label='Login'
				linkButton={true}
				href='/login'
				key={counter++}
			/>
		);
		return buttons;
	}

	renderLoggedInButtons() {
		let counter = 1;
		const buttons = [];
		buttons.push(
			<FlatButton
				label='Dashboard'
				key={counter++}
			/>
		);

		!this.props.userIsAdmin ? '' : buttons.push(
			<FlatButton
				label='Add event'
				onTouchTap={this.props.openEventEditor}
				key={counter++}
			/>
		);

		buttons.push(
			<FlatButton
				label='Logout'
				linkButton={true}
				href='/logout'
				key={counter++}
			/>
		);
		return buttons;
	}
}

TopBar.propTypes = {
	loggedIn: PropTypes.bool,
	userIsAdmin: PropTypes.bool,
	openEventEditor: PropTypes.func.isRequired
}
TopBar.defaultProps = {
	loggedIn: false,
	userIsAdmin: false
}
