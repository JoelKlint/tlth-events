import { Router } from 'express';
const router = Router();
import { VCalendar, VEvent } from 'cozy-ical';
import ParameterError from '../../config/ParameterError';
import moment from 'moment';
import Models from '../../models'
import map from 'lodash/fp/map'
import uniq from 'lodash/fp/uniq'
import forEach from 'lodash/fp/forEach'

/**
 * @api {get} /ical-events Get events as ICAL
 * @apiName Get events as ICAL
 * @apiGroup ICAL events
 * @apiDescription
 * Get events as ICAL for specified guilds.
 * Example for D-guild:
 * /api/ical-events?guild=D
 *
 * Example for D-guild and F-guild
 * /api/ical-events?guild=D&guild=F
 */
router.get('/', async (req, res, next) => {
  try {
    // Put guilds in array
    let inputGuilds = []
    if(typeof req.query.guild === 'string') inputGuilds.push(req.query.guild)
    else inputGuilds = req.query.guild

    // Get ids of guilds
    inputGuilds = await Models.Guild.findAll({
      where: {
        name: {
          $in: inputGuilds
        }
      },
      attributes: ['id']
    })
    inputGuilds = map(guild => guild.id, inputGuilds)

    // Get ids of events
    const invitations = await Models.Invitation.findAll({
      where: {
        guildId: {
          $in: inputGuilds
        }
      }
    })
    let eventIds = map(invitation => invitation.eventId, invitations)
    eventIds = uniq(eventIds)

    // Get events from DB
    const events = await Models.Event.findAll({
      where: {
        id: {
          $in: eventIds
        }
      }
    })

    // Translate to ICAL
    const org = 'Cal';
    const cal = new VCalendar( {
      organization: org,
      title: org + 'Calendar'
    });
    // function for converting an event to ICAL format
    const convertToICAL = (event) => {
      let desc
      if(event.url) {
        desc = event.url + '\n' + event.description;
      }
      else {
        desc = event.description;
      }
      const vevent = new VEvent({
        stampDate: moment(new Date(event.startDate)).subtract(2, 'hours').toISOString(),
        startDate: moment(new Date(event.startDate)).subtract(2, 'hours').toISOString(),
        endDate: moment(new Date(event.endDate)).subtract(2, 'hours').toISOString(),
        description: desc,
        location: event.location,
        summary: event.name,
        uid: event.id
      })
      cal.add(vevent)
    }

    // Perform the convertion
    forEach(convertToICAL, events)
    res.type('text/calendar').send(cal.toString());

  }
  catch(err) {
    next(err)
  }
  return
});

export default router;
