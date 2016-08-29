import { Router } from 'express';
const router = Router();
import ParameterError from '../../config/ParameterError';
import DoesNotExistError from '../../config/DoesNotExistError'
import Models from '../../models'
import assign from 'lodash/assign'

/**
 * @api {get} /api/guilds Get all guilds
 * @apiName Get all guilds
 * @apiGroup Guild
 * @apiDescription
 * Get a list of all guilds
 */
router.get('/', async (req, res, next) => {
  try {
    let guilds = await Models.Guild.findAll({ include: {all:true} })
    res.json(guilds)
  }
  catch(err) {
    return next(err)
  }
});

/**
 * @api {post} /api/guilds Create a guild
 * @apiName Create a guild
 * @apiGroup Guild
 * @apiDescription
 * Create a new guild
 */
router.post('/', async (req, res, next) => {
  try {
    let guild = await Models.Guild.create(req.body)
    res.json(guild)
  }
  catch(err) {
    return next(err)
  }
});

/**
 * @api {get} /api/guilds/:guild_id Get specific guild
 * @apiName Get specific guild
 * @apiGroup Guild
 * @apiDescription
 * Get a specific guild
 */
router.get('/:guild_id', async (req, res, next) => {
  try {
    let guild = await Models.Guild.findById(req.params.guild_id)
    if(!guild) return next(new DoesNotExistError())
    res.json(guild)
  }
  catch(err) {
    next(err)
  }
  return


	// Guild.findById(req.params.guild_id).then(function(guild) {
	// 	if(!guild) {
	// 		const err = new ParameterError('Guild does not exist');
	// 		return next(err);
	// 	}
	// 	res.json(guild);
	// })
	// .catch(function(err) {
	// 	return next(err);
	// })
});

/**
 * @api {put} /api/guilds/:guild_id Edit guild
 * @apiName Edit guild
 * @apiGroup Guild
 * @apiDescription
 * Edit a guild
 */
router.put('/:guild_id', async (req, res, next) => {
  try {
    let guild = await Models.Guild.findById(req.params.guild_id)
    if(!guild) return next(new DoesNotExistError())
    guild = assign(guild, req.body)
    await guild.save()
    res.json(guild)
  }
  catch(err) {
    next(err)
  }
  return
});

/**
 * @api {delete} /api/guilds/:guild_id Delete guild
 * @apiName Delete guild
 * @apiGroup Guild
 * @apiDescription
 * Delete a guild
 */
router.delete('/:guild_id', async (req, res, next) => {
  try {
    let guild = await Models.Guild.findById(req.params.guild_id)
    if(!guild) return next(new DoesNotExistError())
    await guild.destroy()
    res.json(guild)
  }
  catch(err) {
    next(err)
  }
  return
});

/**
 * @api {post} /api/guilds/:guild_id/admin Add user as admin of guild
 * @apiName Add user as admin of guild
 * @apiGroup Guild
 * @apiDescription
 * Make user admin of a guild
 */
router.post('/:guild_id/admin', async (req, res, next) => {
  try {
    let guild = await Models.Guild.findById(req.params.guild_id)
    await guild.addAdministrator(req.body.userId)
    guild = await guild.reload()
    res.json(guild)
  }
  catch(err) {
    next(err)
  }
  return
})


router.delete('/:guild_id/admin', async (req, res, next) => {
  try {
    let guild = await Models.Guild.findById(req.params.guild_id)
    await guild.removeAdministrator(req.body.userId)
    guild = await guild.reload()
    res.json(guild)
  }
  catch(err) {
    next(err)
  }
  return
})

export default router;
