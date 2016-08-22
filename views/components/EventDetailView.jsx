import React, { PropTypes, Component } from 'react';
import Dialog from 'material-ui/Dialog';
import moment from 'moment';
import { eventStyles, linkStyles } from '../ConstantStyles.js';
import FontAwesome from 'react-fontawesome';
import FlatButton from 'material-ui/FlatButton';
import flow from 'lodash/fp/flow'
import join from 'lodash/fp/join'
import map from 'lodash/fp/map'
import Event from '../../objects/Event'

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
				title={this.renderTitle(this.props.event)}
				actions={this.renderButtons()}
			>
				<div style={styles.base}>
					<div style={styles.content}>
						<div style={styles.leftBlock}>

              <p style={styles.leftChild}> {this.renderOwner(this.props.event)} </p>

              <p style={styles.leftChild}> {this.renderDate(this.props.event)} </p>

							<p style={styles.leftChild}> {this.renderTime(this.props.event)} </p>

							<p style={styles.leftChild}> {this.renderLocation(this.props.event)} </p>

							<p style={styles.leftChild}> {this.renderUrl(this.props.event)} </p>

						</div>

						<div style={styles.rightBlock}>
							{this.renderDescription(this.props.event)}
						</div>
					</div>
					<div style={styles.bottomSpacer}></div>

				</div>
			</Dialog>
		)
	}

	renderButtons() {
		const buttons = [];
    if( this.props.editAllowed ) {
      buttons.push(
      <FlatButton
        label='Edit'
        onTouchTap={() => this.handleEditEventClick()}
      />
      );
			buttons.push(
				<FlatButton
					label='Delete'
					onTouchTap={() => this.deleteAndClose()}
				/>
			);
		}
		return buttons;
	}

	renderTitle(event) {
		const styles = {
			base: {
				display: 'flex',
				justifyContent: 'space-between'
			}
		}

    const formatGuildNames = flow(
      map(guild => guild.name),
      join(' ')
    )
		const title =
			<div style={styles.base}>
				<div>
          { event.name }
				</div>
				<div>
          { formatGuildNames(event.invitedGuilds) }
				</div>
			</div>
			return title;
	}

  renderOwner(event) {
    const ownerStyles = {
      paddingLeft: '0.4em',
      margin: '0em'
    }
    return (
      <span>
        Hosted by: { event.ownerGuildName }
      </span>
    )
  }

	renderDate(event) {
		return (
			<span>
				<FontAwesome
					name='calendar'
					size={iconSize}
					fixedWidth={true}
					style={eventStyles.dateIcon}
				/>
      { event.getDateAsString() }
			</span>
		)
	}

	renderTime(event) {
		return (
			<span>
				<FontAwesome
					name='clock-o'
					size={iconSize}
					fixedWidth={true}
					style={eventStyles.timeIcon}
				/>
      { event.getTimeAsString() }
			</span>
		)
	}

	renderLocation(event) {
    if( !event.location ) return
		return (
			<span>
				<FontAwesome
					name='map-marker'
					size={iconSize}
					fixedWidth={true}
					style={eventStyles.locationIcon}
				/>
      { event.location }
			</span>
		)
	}

	renderUrl(event) {
		if( !event.url ) return;
		return (
			<a
				href={event.url}
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

	renderDescription(event) {
		if( !event.description ) return;
		return event.description
		.split('\n')
		.map((line, key) => {
			return (
				<span key={key}>{line}<br/></span>
			)
		})
	}
}

EventDetailView.defaultProps = {
  event: new Event(),
  editAllowed: false
}

EventDetailView.propTypes = {
  event: PropTypes.instanceOf(Event).isRequired,
	open: PropTypes.bool.isRequired,
	close: PropTypes.func.isRequired,
  editAllowed: PropTypes.bool
}
