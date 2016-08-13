import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import Checkbox from 'material-ui/Checkbox';
import moment from 'moment';
import _ from 'lodash'
import * as util from '../../util/EventFormUtil'

export default class EventForm extends Component {

	constructor(props) {
		super(props);
		this.setName = this.setName.bind(this);
		this.setDescription = this.setDescription.bind(this);
		this.setLocation = this.setLocation.bind(this);
		this.setStartDate = this.setStartDate.bind(this);
		this.setStartTime = this.setStartTime.bind(this);
		this.setEndDate = this.setEndDate.bind(this);
		this.setEndTime = this.setEndTime.bind(this);
		this.handleGuildClick = this.handleGuildClick.bind(this);
		this.setUrl = this.setUrl.bind(this);
		this.submitEvent = this.submitEvent.bind(this);
	}

	setName(event, value) {
    const newEventData = _.defaults({ name: value }, this.props.event)
    this.props.updateEventData(newEventData)
	}

	setDescription(event, value) {
		const newEventData = _.defaults({ description: value }, this.props.event)
    this.props.updateEventData(newEventData)
	}

	setLocation(event, value) {
		const newEventData = _.defaults({ location: value }, this.props.event)
    this.props.updateEventData(newEventData)
	}

	setStartDate(event, date) {
    let newEventData = _.defaults({ startDate: date }, this.props.event)
		if( !_.has(this.props.event, 'endDate') ) {
      newEventData = _.defaults({ endDate: date }, newEventData)
		}
		this.props.updateEventData(newEventData);
	}

	setStartTime(event, time) {
    let newEventData = _.defaults({ startTime: time }, this.props.event)
		if( !_.has(this.props.event, 'endTime') ) {
      newEventData = _.defaults(
        { endTime: moment(time).add(1, 'hours').toDate() }, newEventData)
		}
		this.props.updateEventData(newEventData);
	}

	setEndDate(event, date) {
    let newEventData = _.defaults({ endDate: date }, this.props.event)
		this.props.updateEventData(newEventData);
	}

	setEndTime(event, time) {
    let newEventData = _.defaults({ endTime: time }, this.props.event)
		this.props.updateEventData(newEventData);
	}

	handleGuildClick(event) {
    const guild = JSON.parse(event.target.getAttribute('data-guild'))
    let guilds = this.props.event.guilds
    guilds = _.some(guilds, guild) ? _.reject(guilds, guild) : _.concat(guilds, guild)
    const newEventData = _.defaults({ guilds: guilds }, this.props.event)
    this.props.updateEventData(newEventData)
	}

	setUrl(event, value) {
		const newEventData = _.defaults({ url: value }, this.props.event)
    this.props.updateEventData(newEventData)
	}

	submitEvent() {
    if( util.validateFormData(this.props.event, this.props.user.admin) ) {
      const event = util.convertToEventObject(this.props.event)
      this.props.close()
      this.props.submit(event)
      this.props.clearForm()
    }
	}

	render() {
		const styles = {
			dialogBody: {
				overflowY: 'scroll'
			},
			window: {
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				time: {
					display: 'flex',
					justifyContent: 'space-between',
					width: '16em',
					textField: {
						width: '7.5em'
					}
				},
				guildSelection: {
					width: '16em',
					display: 'flex',
					flexWrap: 'wrap',
					justifyContent: 'space-around',
					checkbox: {
						width: '5em',
						marginBottom: '0.7em',
						marginTop: '0.7em'
					}
				}
			},
			actions: {
				display: 'flex',
				justifyContent: 'space-between',
			}
		}

    const leftBottomActions = []
    if(this.props.clearButtonEnabled) {
      leftBottomActions.push(
        <FlatButton
          key='Clear'
          label='Clear'
          onTouchTap={this.props.clearForm}
        />
      )
    }

    const rightBottomActions = []
    rightBottomActions.push(
      <FlatButton
        key='Cancel'
        label='Cancel'
        onTouchTap={this.props.close}
      />
    )
    rightBottomActions.push(
      <FlatButton
        key={this.props.submitLabel}
        label={this.props.submitLabel}
        onTouchTap={this.submitEvent}
      />
    )

    let bottomButtons = [
      <div style={styles.actions}>
        <div>
          {leftBottomActions}
        </div>
        <div>
          {rightBottomActions}
        </div>
      </div>
    ]

		return (
			<Dialog
				open={this.props.open}
				onRequestClose={this.props.close}
				title={this.props.title}
				actions={bottomButtons}
				autoScrollBodyContent={true}
			>
				<div style={styles.window}>
					<TextField
						floatingLabelText='Name'
						onChange={this.setName}
						value={this.props.event.name}
					/>
					<TextField
						floatingLabelText='Description'
						multiLine={true}
						onChange={this.setDescription}
						value={this.props.event.description}
					/>
					<TextField
						floatingLabelText='Location'
						onChange={this.setLocation}
						value={this.props.event.location}
					/>
					<TextField
						floatingLabelText='URL'
						onChange={this.setUrl}
						value={this.props.event.url}
					/>
					<div style={styles.window.time}>
						<DatePicker
							hintText='Start date'
							autoOk={true}
							textFieldStyle={styles.window.time.textField}
							onChange={this.setStartDate}
							value={this.props.event.startDate}
						/>
						<TimePicker
							hintText='Start time'
							format='24hr'
							autoOk={true}
							textFieldStyle={styles.window.time.textField}
							onChange={this.setStartTime}
							value={this.props.event.startTime}
						/>
					</div>
					<div style={styles.window.time}>
						<DatePicker
							hintText='End date'
							autoOk={true}
							textFieldStyle={styles.window.time.textField}
							onChange={this.setEndDate}
							value={this.props.event.endDate}
						/>
						<TimePicker
							hintText='End time'
							format='24hr'
							autoOk={true}
							textFieldStyle={styles.window.time.textField}
							onChange={this.setEndTime}
							value={this.props.event.endTime}
						/>
					</div>
					<div style={styles.window.guildSelection}>
						{this.props.guilds.map((guild, index) =>
							<Checkbox
								key={index}
								label={guild.name}
								style={styles.window.guildSelection.checkbox}
								data-guild={JSON.stringify(guild)}
								onCheck={this.handleGuildClick}
                checked={_.some(this.props.event.guilds, guild)}
							/>
						)}
					</div>
				</div>
			</Dialog>
		)
	}

}

EventForm.defaultProps = {
  clearButtonEnabled: false,
  clearForm: () => true
}

EventForm.propTypes = {
	guilds: PropTypes.array.isRequired,
	open: PropTypes.bool.isRequired,
	close: PropTypes.func.isRequired,
	submit: PropTypes.func.isRequired,
  submitLabel: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
	user: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
  clearForm: PropTypes.func,
  clearButtonEnabled: PropTypes.bool
}
