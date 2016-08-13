import _ from 'lodash'

import { GET_ALL_REQUEST, GET_ALL_SUCCESS, GET_ALL_FAILURE } from '../../actions/GuildActions';

const initialState = []

export const guilds = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_SUCCESS:
      return _.union(state, action.payload)
		default:
			return state
	}
}
