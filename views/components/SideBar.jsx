import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import GuildList from './GuildList.jsx';

export default class SideBar extends Component {

	constructor(props) {
		super(props);
	}
	render() {
		const styles = {
			base: {
				width: '100%',
				// height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
			},
			guildList: {
				display: 'flex',
				// flexDirection: 'column',
				// flexGrow: '1'
			}
		}

		return (
			<div style={styles.base}>
				<div style={styles.guildList}>
					<GuildList
						guilds={this.props.guilds}
						active={this.props.activeGuilds}
						handleClick={this.props.handleGuildClick}
					/>
				</div>
			</div>
		)
	}
}

SideBar.propTypes = {
	guilds: ImmutablePropTypes.set.isRequired,
	activeGuilds: ImmutablePropTypes.set.isRequired,
	handleGuildClick: PropTypes.func.isRequired,
}
