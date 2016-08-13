import React, { Component, PropTypes } from 'react';
import Guild from './Guild.jsx';
import Divider from 'material-ui/Divider';

import _ from 'lodash'

export default class GuildList extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		const styles = {
			base: {
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
				paddingLeft: '1em'
			},
			header: {
				display: 'flex',
				justifyContent: 'center',
				flexShrink: '0',
				fontSize: '1.2em',
				paddingTop: '1em',
				paddingBottom: '1em',
				borderBottom: '1px solid black'
			},
			listOfGuilds: {
				overflowY: 'scroll'
			}
		}
		return (
			<div style={styles.base}>
				<div style={styles.header}>
					Guilds
				</div>
				<div style={styles.listOfGuilds}>
					{this.props.guilds.map((guild, index) =>
						<div key={index}>
							<Divider/>
							<Guild
								guild={guild}
								handleClick={this.props.handleClick}
								active={ _.includes(this.props.active, guild._id) }
							/>
						</div>
					)}
				</div>
			</div>
		)
	}
}

GuildList.propTypes = {
	guilds: PropTypes.array.isRequired,
	active: PropTypes.array.isRequired,
	handleClick: PropTypes.func.isRequired
}
