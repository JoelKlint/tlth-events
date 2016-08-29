import React from 'react';
import Calendar from './Calendar.jsx';
import SideBar from './SideBar.jsx';
import moment from 'moment';
import TopBar_smart from './TopBar_smart';
import EventDetailViewContainer from './EventDetailViewContainer';
import AddEventForm from './AddEventForm'
import EditEventForm from './EditEventForm'
import HeadsUpNotifier from './HeadsUpNotifier.jsx'

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
        height: '100%'
			},
			sideBar: {
				display: 'flex',
				width: '13em',
				borderRight: '1px solid black',
			}
		}

		return(
			<div style={styles.base}>

        <TopBar_smart/>

				<div style={styles.content}>
					<div style={styles.sideBar}>
						<SideBar
							guilds={this.props.guilds}
							activeGuilds={this.props.activeGuilds}
							handleGuildClick={this.props.handleGuildClick}
						/>
					</div>
					<Calendar
						events={this.props.events}
            onEventClick={this.props.viewEventDetails}
					/>
				</div>

        <AddEventForm/>

        <EditEventForm/>

        <EventDetailViewContainer/>

        <HeadsUpNotifier/>

			</div>
		);
	}
}
