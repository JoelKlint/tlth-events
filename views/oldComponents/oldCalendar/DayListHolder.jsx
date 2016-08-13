import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import DayList from './DayList.jsx';
import moment from 'moment';
import { Map, Set } from 'immutable';

export default class DayListHolder extends Component {

	constructor(props) {
		super(props);
		this.sortEvents = this.sortEvents.bind(this);
	}

	render() {
		const styles = {
			base: {
				display: 'flex',
				justifyContent: 'space-between',
				width: '100%',
				overflowY: 'scroll',
			}
		}
		const eventsForDay = this.sortEvents();
		return (
			<div style={styles.base}>
				<DayList events={eventsForDay.get('1')} eventOpener={this.props.eventOpener} />
				<DayList events={eventsForDay.get('2')} eventOpener={this.props.eventOpener} />
				<DayList events={eventsForDay.get('3')} eventOpener={this.props.eventOpener} />
				<DayList events={eventsForDay.get('4')} eventOpener={this.props.eventOpener} />
				<DayList events={eventsForDay.get('5')} eventOpener={this.props.eventOpener} />
				<DayList events={eventsForDay.get('6')} eventOpener={this.props.eventOpener} />
				<DayList events={eventsForDay.get('7')} eventOpener={this.props.eventOpener} />
			</div>
		)
	}

	sortEvents() {
		let eventsForDay = Map({
			1: Set(),
			2: Set(),
			3: Set(),
			4: Set(),
			5: Set(),
			6: Set(),
			7: Set(),
		});
		this.props.events.map((event) => {
			const eventTime = moment(event.get('startDate'));
			if(eventTime.isSame(this.props.currentTime, 'week')) {
				const dayOfEvent = eventTime.isoWeekday();
				const newList = eventsForDay.get(dayOfEvent.toString()).add(event);
				eventsForDay = eventsForDay.set(dayOfEvent.toString(), newList);
			}
		});
		// Sort after time
		return eventsForDay.map((events) => {
				return events.sort((a, b) => {
				a = moment(a.get('startDate'));
				b = moment(b.get('startDate'));
				return a.diff(b);
			})
		})
	}
}

DayListHolder.propTypes = {
	events: ImmutablePropTypes.set.isRequired,
	currentTime: PropTypes.instanceOf(moment).isRequired,
	eventOpener: PropTypes.func.isRequired
}
