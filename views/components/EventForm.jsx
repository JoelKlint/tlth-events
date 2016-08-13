import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import Checkbox from 'material-ui/Checkbox';
import moment from 'moment';

// There should be string constants for all keys in state.event but it lead to errors

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
		this.addEvent = this.addEvent.bind(this);
		this.areRequiredFieldsFilled = this.areRequiredFieldsFilled.bind(this);
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

  // mergeDateAndTime(date, time) {
  //   const date = moment(date);
	// 	const time = moment(time);
	// 	let dateTime = date.add(time.hours(), 'hours');
	// 	dateTime = date.add(time.minutes(), 'minutes');
	// 	return endDate.toISOString();
  // }

	addEvent() {
		if(!this.areRequiredFieldsFilled()) {
			return;
		}
		this.props.close();
		const eventData = this.props.event;
		// Format start date
		let startDate = moment(eventData.startDate);
		const startTime = moment(eventData.startTime);
		startDate = startDate.add(startTime.hours(), 'hours');
		startDate = startDate.add(startTime.minutes(), 'minutes');
		startDate = startDate.toISOString()

		// Format end date
		let endDate = moment(eventData.endDate);
		const endTime = moment(eventData.endTime);
		endDate = endDate.add(endTime.hours(), 'hours');
		endDate = endDate.add(endTime.minutes(), 'minutes');
		endDate = endDate.toISOString();

		const event = {
      _id: eventData._id,
			name: eventData.name,
			description: eventData.description,
			location: eventData.location,
			startDate: startDate.toString(),
			endDate: endDate.toString(),
			guilds: eventData.guilds,
			url: eventData.url
		};
		this.props.submit(event);
    this.props.clearForm()
	}

  areRequiredFieldsFilled() {
    const data = this.props.event;

    // Validate title
    const name = _.has(data, 'name');

    // Validate times
    let dates = false
    if(_.has(data, 'startDate') && _.has(data, 'startTime') && _.has(data, 'endDate') && _.has(data, 'endTime')) {
      const startTime = moment(data.startTime)
      const startDate = moment(data.startDate)
      startDate.add(startTime.hours(), 'hours')
      startDate.add(startTime.minutes(), 'minutes')

      const endTime = moment(data.endTime)
      const endDate = moment(data.endDate)
      endDate.add(endTime.hours(), 'hours')
      endDate.add(endTime.minutes(), 'minutes')

      if(startDate < endDate) { dates = true }
    }

    // Validate guilds
    const guilds = data.guilds.some((guild) => {
      return guild._id == this.props.user.admin._id
    })
    return name && dates && guilds;
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
		const addEventActions = [
			<div style={styles.actions}>
				<div>
					<FlatButton
						label='Clear'
						onTouchTap={this.props.clearForm}
					/>
				</div>
				<div>
					<FlatButton
						label='Cancel'
						onTouchTap={this.props.close}
					/>
					<FlatButton
						label='Add Event'
						onTouchTap={this.addEvent}
					/>
				</div>
			</div>

		]
		return (
			<Dialog
				open={this.props.open}
				onRequestClose={this.props.close}
				title='Add Event'
				actions={addEventActions}
				autoScrollBodyContent={true}
			>
				<div style={styles.window}>
					<TextField
						floatingLabelText='Name'
						onChange={this.setName}
						value={_.has(this.props.event, 'name') ? this.props.event.name : ''}
					/>
					<TextField
						floatingLabelText='Description'
						multiLine={true}
						onChange={this.setDescription}
						value={_.has(this.props.event, 'description') ? this.props.event.description : ''}
					/>
					<TextField
						floatingLabelText='Location'
						onChange={this.setLocation}
						value={_.has(this.props.event, 'location') ? this.props.event.location : ''}
					/>
					<TextField
						floatingLabelText='URL'
						onChange={this.setUrl}
						value={_.has(this.props.event, 'url') ? this.props.event.url : ''}
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
								// checked={this.props.event.get('guilds').includes(guild)}
                checked={_.some(this.props.event.guilds, guild)}
							/>
						)}
					</div>
				</div>
			</Dialog>
		)
	}
}

EventForm.propTypes = {
	guilds: PropTypes.array.isRequired,
	open: PropTypes.bool.isRequired,
	close: PropTypes.func.isRequired,
	submit: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
  clearForm: PropTypes.func.isRequired
}
