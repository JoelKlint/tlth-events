import React from 'react';
import Calendar from './Calendar.jsx';
import GuildList from './GuildList.jsx';
import SideBar from './SideBar.jsx';
import moment from 'moment';
import Immutable, { Map, List } from 'immutable';
import TopBar from './TopBar.jsx';
import AddEventDialog from './AddEventDialog.jsx';

export default class App extends React.Component {

	constructor(props) {
		super(props);
		moment.updateLocale('en', {
			week : {
				dow : 1 // Set monday as first day of week
			}
		});
		this.state = { addEventWindowOpen : false }
		this.closeEventEditor = this.closeEventEditor.bind(this);
		this.openEventEditor = this.openEventEditor.bind(this);
	}

	componentDidMount() {
		this.props.getAllGuilds();
		this.props.getAllEvents();
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
				<TopBar
					loggedIn={this.props.user.has('username')}
					admin={this.props.user.has('admin')}
					openEventEditor={this.openEventEditor}
				/>
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

				<AddEventDialog
					open={this.state.addEventWindowOpen}
					close={this.closeEventEditor}
					guilds={this.props.guilds}
					addNewEvent={this.props.addNewEvent}
				/>

			</div>
		);
	}
}
