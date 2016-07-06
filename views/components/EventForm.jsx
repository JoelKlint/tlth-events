import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import Checkbox from 'material-ui/Checkbox';
import Immutable, { Map, Set } from 'immutable';
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
    const newState = this.props.event.set('name', value);
		this.props.updateEventData(newState);
	}

	setDescription(event, value) {
		const newState = this.props.event.set('description', value);
		this.props.updateEventData(newState);
	}

	setLocation(event, value) {
		const newState = this.props.event.set('location', value);
		this.props.updateEventData(newState);
	}

	setStartDate(event, date) {
		let newState = this.props.event.set('startDate', date);
		if(!this.props.event.has('endDate')) {
			newState = newState.set('endDate', date);
		}
		this.props.updateEventData(newState);
	}

	setStartTime(event, time) {
		let newState = this.props.event.set('startTime', time);
		if(!this.props.event.has('endTime')) {
			newState = newState.set('endTime', moment(time).add(1, 'hours').toDate());
		}
		this.props.updateEventData(newState);
	}

	setEndDate(event, date) {
		const newState = this.props.event.set('endDate', date);
		this.props.updateEventData(newState);
	}

	setEndTime(event, time) {
		const newState = this.props.event.set('endTime', time);
		this.props.updateEventData(newState);
	}

	handleGuildClick(event) {
		const guild = Map(JSON.parse(event.target.getAttribute('data-guild')));
		const oldGuilds = this.props.event.get('guilds');
		const newGuilds = oldGuilds.includes(guild) ? oldGuilds.delete(guild) : oldGuilds.add(guild);
		const newState = this.props.event.set('guilds', newGuilds);
		this.props.updateEventData(newState);
	}

	setUrl(event, value) {
		const newState = this.props.event.set('url', value);
		this.props.updateEventData(newState);
	}

	addEvent() {
		if(!this.areRequiredFieldsFilled()) {
			return;
		}
		this.props.close();
		const eventData = this.props.event;
		// Format start date
		let startDate = moment(eventData.get('startDate'));
		const startTime = moment(eventData.get('startTime'));
		startDate = startDate.add(startTime.hours(), 'hours');
		startDate = startDate.add(startTime.minutes(), 'minutes');
		startDate = startDate.toISOString()

		// Format end date
		let endDate = moment(eventData.get('endDate'));
		const endTime = moment(eventData.get('endTime'));
		endDate = endDate.add(endTime.hours(), 'hours');
		endDate = endDate.add(endTime.minutes(), 'minutes');
		endDate = endDate.toISOString();

		const event = Map({
      _id: eventData.get('_id'),
			name: eventData.get('name'),
			description: eventData.get('description'),
			location: eventData.get('location'),
			startDate: startDate.toString(),
			endDate: endDate.toString(),
			guilds: eventData.get('guilds').toList(),
			url: eventData.get('url')
		});
		this.props.submit(event);
    this.props.clearForm()
	}

  areRequiredFieldsFilled() {
    const data = this.props.event;

    // Validate title
    const name = data.has('name');

    // Validate times
    let dates = false
    if(data.has('startDate') && data.has('startTime') && data.has('endDate') && data.has('endTime')) {
      const startTime = moment(data.get('startTime'))
      const startDate = moment(data.get('startDate'))
      startDate.add(startTime.hours(), 'hours')
      startDate.add(startTime.minutes(), 'minutes')

      const endTime = moment(data.get('endTime'))
      const endDate = moment(data.get('endDate'))
      endDate.add(endTime.hours(), 'hours')
      endDate.add(endTime.minutes(), 'minutes')

      if(startDate < endDate) { dates = true }
    }

    // Validate guilds
    const guilds = data.get('guilds').some((guild) => {
      return guild.get('_id') == this.props.user.get('admin').get('_id')
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
						value={this.props.event.has('name') ? this.props.event.get('name') : ''}
					/>
					<TextField
						floatingLabelText='Description'
						multiLine={true}
						onChange={this.setDescription}
						value={this.props.event.has('description') ? this.props.event.get('description') : ''}
					/>
					<TextField
						floatingLabelText='Location'
						onChange={this.setLocation}
						value={this.props.event.has('location') ? this.props.event.get('location') : ''}
					/>
					<TextField
						floatingLabelText='URL'
						onChange={this.setUrl}
						value={this.props.event.has('url') ? this.props.event.get('url') : ''}
					/>
					<div style={styles.window.time}>
						<DatePicker
							hintText='Start date'
							autoOk={true}
							textFieldStyle={styles.window.time.textField}
							onChange={this.setStartDate}
							value={this.props.event.get('startDate')}
						/>
						<TimePicker
							hintText='Start time'
							format='24hr'
							autoOk={true}
							textFieldStyle={styles.window.time.textField}
							onChange={this.setStartTime}
							value={this.props.event.get('startTime')}
						/>
					</div>
					<div style={styles.window.time}>
						<DatePicker
							hintText='End date'
							autoOk={true}
							textFieldStyle={styles.window.time.textField}
							onChange={this.setEndDate}
							value={this.props.event.get('endDate')}
						/>
						<TimePicker
							hintText='End time'
							format='24hr'
							autoOk={true}
							textFieldStyle={styles.window.time.textField}
							onChange={this.setEndTime}
							value={this.props.event.get('endTime')}
						/>
					</div>
					<div style={styles.window.guildSelection}>
						{this.props.guilds.map((guild, index) =>
							<Checkbox
								key={index}
								label={guild.get('name')}
								style={styles.window.guildSelection.checkbox}
								data-guild={JSON.stringify(guild)}
								onCheck={this.handleGuildClick}
								checked={this.props.event.get('guilds').includes(guild)}
							/>
						)}
					</div>
				</div>
			</Dialog>
		)
	}
}

EventForm.propTypes = {
	guilds: ImmutablePropTypes.set.isRequired,
	open: PropTypes.bool.isRequired,
	close: PropTypes.func.isRequired,
	submit: PropTypes.func.isRequired,
	user: ImmutablePropTypes.map.isRequired,
  event: ImmutablePropTypes.map.isRequired,
  clearForm: PropTypes.func.isRequired
}
