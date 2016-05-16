import React, { Component, PropTypes } from 'react';
import WeekDayHeader from './WeekDayHeader.jsx';
import FontAwesome from 'react-fontawesome';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import moment from 'moment';

export default class WeekHeader extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		const styles = {
			base: {
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
				justifyContent: 'space-around',
			},
			header: {
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				marginTop: '1em',
				marginBottom: '1em'
			},
			title: {
				display: 'flex',
				flexDirection: 'column',
				textAlign: 'center',
				cursor: 'pointer',
				width: '12em',
				marginLeft: '2em',
				marginRight: '2em'
			},
			weekTitle: {
				fontSize: '2em',
				marginLeft: '1em',
				marginRight: '1em'
			},
			weekChanger: {
				cursor: 'pointer',
				paddingLeft: '0.3em',
				paddingRight: '0.3em'
			}
		}

		const currentWeek = this.props.currentTime.isoWeek();

		return (
			<div style={styles.base}>
				<div style={styles.header}>
					<Paper>
						<FontAwesome
							name='angle-left'
							size='2x'
							style={styles.weekChanger}
							onClick={this.props.previousWeek}
						/>
					</Paper>

					<div style={styles.title} onClick={this.props.goToToday}>
						<span style={styles.weekTitle}>Week {currentWeek}</span>
						<span>{this.props.currentTime.format('MMMM - YYYY')}</span>
					</div>

					<Paper>
						<FontAwesome
							name='angle-right'
							size='2x'
							style={styles.weekChanger}
							onClick={this.props.nextWeek}
						/>
					</Paper>
				</div>
				<Divider/>
			</div>
		)
	}
}

WeekHeader.propTypes = {
	currentTime: PropTypes.instanceOf(moment).isRequired,
	nextWeek: PropTypes.func.isRequired,
	previousWeek: PropTypes.func.isRequired,
	goToToday: PropTypes.func.isRequired
}
