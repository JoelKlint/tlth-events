import clone from 'lodash/fp/clone'
import without from 'lodash/fp/without'
import merge from 'lodash/fp/merge'
import set from 'lodash/fp/set'
import unset from 'lodash/fp/unset'
import assign from 'lodash/fp/assign'
import defaults from 'lodash/fp/defaults'
import API from '../actions/api'

import { normalize, Schema, arrayOf } from 'normalizr'

const eventSchema = new Schema('events')
const guildSchema = new Schema('guilds')
const userSchema = new Schema('users')

eventSchema.define({
  ownerGuild: guildSchema,
  invitedGuilds: arrayOf(guildSchema)
});

guildSchema.define({
  administrators: arrayOf(userSchema)
})

const initialState = {}

export const data = (state = initialState, action) => {
  switch (action.type) {

    case API.GET_ALL_GUILDS_SUCCESS: {
      const response = normalize(action.payload, arrayOf(guildSchema))
      return merge(state, response.entities)
    }

    case API.GET_ALL_EVENTS_SUCCESS: {
      const response = normalize(action.payload, arrayOf(eventSchema))
      return merge(state, response.entities)
    }

    case API.ADD_NEW_EVENT_REQUEST: {
      let event = action.payload
      const id = event.name + event.startDate
      event = assign(action.payload, { id: id, local: true })
      return set(['events', id], event, state)
    }

    case API.ADD_NEW_EVENT_SUCCESS: {
      const event = action.payload
      const id = event.name + event.startDate
      let newState = unset([ 'events', id ], state)
      const response = normalize(action.payload, eventSchema)
      return merge(newState, response.entities)
    }

    case API.DELETE_EVENT_REQUEST: {
      // This must be handled
      return state;
    }

    case API.DELETE_EVENT_SUCCESS: {
      return unset([ 'events', action.payload.id ], state)
    }

    case API.DELETE_EVENT_FAILURE: {
      // This must be handled
      return state;
    }

    case API.EDIT_EVENT_REQUEST: {
      let event = clone(action.payload)
      let serverVersion = clone(state.events[event.id])
      event = assign(event, { local: true, serverVersion: serverVersion })
      return set(['events', event.id], event, state)
    }

    case API.EDIT_EVENT_SUCCESS: {
      let response = normalize(action.payload, eventSchema)
      const newEvents = assign(state.events, response.entities.events)
      return assign(state, { events: newEvents })
    }

    case API.EDIT_EVENT_FAILURE: {
      // This must be handled
      return state;
    }

    case API.DECLINE_EVENT_INVITATION_REQUEST: {
      return state
    }

    case API.DECLINE_EVENT_INVITATION_SUCCESS: {
      const eventId = action.payload.eventId
      const guildId = action.payload.guildId
      let newEvent = clone(state.events[eventId])
      newEvent.invitedGuilds = without([guildId], newEvent.invitedGuilds)
      return set(['events', eventId], newEvent, state)
    }

    case API.DECLINE_EVENT_INVITATION_FAILURE: {
      return state
    }

    case API.GET_ALL_USERS_REQUEST: {
      return state
    }

    case API.GET_ALL_USERS_SUCCESS: {
      let response = normalize(action.payload, arrayOf(userSchema))
      return merge(state, response.entities)
    }

    case API.GET_ALL_USERS_FAILURE: {
      return state
    }

    case API.MAKE_USER_ADMIN_OF_GUILD_REQUEST: {
      return state
    }

    case API.MAKE_USER_ADMIN_OF_GUILD_SUCCESS: {
      let response = normalize(action.payload, guildSchema)
      const guildId = response.result
      const guild = response.entities.guilds[guildId]
      return set(['guilds', guildId], guild, state)
    }

    case API.MAKE_USER_ADMIN_OF_GUILD_FAILURE: {
      return state
    }

    case API.REMOVE_USER_ADMIN_OF_GUILD_REQUEST: {
      return state
    }

    case API.REMOVE_USER_ADMIN_OF_GUILD_SUCCESS: {
      let response = normalize(action.payload, guildSchema)
      const guildId = response.result
      const guild = response.entities.guilds[guildId]
      return set(['guilds', guildId], guild, state)
    }

    case API.REMOVE_USER_ADMIN_OF_GUILD_FAILURE: {
      return state
    }

    default:
      return state
    }
}
