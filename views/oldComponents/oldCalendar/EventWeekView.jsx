import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Paper from 'material-ui/Paper';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';
import { eventStyles } from '../ConstantStyles.js';

export default class EventWeekView extends React.Component {

	constructor(props) {
		super(props);
		this.renderGuilds = this.renderGuilds.bind(this);
		this.isSaved = this.isSaved.bind(this);
		this.openDetails = this.openDetails.bind(this);
	}

	openDetails() {
		this.props.openDetails(this.props.event)
	}

	render() {
		var styles = {
			base: {
				padding: '0.5em',
				margin: '0.5em 0.2em',
				cursor: 'pointer'
			},
			name: {
				paddingBottom: '0.4em',
				display: 'flex',
				justifyContent: 'space-between'
			},
			infoText: {
				fontStyle: 'italic',
				fontSize: '0.9em'
			},
			notSaved: {
				backgroundColor: '#B3B3B3'
			}
		};
		return (
			<Paper
				style={this.isSaved() ? styles.base : Object.assign({}, styles.base, styles.notSaved)}
				onClick={this.openDetails}
			>
				<div style={styles.name}>
					<div>{this.props.event.get('name')}</div>
				</div>
				<div>
					<FontAwesome
						name='clock-o'
						fixedWidth={true}
						style={eventStyles.timeIcon}
					/>
					<span style={styles.infoText}>
						{this.props.event.has('startDate') ? moment(this.props.event.get('startDate')).format('HH:mm'): '-'}
						</span>
				</div>
				<div>
					<FontAwesome
						name='map-marker'
						fixedWidth={true}
						style={eventStyles.locationIcon}
					/>
					<span style={styles.infoText}>{this.props.event.get('location')}</span>
				</div>
			</Paper>
		);
	}

	renderGuilds() {
		const guilds = this.props.event.get('guilds');
		if(guilds.size < 0) {
			return;
		}
		let renderString = '';
		guilds.map((guild) => {
			renderString += guild.get('name');
		})
		return renderString;
	}

	isSaved() {
		return this.props.event.has('id');
	}
}

EventWeekView.propTypes = {
	event: ImmutablePropTypes.mapContains({
		name: PropTypes.string.isRequired,
		description: PropTypes.string,
		location: PropTypes.string,
		startDate: PropTypes.string.isRequired,
		endDate: PropTypes.string.isRequired,
		url: PropTypes.string,
		guilds: ImmutablePropTypes.list.isRequired
	}).isRequired,
	openDetails: PropTypes.func.isRequired
}
