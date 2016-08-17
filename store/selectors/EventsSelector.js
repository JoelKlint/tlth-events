import { createSelector } from 'reselect'
import values from 'lodash/fp/values'
import union from 'lodash/fp/union'
import filter from 'lodash/fp/filter'
import some from 'lodash/fp/some'
import includes from 'lodash/fp/includes'
import clone from 'lodash/fp/clone'
import map from 'lodash/fp/map'
import isNil from 'lodash/fp/isNil'
import moment from 'moment'
import * as EventUtil from '../../util/EventUtil'

// Other selectors
import { _getAllGuildsAsMap, getActiveGuilds } from './GuildSelector'

export const _getAllEventsAsMap = (state) => state.data.events
export const getAllEvents = (state) => values(state.data.events)

export const getNonSavedEvents = createSelector(
  [ _getAllEventsAsMap ],
  (allEvents) => {
    const filterUnsavedEvents = filter(event => EventUtil.isNotSaved(event))
    return filterUnsavedEvents(values(allEvents))
  }
)

export const getVisibleEvents = createSelector(
  [ _getAllEventsAsMap, getNonSavedEvents, getActiveGuilds ],
  (allEvents, localEvents, activeGuilds) => {
    const hasActiveGuild = some(guild => includes(guild, activeGuilds))
    const filterVisibleEvents = filter(event => hasActiveGuild(event.guilds))

    let visibleEvents = filterVisibleEvents(values(allEvents))
    return union( visibleEvents, localEvents )
  }
)

export const getVisibleEventID = (state) => state.eventViewer.eventID

export const getCurrentEvent = createSelector(
  [ _getAllEventsAsMap, _getAllGuildsAsMap, getVisibleEventID ],
  (events, guilds, currentEventID) => {
    if(isNil(currentEventID)) {
      return
    }
    let eventObject = clone(events[currentEventID])
    const populateGuildObject = map(guildID => guilds[guildID])
    eventObject.guilds = populateGuildObject(eventObject.guilds)
    eventObject.owner = guilds[eventObject.owner]
    eventObject.startDate = moment(eventObject.startDate).toDate()
    eventObject.endDate = moment(eventObject.endDate).toDate()
    return eventObject
  }
)
