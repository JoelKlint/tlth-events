import React, { Component, PropTypes } from 'react';
import CalendarHeader from './CalendarHeader.jsx';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import css from './calendar.css'
import * as EventUtil from '../../util/EventUtil'
import assign from 'lodash/fp/assign'

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
        flexGrow: '1'
			}
		}
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

      let response = {}
      if( EventUtil.isNotSaved(event) ) {
        const unsavedColor = '#FF6666'
        response = assign(response, {
          style: {
            backgroundColor: unsavedColor,
            borderColor: unsavedColor
          }
        })
      }

      return response

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
						events={this.props.events}
						onSelectEvent={this.props.onEventClick}
						titleAccessor='name'
						startAccessor={(event) => moment(event.startDate).toDate()}
						endAccessor={(event) => moment(event.endDate).toDate()}
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
