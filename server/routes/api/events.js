import { Router } from 'express';
const router = Router();
import ParameterError from '../../config/ParameterError';
import UnauthorizedError from '../../config/UnauthorizedError';
import DoesNotExistError from '../../config/DoesNotExistError'
import cas from '../../middleware/cas';
import assign from 'lodash/assign'
import Models from '../../models'
import includes from 'lodash/includes'

/**
 * @api {get} /events Get all events
 * @apiName Get all events
 * @apiGroup Event
 * @apiDescription
 * Get a list of all events
 */
router.get('/', async (req, res, next) => {
  try {
    let events = await Models.Event.scope('with invitations').findAll()
    res.json(events)
  }
  catch(err) {
    return next(err)
  }
});


import Auth from '../../middleware/authorization'
/**
 * @api {post} /events Create event
 * @apiName Create event
 * @apiGroup Event
 * @apiDescription
 * Create a new Event. The owner of the event will be the guild that the
 * user sending the request is admin of. Required admin login
 */
router.post('/', cas.block, Auth.admin, async (req, res, next) => {
  try {
    // validate user is admin so it is allowed to create events.
    // Validate the event is created for the guild the user is admin of
    // Then set event owner to the guild user is admin of
    // Get the guilds from request that exists
    // Create the event
    //

    // Validate user is admin ---> via middleware
    let eventParams = req.body

    // Validate the event is created for the guild the user is admin of
    if( !includes(eventParams.invitedGuilds, req.user.adminGuildId) ) {
      return next(new ParameterError('Must create event for your own guild'))
    }

    // Set adminGuild of user as owner of event
    eventParams.ownerGuildId = req.user.adminGuildId

    // Create the event
    let event = await Models.Event.create(eventParams)
    await event.setInvitedGuilds(req.body.invitedGuilds)
    event = await Models.Event.scope('with invitations').findById(event.id)
    res.json(event)
    return
  }
  catch(err) {
    return next(err)
  }



  // try {
  //   // Clear values which should not be set from outside
  //   delete req.body.owner;
  //
  //   // Create object for building parameters for the new event
  //   const eventParams = req.body;
  //
  //   // Validate user is admin
  //   if(!req.user || !req.user.admin) { return next(new UnauthorizedError()) }
  //   // Make admin guild owner
  //   eventParams.owner = req.user.admin
  //
  //   // Validate endDate is later than startDate
  //   if(eventParams.endDate <= eventParams.startDate) {
  //     return next(new ParameterError('End date must be after startDate'))
  //   }
  //
  //   // Get the guilds from the request that exists
  //   const guilds = await Guild.find({ _id: { $in: req.body.guilds } }, '_id')
  //
  //   // Validate event is created for the admin's guild
  //   const areAdminedByUser = (guild) => {
  //     return eventParams.owner == guild.id ? true : false
  //   }
  //   if(!guilds.some(areAdminedByUser)) {
  //     return next(new ParameterError('You must create an event for your own guild'));
  //   }
  //   // Add existing guilds to the event data
  //   eventParams.guilds = guilds;
  //
  //   // Create the event
  //   let event = await Event.create(eventParams)
  //   event = await Event.populate(event, 'guilds owner')
  //   res.json(event);
  // }
  // catch(err) {
  //   return next(err)
  // }
});

/**
 * @api {get} /events/:event_id Get event
 * @apiName Get event
 * @apiGroup Event
 * @apiDescription
 * Get a specific event
 */
router.get('/:event_id', async (req, res, next) => {
  try {
    let event = await Models.Event.scope('with invitations').findById(req.params.event_id)
    res.json(event)
  }
  catch(err) {
    next(err)
  }
  return
});

/**
 * @api {put} /events/:event_id Edit event
 * @apiName Edit event
 * @apiGroup Event
 * @apiDescription
 * Edit an event.
 */
router.put('/:event_id', async (req, res, next) => {
  try {
    let event = await Models.Event.findById(req.params.event_id)
    if(!event) return next(new DoesNotExistError())
    event = assign(event, req.body)
    await event.save()
    if(req.body.invitedGuilds) await event.setInvitedGuilds(req.body.invitedGuilds)
    event = await Models.Event.scope('with invitations').findById(event.id)
    res.json(event)
  }
  catch(err) {
    next(err)
  }
  return
});

/**
 * @api {delete} /events/:event_id Delete event
 * @apiName Delete event
 * @apiGroup Event
 * @apiDescription
 * Delete an event.
 */
router.delete('/:event_id', async (req, res, next) => {
  try {
    let event = await Models.Event.findById(req.params.event_id)
    if(!event) return next(new DoesNotExistError())
    await event.destroy()
    res.json(event)
  }
  catch(err) {
    next(err)
  }
  return
});

export default router;
