import React, { PropTypes, Component } from 'react';
import Dialog from 'material-ui/Dialog';
import moment from 'moment';
import { eventStyles, linkStyles } from '../ConstantStyles.js';
import FontAwesome from 'react-fontawesome';
import FlatButton from 'material-ui/FlatButton';

import has from 'lodash/has'
import isEqual from 'lodash/isEqual'
import fp from 'lodash/fp'

const iconSize = '2x';
const styles = {
	base: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		maxHeight: 'inherit',
	},
	content: {
		display: 'flex',
		width: '100%',
		maxHeight: 'inherit'
	},
	leftBlock: {
		width: '30%',
		display: 'flex',
		flexDirection: 'column',
		flexShrink: '0',
		paddingRight: '1em'
	},
	leftChild: {
		display: 'flex',
		alignItems: 'center',
		wordBreak: 'break-all'
	},
	rightBlock: {
		borderLeft: '1px dashed black',
		paddingLeft: '1em',
		overflow: 'scroll',
		maxHeight: '100%'
	},
	bottomSpacer: {
		height: '1em'
	}
}

export default class EventDetailView extends Component {

	constructor(props) {
		super();
		this.renderDate = this.renderDate.bind(this);
		this.renderTime = this.renderTime.bind(this);
		this.renderTitle = this.renderTitle.bind(this);
		this.renderLocation = this.renderLocation.bind(this);
		this.renderUrl = this.renderUrl.bind(this);
		this.renderDescription = this.renderDescription.bind(this);
		this.renderButtons = this.renderButtons.bind(this);
		this.deleteAndClose = this.deleteAndClose.bind(this);
    this.handleEditEventClick = this.handleEditEventClick.bind(this);
	}

	deleteAndClose() {
		this.props.deleteEvent(this.props.event);
		this.props.close();
	}

  handleEditEventClick() {
    this.props.editEvent(this.props.event)
    this.props.close()
  }

	render() {
		return (
			<Dialog
				open={this.props.open}
				onRequestClose={this.props.close}
				title={this.renderTitle()}
				actions={this.renderButtons()}
			>
				<div style={styles.base}>
					<div style={styles.content}>
						<div style={styles.leftBlock}>

							<p style={styles.leftChild}> {this.renderDate()} </p>

							<p style={styles.leftChild}> {this.renderTime()} </p>

							<p style={styles.leftChild}> {this.renderLocation()} </p>

							<p style={styles.leftChild}> {this.renderUrl()} </p>

						</div>

						<div style={styles.rightBlock}>
							{this.renderDescription()}
						</div>
					</div>
					<div style={styles.bottomSpacer}></div>

				</div>
			</Dialog>
		)
	}

	renderButtons() {
		const buttons = [];
		const eventOwner = this.props.event.owner;
		if( has(this.props.user, 'admin') ) {
			const userAdmin = this.props.user.admin;
			if( isEqual(userAdmin, eventOwner) ) {
        buttons.push(
        <FlatButton
          label='Edit'
          onTouchTap={this.handleEditEventClick}
        />
        );
				buttons.push(
					<FlatButton
						label='Delete'
						onTouchTap={this.deleteAndClose}
					/>
				);
			}
		}
		return buttons;
	}

	renderTitle() {
		if( !has(this.props.event, 'guilds') ) return;
		const styles = {
			base: {
				display: 'flex',
				justifyContent: 'space-between'
			}
		}

    const renderGuilds = fp.flow(
      fp.map(guild => guild.name),
      fp.join(' ')
    )

		const title =
			<div style={styles.base}>
				<div>
					{ this.props.event.name }
				</div>
				<div>
          { renderGuilds(this.props.event.guilds) }
				</div>
			</div>
			return title;
	}

	renderDate() {
		const dateFormat = 'D MMM';
		const startDate = moment(this.props.event.startDate);
		const endDate = moment(this.props.event.endDate);
		let dateString = startDate.format(dateFormat);
		if(endDate.isAfter(startDate, 'day')) {
			dateString += ' - ' + endDate.format(dateFormat);
		}
		return (
			<span>
				<FontAwesome
					name='calendar'
					size={iconSize}
					fixedWidth={true}
					style={eventStyles.dateIcon}
				/>
			{dateString}
			</span>
		)
	}

	renderTime() {
		const timeFormat = 'HH:mm'
		const startTime = moment(this.props.event.startDate).format(timeFormat);
		const endTime = moment(this.props.event.endDate).format(timeFormat);
		const timeString =  startTime + ' - ' + endTime;
		return (
			<span>
				<FontAwesome
					name='clock-o'
					size={iconSize}
					fixedWidth={true}
					style={eventStyles.timeIcon}
				/>
			{timeString}
			</span>
		)
	}


	renderLocation() {
		if( !has(this.props.event, 'location') ) return;
		return (
			<span>
				<FontAwesome
					name='map-marker'
					size={iconSize}
					fixedWidth={true}
					style={eventStyles.locationIcon}
				/>
				{this.props.event.location}
			</span>
		)
	}

	renderUrl() {
		if( !has(this.props.event, 'url') ) return;
		return (
			<a
				href={this.props.event.url}
				target='_blank'
				style={linkStyles}
			>
				<FontAwesome
					name='info-circle'
					size={iconSize}
					fixedWidth={true}
					style={eventStyles.infoIcon}
				/>
			More information
		</a>
		)
	}

	renderDescription() {
		if( !has(this.props.event, 'description') ) return;
		return this.props.event.description
		.split('\n')
		.map((line, key) => {
			return (
				<span key={key}>{line}<br/></span>
			)
		})
	}
}

EventDetailView.defaultProps = {
  event: {
    guilds: [],
    owner: {}
  }
}

EventDetailView.propTypes = {
  event: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
    url: PropTypes.string,
    owner: PropTypes.object,
    guilds: PropTypes.array
  }),
	open: PropTypes.bool.isRequired,
	close: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired
}
