import React, { Component, PropTypes } from 'react'
import { List, ListItem } from 'material-ui/List'
import * as EventUtil from '../../util/EventUtil'

export default class Dashboard extends Component {

  render() {
    const styles = {
      base: {
        width: '100%',
        display: 'flex'
      },
      column: {
        width: '33%',
        padding: '0.5em',
        display: 'flex',
        flexDirection: 'column',
        header: {
          marginTop: '1em',
          height: '3em',
          textAlign: 'center'
        }
      }
    }

    return(
      <div style={styles.base}>
        <div style={styles.column}>
          <div style={styles.column.header}>
            <h3>Events you are hosting</h3>
          </div>
          <List>
            { this.props.eventsHostedByAdminGuild.map(event => {
              let dateAndTime = ''
              dateAndTime += EventUtil.getDateAsString(event)
              dateAndTime += ' | '
              dateAndTime += EventUtil.getTimeAsString(event)

              return (
                <ListItem
                  key={event.id}
                  primaryText={event.name}
                  secondaryText={dateAndTime}
                  onTouchTap={() => this.props.viewEventDetails(event.id)}
                />
              )
            })}
          </List>
        </div>
        <div style={styles.column}>
          <div style={styles.column.header}>
            <h3>Events you are invited to</h3>
          </div>
          <List>
            <ListItem primaryText='2' />
          </List>
        </div>
        <div style={styles.column}>
          <div style={styles.column.header}>
            <h3>Manage administrators</h3>
          </div>
          <List>
            <ListItem primaryText='3' />
          </List>
        </div>
      </div>
    )
  }

}
