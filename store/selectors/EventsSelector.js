import { createSelector } from 'reselect'
import values from 'lodash/fp/values'
import union from 'lodash/fp/union'
import filter from 'lodash/fp/filter'
import moment from 'moment'
import * as EventUtil from '../../util/EventUtil'

import fp from 'lodash/fp'

// Other selectors
import { getAllGuilds, getActiveGuilds } from './GuildSelector'

export const getAllEvents = (state) => values(state.data.events)

export const getNonSavedEvents = createSelector(
  [ getAllEvents ],
  (allEvents) => {
    const filterUnsavedEvents = filter(event => EventUtil.isNotSaved(event))
    return filterUnsavedEvents(allEvents)
  }
)

export const getVisibleEvents = createSelector(
  [ getAllEvents, getNonSavedEvents, getActiveGuilds ],
  (allEvents, localEvents, activeGuilds) => {
    const hasActiveGuild = fp.some(guild => fp.includes(guild, activeGuilds))
    const filterVisibleEvents = fp.filter(event => hasActiveGuild(event.guilds))

    let visibleEvents = filterVisibleEvents(allEvents)
    return union( visibleEvents, localEvents )
  }
)

const getVisibleEventID = (state) => state.eventViewer.eventID

export const getCurrentEvent = createSelector(
  [ getAllEvents, getAllGuilds, getVisibleEventID ],
  (events, guilds, currentEventID) => {
    if(!currentEventID) {
      return undefined
    }
    let eventObject = fp.assignAll([ events[currentEventID] ])
    const populateGuildObject = fp.map(guildID => guilds[guildID])
    eventObject.guilds = populateGuildObject(eventObject.guilds)
    eventObject.owner = guilds[eventObject.owner]
    eventObject.startDate = moment(eventObject.startDate).toDate()
    eventObject.endDate = moment(eventObject.endDate).toDate()
    return eventObject
  }
)
