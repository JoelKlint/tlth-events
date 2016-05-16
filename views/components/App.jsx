import React from 'react';
import Calendar from './Calendar.jsx';
import GuildList from './GuildList.jsx';
import SideBar from './SideBar.jsx';
import moment from 'moment';
import Immutable, { Map, List } from 'immutable';

export default class App extends React.Component {

	constructor(props) {
		super(props);
		moment.updateLocale('en', {
			week : {
				dow : 1 // Set monday as first day of week
			}
		});
	}

	componentDidMount() {
		this.props.getAllGuilds();
		this.props.getAllEvents();
	}

	render() {
		const styles = {
			base: {
				display: 'flex',
				height: '100%',
				width: '100%'
			},
			calendar: {
				display: 'flex',
				height: '100%',
				width: '100%'
			},
			sideBar: {
				width: '13em',
				height: '100%',
				borderRight: '1px solid black'
			}
		}
		return(
			<div style={styles.base}>
				<div style={styles.sideBar}>
					<SideBar
						guilds={this.props.guilds}
						activeGuilds={this.props.activeGuilds}
						handleGuildClick={this.props.handleGuildClick}
						addNewEvent={this.props.addNewEvent}
					/>
				</div>
				<Calendar
					events={this.props.events}
				/>
			</div>
		);
	}
}
