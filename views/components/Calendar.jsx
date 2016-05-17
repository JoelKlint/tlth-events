import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CalendarHeader from './CalendarHeader.jsx';
import moment from 'moment';
import Immutable from 'immutable';
import BigCalendar from 'react-big-calendar';
import css from './calendar.css'
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
			time: moment(),
			calendarView: 'week',
			showEventDetails: false
	 };
	}

	goToToday() {
		this.setState({ time: moment() });
	}

	nextWeek() {
		const nextWeek = this.state.time.add(1, this.state.calendarView);
		this.setState({ time: nextWeek });
	}

	previousWeek() {
		const previousWeek = this.state.time.subtract(1, this.state.calendarView);
		this.setState({ time: previousWeek });
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
				width: '100%',
				display: 'flex',
			}
		}
		const events = this.props.events.toJS()
		.map((event) => {
			event.startDate = moment(event.startDate).toDate();
			event.endDate = moment(event.endDate).toDate();
			return event;
		});
		const calendarFormats = {
			// dateFormat: "HH:mm",
		  dayFormat: "ddd D MMM",
		  // weekdayFormat: "HH:mm",
		  // monthHeaderFormat: "HH:mm",
		  // weekHeaderFormat: "HH:mm",
		  // dayHeaderFormat: "HH:mm",
		  // agendaHeaderFormat: "HH:mm",
		  // selectRangeFormat: "HH:mm",
		  // agendaDateFormat: "HH:mm",
		  // agendaTimeFormat: "HH:mm",
		  // agendaTimeRangeFormat: "HH:mm",
			timeGutterFormat: 'HH'
		}
		return (
			<div style={styles.base}>
				{this.renderCurrentEventDetails()}
				<div style={styles.headerHolder}>
					<CalendarHeader
						currentTime={this.state.time}
						nextWeek={this.nextWeek}
						previousWeek={this.previousWeek}
						goToToday={this.goToToday}
					/>
				</div>
				<div style={styles.eventsHolder}>
					<BigCalendar
						date={this.state.time.toDate()}
						events={events}
						onSelectEvent={this.showEventDetails}
						titleAccessor='name'
						startAccessor='startDate'
						endAccessor='endDate'
						view={this.state.calendarView}
						toolbar={false}
						formats={calendarFormats}
						popup={true}
						onView='garbage'
						onNavigate='garbage'
					/>
				</div>
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
