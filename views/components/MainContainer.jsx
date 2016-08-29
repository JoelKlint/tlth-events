import React, { Component, PropTypes } from 'react'
import Calendar from './Calendar.jsx'
import Dashboard_smart from './Dashboard_smart.js'

export default class MainContainer extends Component {

  render() {

    const styles = {
			base: {
				display: 'flex',
        width: '100%'
			}
		}

		let currentView
		if( this.props.currentView === 'Calendar' ) {
			currentView = (
				<Calendar
					events={this.props.events}
					onEventClick={this.props.onEventClick}
				/>
      )
		}
		else {
			currentView = <Dashboard_smart/>
		}

    return (
      <div style={styles.base}>
				{currentView}
      </div>
    )
  }

}
