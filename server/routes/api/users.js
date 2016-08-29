import { Router } from 'express';
const router = Router();
import cas from '../../middleware/cas';
import ParameterError from '../../config/ParameterError';
import DoesNotExistError from '../../config/DoesNotExistError';
import Models from '../../models'

/**
 * @api {get} /api/users Get all users
 * @apiName Get all users
 * @apiGroup User
 * @apiDescription
 * Get a list of all users
 */
router.get('/', async (req, res, next) => {
  try {
    let users = await Models.User.findAll()
    res.json(users)
  }
  catch(err) {
    next(err)
  }
  return
});

/**
 * @api {post} /api/users Create user
 * @apiName Create user
 * @apiGroup User
 * @apiDescription
 * Create a new user
 */
router.post('/', async (req, res, next) => {
  try {
    let user = await Models.User.create(req.body, { fields: ['username'] })
    res.json(user)
  }
  catch(err) {
    next(err)
  }
  return
});


router.delete('/:user_id', async (req, res, next) => {
  try {
    let user = await Models.User.findById(req.params.user_id)
    await user.destroy()
    res.json(user)
  }
  catch(err) {
    next(err)
  }
  return
})

export default router;
