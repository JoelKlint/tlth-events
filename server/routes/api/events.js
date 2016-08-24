import { Router } from 'express';
const router = Router();
import ParameterError from '../../config/ParameterError';
import UnauthorizedError from '../../config/UnauthorizedError';
import DoesNotExistError from '../../config/DoesNotExistError'
import cas from '../../middleware/cas';
import assign from 'lodash/assign'
import Models from '../../models'
import includes from 'lodash/includes'
import Auth from '../../middleware/authorization'

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

/*
 * @api {delete} /events/:event_id/invitation Decline an invitation to an event
 * @apiName Delete event invitation
 * @apiGroup Event
 * @apiDescription
 * Delete an event invitation.
*/
router.delete('/:event_id/invitation', async (req, res, next) => {
  try {
    let invitation = await Models.Invitation.find({
      where: { eventId: req.params.event_id, guildId: req.body.guildId }
    })
    if(!invitation) return next(new DoesNotExistError())
    await invitation.destroy()
    res.json(invitation)
  }
  catch(err) {
    next(err)
  }
  return
})

export default router;
