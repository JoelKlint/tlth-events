import React from 'react';
import WeekView from './WeekView.jsx';
import GuildList from './GuildList.jsx';
import SideBar from './SideBar.jsx';
import moment from 'moment';
import EventDetailView from './EventDetailView.jsx';
import { Map, List } from 'immutable';

export default class App extends React.Component {

	constructor(props) {
		super(props);
		this.showEventDetails = this.showEventDetails.bind(this);
		this.hideEventDetails = this.hideEventDetails.bind(this);
		this.renderCurrentEventDetails = this.renderCurrentEventDetails.bind(this);
		moment.updateLocale('en', {
			week : {
				dow : 1 // Set monday as first day of week
			}
		});
		this.state = { showEventDetails: false }
	}

	componentDidMount() {
		this.props.getAllGuilds();
		this.props.getAllEvents();
	}

	showEventDetails(ImmutableEventMap) {
		this.setState({
			currentEvent: ImmutableEventMap,
			showEventDetails: true
		});
	}

	hideEventDetails() {
		this.setState({ showEventDetails: false });
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
						// <WeekView
						// 	events={this.props.events}
						// 	eventOpener={this.showEventDetails}
						// />
						// <Calendar
						// 	events={this.props.events}
						// 	eventOpener={this.showEventDetails}
						// />
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
				<WeekView
					events={this.props.events}
					eventOpener={this.showEventDetails}
				/>

				{this.renderCurrentEventDetails()}

			</div>
		);
	}

	renderCurrentEventDetails() {
		if(!Map.isMap(this.state.currentEvent)) return;
		return (
			<EventDetailView
				open={this.state.showEventDetails}
				close={this.hideEventDetails}
				event={this.state.currentEvent}
			/>
		)
	}
}
