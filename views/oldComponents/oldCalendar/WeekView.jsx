import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import DayListHolder from './DayListHolder.jsx';
import WeekHeader from './WeekHeader.jsx';
import Divider from 'material-ui/Divider';
import moment from 'moment';
import Immutable from 'immutable';

export default class WeekView extends Component {

	constructor(props) {
		super(props);
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
				display: 'flex',
				flexGrow: '1'
			}
		}
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
					<DayListHolder
						events={this.props.events}
						currentTime={this.state.currentTime}
						eventOpener={this.props.eventOpener}
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
