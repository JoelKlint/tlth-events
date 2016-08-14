import { createSelector } from 'reselect'
import values from 'lodash/values'
import fp from 'lodash/fp'
import moment from 'moment'

const getAllEvents = (state) => state.data.events
const getAllGuilds = (state) => state.data.guilds
const getAllLocalEvents = (state) => state.data.local

const getActiveGuilds = (state) => state.activeGuilds

export const getVisibleEvents = createSelector(
  [ getAllEvents, getAllLocalEvents, getActiveGuilds ],
  (events, localEvents, activeGuilds) => {
    let persistentEvents = values(events)

    const hasActiveGuild = fp.some(guild => fp.includes(guild, activeGuilds))

    const filter = fp.filter(event => hasActiveGuild(event.guilds))

    let nonPersistentEvents = values(localEvents)

    return fp.concat( filter(persistentEvents), nonPersistentEvents )
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
