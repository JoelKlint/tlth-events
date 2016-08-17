import assignAll from 'lodash/fp/assignAll'

import * as Event from './EventActions'
import * as Guild from './GuildActions'


export default assignAll([
  Event,
  Guild
])
