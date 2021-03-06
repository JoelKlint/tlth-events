import assignAll from 'lodash/fp/assignAll'

import * as Event from './EventActions'
import * as Guild from './GuildActions'
import * as User from './UserActions'


export default assignAll([
  Event,
  Guild,
  User
])
