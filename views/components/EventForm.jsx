import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import Checkbox from 'material-ui/Checkbox';
import moment from 'moment';
import * as util from '../../util/EventFormUtil'
import has from 'lodash/fp/has'
import includes from 'lodash/fp/includes'
import compact from 'lodash/fp/compact'
import assign from 'lodash/fp/assign'
import without from 'lodash/fp/without'
import concat from 'lodash/fp/concat'

export default class EventForm extends Component {

  updateFormData(newData) {
    const newFormData = assign(this.props.event)(newData)
    this.props.updateEventData(newFormData)
  }

	setStartDate(event, date) {
    const hasEndDate = has('endDate')
    if( hasEndDate(this.props.event) ) {
      this.updateFormData({ startDate: date })
    }
    else {
      this.updateFormData({ startDate: date, endDate: date })
    }
	}

	setStartTime(event, time) {
    const hasEndTime = has('endTime')
    if( hasEndTime(this.props.event) ) {
      this.updateFormData({ startTime: time })
    }
    else {
      const endTime = moment(time.toISOString()).add(1, 'hours').toDate()
      this.updateFormData({ startTime: time, endTime: endTime })
    }
	}

	handleGuildClick(event) {
    const guildID = event.target.getAttribute('data-guildID')
    let guilds = this.props.event.guilds
    guilds = includes(guildID, guilds) ? without([ guildID ], guilds) : concat(guilds, guildID)
    guilds = compact(guilds)
    console.log(typeof guildID)
    this.updateFormData({ guilds: guilds })
	}

	submitEvent() {
    if( this.props.validateForm() ) {
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
        onTouchTap={() => this.submitEvent()}
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
            onChange={(event, value) => this.updateFormData({ name: value })}
						value={this.props.event.name}
					/>
					<TextField
						floatingLabelText='Description'
						multiLine={true}
						onChange={(event, value) => this.updateFormData({ description: value })}
						value={this.props.event.description}
					/>
					<TextField
						floatingLabelText='Location'
						onChange={(event, value) => this.updateFormData({ location: value })}
						value={this.props.event.location}
					/>
					<TextField
						floatingLabelText='URL'
						onChange={(event, value) => this.updateFormData({ url: value })}
						value={this.props.event.url}
					/>
					<div style={styles.window.time}>
						<DatePicker
							hintText='Start date'
							autoOk={true}
							textFieldStyle={styles.window.time.textField}
							onChange={(event, value) => this.setStartDate(event, value)}
							value={this.props.event.startDate}
						/>
						<TimePicker
							hintText='Start time'
							format='24hr'
							autoOk={true}
							textFieldStyle={styles.window.time.textField}
							onChange={(event, value) => this.setStartTime(event, value)}
							value={this.props.event.startTime}
						/>
					</div>
					<div style={styles.window.time}>
						<DatePicker
							hintText='End date'
							autoOk={true}
							textFieldStyle={styles.window.time.textField}
							onChange={(event, value) => this.updateFormData({ endDate: value })}
							value={this.props.event.endDate}
						/>
						<TimePicker
							hintText='End time'
							format='24hr'
							autoOk={true}
							textFieldStyle={styles.window.time.textField}
							onChange={(event, value) => this.updateFormData({ endTime: value })}
							value={this.props.event.endTime}
						/>
					</div>
					<div style={styles.window.guildSelection}>
						{this.props.guilds.map((guild, index) =>
							<Checkbox
								key={index}
								label={guild.name}
								style={styles.window.guildSelection.checkbox}
								data-guildID={guild._id}
                onCheck={(event) => this.handleGuildClick(event)}
                checked={includes(guild._id, this.props.event.guilds)}
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
  event: PropTypes.object.isRequired,
  clearForm: PropTypes.func,
  clearButtonEnabled: PropTypes.bool,
  validateForm: PropTypes.func.isRequired
}
