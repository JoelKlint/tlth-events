import React, { Component, PropTypes } from 'react';
import CalendarHeader from './CalendarHeader.jsx';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import css from './calendar.css'

export default class Calendar extends Component {

	constructor(props) {
		super(props);
		BigCalendar.momentLocalizer(moment);
		this.nextWeek = this.nextWeek.bind(this);
		this.previousWeek = this.previousWeek.bind(this);
		this.goToToday = this.goToToday.bind(this);
		this.state = {
			time: moment(),
			calendarView: 'week',
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

	render() {
		const styles = {
			base: {
				width: '100%',
				// height: '100%',
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
    // Convert all dates to date objects since they are stored as string in state
		const events = this.props.events
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

    // Use this function to customize the style of individual events
    const eventCustomizer = (event, start, end, isSelected) => {
      return {
        style: {
          // backgroundColor: '#FF6666',
        }
      }
    }

		return (
			<div style={styles.base}>
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
						onSelectEvent={this.props.onEventClick}
						titleAccessor='name'
						startAccessor='startDate'
						endAccessor='endDate'
						view={this.state.calendarView}
						toolbar={false}
						formats={calendarFormats}
						popup={true}
						onView='garbage'
						onNavigate='garbage'
            eventPropGetter={eventCustomizer}
					/>
				</div>
			</div>
		)
	}
}

Calendar.propTypes = {
	events: PropTypes.array.isRequired
}
