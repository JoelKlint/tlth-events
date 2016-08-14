import { getAllActiveGuildNames } from '../store/selectors/GuildSelector'
import fp from 'lodash/fp'
import isEmpty from 'lodash/isEmpty'

const baseUrl = 'webcal://localhost:3000/api/ical-events?guild='

export const getSubscribeLink = (state) => {
  const activeGuildNames = getAllActiveGuildNames(state)
  if( isEmpty(activeGuildNames) ) {
    return
  }
  const buildUrlParams = fp.join('&guild=')

  return baseUrl + buildUrlParams(activeGuildNames)
}
