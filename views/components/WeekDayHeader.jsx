import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';

export default class WeekDayHeader extends Component {

	render() {
		const styles = {
			base: {
				width: '14%',
				textAlign: 'center',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'flex-end',
				height: '4em'
			},
			date: {
				fontSize: '0.8em'
			},
			dayOfWeek: {
				fontSize: '1.1em'
			},
			todayIcon: {
				color: '#f64d47',
			}
		}

		return (
			<div style={styles.base}>
				{this.props.date.isSame(moment(), 'day') ?
				<FontAwesome
					name='circle'
					style={styles.todayIcon}/> : ''}
				<div style={styles.date}>{this.props.date.format('Do MMM')}</div>
				<div style={styles.dayOfWeek}>{this.props.date.format('dddd')}</div>
			</div>
		)
	}
}

WeekDayHeader.propTypes = {
	date: PropTypes.instanceOf(moment).isRequired
}
