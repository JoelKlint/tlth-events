import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import EventWeekView from './EventWeekView.jsx';

export default class DayList extends Component {

	render() {
		const styles = {
			base: {
				width: '14%',
			},
			bottom: {
				height: '1em'
			}
		}
		return (
			<div style={styles.base}>
				{this.props.events.map((event, index) =>
					<EventWeekView
						event={event}
						key={index}
						openDetails={this.props.eventOpener}
					/>
				)}
				<div style={styles.bottom}>
				</div>
			</div>
		)
	}
}

DayList.propTypes = {
	events: ImmutablePropTypes.set.isRequired,
	eventOpener: PropTypes.func.isRequired
}
