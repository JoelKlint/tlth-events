import React, { Component, PropTypes } from 'react'
import Chip from 'material-ui/Chip';
import AutoComplete from 'material-ui/AutoComplete';
import { List, ListItem } from 'material-ui/List'
import * as EventUtil from '../../util/EventUtil'
import map from 'lodash/fp/map'

export default class Dashboard extends Component {

  constructor(props) {
    super(props)
    this.state = { addAdminText: '' }
  }

  componentDidMount() {
		this.props.getAllUsers();
	}

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
      },
      manageAdmins: {
        display: 'flex',
        flexWrap: 'wrap'
      },
      userChip: {
        margin: '0.3em'
      }
    }

    let allUsers = [
      {
        id: 1,
        username: 'dat13jkl'
      },
      {
        id: 2,
        username: 'dic14eha'
      },
      {
        id: 3,
        username: 'dat15jkl'
      },
      {
        id: 4,
        username: 'dat16jkl'
      },
      {
        id: 18,
        username: 'dat17jkl'
      }
    ]

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

          <div style={styles.manageAdmins}>
            { this.props.adminsOfCurrentAdminGuild.map(user =>
              <Chip
                style={styles.userChip}
                key={user.id}
                onRequestDelete={() => this.props.deleteUserAdmin(user.id)}
              >
                {user.username}
              </Chip>
            )}
          </div>

          <div>
            <AutoComplete
              hintText='Add new administrator'
              searchText={this.state.addAdminText}
              dataSource={this.props.allUsers}
              dataSourceConfig={{ text: 'username', value: 'id' }}
              onUpdateInput={(text) => this.setState({ addAdminText: text })}
              onNewRequest={(user) => {
                this.props.makeUserAdmin(user.id)
                this.setState({ addAdminText: '' })
              }
              }
            />
          </div>

        </div>
      </div>
    )
  }

}
