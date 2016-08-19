import Models from '../models'
import UnauthorizedError from '../config/UnauthorizedError'

const Auth = {}

/**
 * Validates user is admin and attaches the user object to the request
 */
Auth.admin = async (req, res, next) => {
  try {
    let user = await Models.User.findOne({
      where: { username: req.session.cas_user },
      attributes: { exclude: [] }
    })
    user = user.get({plan:true})
    console.log(user)
    if(!user.adminGuildId) return next(new UnauthorizedError())
    req.user = user
    next()
  }
  catch(err) {
    next(err)
  }
  return
}

export default Auth
