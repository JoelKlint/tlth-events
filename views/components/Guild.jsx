import React, { Component, PropTypes } from 'react';
import CheckBox from 'material-ui/Checkbox';

export default class Guild extends Component {

	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.props.handleClick(this.props.guild.id);
	}

	render() {
		const styles = {
			base: {
				display: 'flex',
				alignItems: 'center',
				padding: '1em 0',
				cursor: 'pointer'
			},
			checkbox: {
				width: '2em'
			}
		}
		return (
			<div style={styles.base} onClick={this.handleClick}>
				<div style={styles.checkbox}>
					<CheckBox checked={this.props.active}/>
				</div>
				{this.props.guild.name}
			</div>
		)
	}
}

Guild.propTypes = {
  guild: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
	handleClick: PropTypes.func.isRequired,
	active: PropTypes.bool.isRequired
}
