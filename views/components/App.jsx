import React from 'react';
import Calendar from './Calendar.jsx';
import GuildList from './GuildList.jsx';
import SideBar from './SideBar.jsx';
import moment from 'moment';
import Immutable, { Map, List } from 'immutable';
import TopBar from './TopBar.jsx';

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
				flexDirection: 'column',
				height: '100%',
				width: '100%',
			},
			content: {
				display: 'flex',
			},
			sideBar: {
				display: 'flex',
				width: '13em',
				borderRight: '1px solid black',
			}
		}
		return(
			<div style={styles.base}>
				<TopBar loggedIn={this.props.user.has('username')}/>
				<div style={styles.content}>
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
			</div>
		);
	}
}
