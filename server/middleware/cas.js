import CASAuthentication from 'cas-authentication';
const NODE_ENV = process.env.NODE_ENV;

// Get the username of the test admin
import { admin } from '../../test/mockData'
const devUser = admin().username;

// Configure authentication depending on environment
let devMode = false;
if(NODE_ENV === 'test' || NODE_ENV === 'development') {
  devMode = true;
}

const cas = new CASAuthentication({
    cas_url     : 'https://cas.lu.se/cas',
    service_url : 'http://localhost:3000',
		cas_version     : '2.0',
		renew           : false,
    is_dev_mode     : devMode,
		dev_mode_user   : devUser,
    dev_mode_info   : {},
    session_name    : 'cas_user',
    session_info    : 'cas_userinfo',
    destroy_session : false
});

import { User } from '../models'

const attachUserToRequest = (req, res, next) => {
  User.findOne({ username: req.session.cas_user })
  .then(user => {
    req.user = user
    next()
  })
  .catch(err => next(err))
}

cas.attachUser = attachUserToRequest

export default cas;
