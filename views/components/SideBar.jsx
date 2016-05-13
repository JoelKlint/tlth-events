import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import GuildList from './GuildList.jsx';
import Dialog from 'material-ui/Dialog';
import Immutable from 'immutable';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import Checkbox from 'material-ui/Checkbox';
import AddEventDialog from './AddEventDialog.jsx';

export default class SideBar extends Component {

	constructor(props) {
		super(props);
		this.state = { addEventWindowOpen : Immutable.fromJS(false) }
		this.closeEventEditor = this.closeEventEditor.bind(this);
		this.openEventEditor = this.openEventEditor.bind(this);
	}

	openEventEditor() {
		this.setState({ addEventWindowOpen: Immutable.fromJS(true) });
	}

	closeEventEditor() {
		this.setState({ addEventWindowOpen: Immutable.fromJS(false) });
	}

	render() {
		const styles = {
			base: {
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
			},
			guildList: {
				display: 'flex',
				flexGrow: '1'
			},
			addEvent: {
				display: 'flex',
				justifyContent: 'center',
				flexShrink: '0',
				height: '4em',
				borderTop: '1px solid black',
				alignItems: 'center',
				backgroundColor: '#eaeaea',
				cursor: 'pointer',
			}
		}

		return (
			<div style={styles.base}>
				<div style={styles.guildList}>
					<GuildList
						guilds={this.props.guilds}
						active={this.props.activeGuilds}
						handleClick={this.props.handleGuildClick}
					/>
				</div>
				<div style={styles.addEvent} onClick={this.openEventEditor}>
					Add event
				</div>

				<AddEventDialog
					open={this.state.addEventWindowOpen}
					close={this.closeEventEditor}
					guilds={this.props.guilds}
					addNewEvent={this.props.addNewEvent}
				/>
			</div>
		)
	}
}

SideBar.propTypes = {
	guilds: ImmutablePropTypes.set.isRequired,
	activeGuilds: ImmutablePropTypes.set.isRequired,
	handleGuildClick: PropTypes.func.isRequired,
	addNewEvent: PropTypes.func.isRequired
}
