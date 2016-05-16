import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CalendarHeader from './CalendarHeader.jsx';
import moment from 'moment';
import Immutable from 'immutable';
import BigCalendar from 'react-big-calendar';
import css from 'react-big-calendar/lib/css/react-big-calendar.css';
import EventDetailView from './EventDetailView.jsx';

export default class Calendar extends Component {

	constructor(props) {
		super(props);
		BigCalendar.momentLocalizer(moment);
		this.nextWeek = this.nextWeek.bind(this);
		this.previousWeek = this.previousWeek.bind(this);
		this.goToToday = this.goToToday.bind(this);
		this.showEventDetails = this.showEventDetails.bind(this);
		this.hideEventDetails = this.hideEventDetails.bind(this);
		this.renderCurrentEventDetails = this.renderCurrentEventDetails.bind(this);
		this.state = {
			currentTime: moment(),
			currentView: 'week',
			showEventDetails: false
	 };
	}

	goToToday() {
		this.setState({ currentTime: moment() });
	}

	nextWeek() {
		const nextWeek = this.state.currentTime.add(1, this.state.currentView);
		this.setState({ currentTime: nextWeek });
	}

	previousWeek() {
		const previousWeek = this.state.currentTime.subtract(1, this.state.currentView);
		this.setState({ currentTime: previousWeek });
	}

	showEventDetails(NonImmutableEventData) {
		NonImmutableEventData.startDate = NonImmutableEventData.startDate.toISOString();
		NonImmutableEventData.endDate = NonImmutableEventData.endDate.toISOString();
		this.setState({
			currentEvent: Immutable.fromJS(NonImmutableEventData),
			showEventDetails: true
		});
	}

	hideEventDetails() {
		this.setState({ showEventDetails: false });
	}

	render() {
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
			event.startDate = moment(event.startDate).toDate();
			event.endDate = moment(event.endDate).toDate();
			return event;
		});
		return (
			<div style={styles.base}>
				<div style={styles.headerHolder}>
					<CalendarHeader
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
						onSelectEvent={this.showEventDetails}
						titleAccessor='name'
						startAccessor='startDate'
						endAccessor='endDate'
						toolbar={false}
						view={this.state.currentView}
						popup={true}
						onView='garbage'
						onNavigate='garbage'
					/>
				</div>
				{this.renderCurrentEventDetails()}
			</div>
		)
	}

	renderCurrentEventDetails() {
		if(!Immutable.Map.isMap(this.state.currentEvent)) return;
		return (
			<EventDetailView
				open={this.state.showEventDetails}
				close={this.hideEventDetails}
				event={this.state.currentEvent}
			/>
		)
	}
}

Calendar.propTypes = {
	events: ImmutablePropTypes.set.isRequired
}
