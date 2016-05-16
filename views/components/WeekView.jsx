import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import DayListHolder from './DayListHolder.jsx';
import WeekHeader from './WeekHeader.jsx';
import Divider from 'material-ui/Divider';
import moment from 'moment';
import Immutable from 'immutable';
import BigCalendar from 'react-big-calendar';
import css from 'react-big-calendar/lib/css/react-big-calendar.css';

export default class WeekView extends Component {

	constructor(props) {
		super(props);
		BigCalendar.momentLocalizer(moment);
		this.nextWeek = this.nextWeek.bind(this);
		this.previousWeek = this.previousWeek.bind(this);
		this.goToToday = this.goToToday.bind(this);
		this.state = { currentTime: moment() };
	}

	goToToday() {
		this.setState({ currentTime: moment() });
	}

	nextWeek() {
		const nextWeek = this.state.currentTime.add(1, 'weeks');
		this.setState({ currentTime: nextWeek });
	}

	previousWeek() {
		const previousWeek = this.state.currentTime.subtract(1, 'weeks');
		this.setState({ currentTime: previousWeek });
	}

	render() {
		// const events = [
		// 	{
		// 		_id: '5733659e65b2b4f021b92a57',
		// 	  name: 'We Dont Fucking Know Slasque',
		// 	  description: 'dsa',
		// 	  location: 'dsa',
		// 	  startDate: new Date('2016-05-16T08:00:00.000Z'),
		// 	  endDate: new Date('2016-05-16T12:00:00.000Z'),
		// 	  guilds: [
		// 	    {
		// 	      _id: '572cb23d505ec79319ff6e7a',
		// 	      name: 'F'
		// 	    }
		// 	  ]
		// 	},
		// 	{
		// 		_id: '5733659e65b2b4f021b92a57',
		// 	  name: 'We Dont Fucking Know Slasque',
		// 	  description: 'dsa',
		// 	  location: 'dsa',
		// 	  startDate: new Date('2016-05-16T11:00:00.000Z'),
		// 	  endDate: new Date('2016-05-16T19:00:00.000Z'),
		// 	  guilds: [
		// 	    {
		// 	      _id: '572cb23d505ec79319ff6e7a',
		// 	      name: 'F'
		// 	    }
		// 	  ]
		// 	}
		// ];
		const styles = {
			base: {
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column'
			},
			headerHolder: {
				display: 'flex',
				flexShrink: '0'
			},
			eventsHolder: {
				height: '100%',
				overflowY: 'hidden'
			}
		}
		const events = this.props.events.toJS()
		.map((event) => {
			event.startDate = new Date(event.startDate);
			event.endDate = new Date(event.endDate);
		});
		return (
			<div style={styles.base}>
				<div style={styles.headerHolder}>
					<WeekHeader
						currentTime={this.state.currentTime}
						nextWeek={this.nextWeek}
						previousWeek={this.previousWeek}
						goToToday={this.goToToday}
					/>
				</div>
				<div style={styles.eventsHolder}>
					<BigCalendar
						date={this.state.currentTime.toDate()}
						events={events}
						titleAccessor='name'
						startAccessor='startDate'
						endAccessor='endDate'
						toolbar={false}
						view='week'
					/>
				</div>
			</div>
		)
	}
}

WeekView.propTypes = {
	events: ImmutablePropTypes.set.isRequired,
	eventOpener: PropTypes.func.isRequired
}
