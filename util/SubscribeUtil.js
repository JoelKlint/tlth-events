import { getAllActiveGuildNames } from '../store/selectors/GuildSelector'
import join from 'lodash/fp/join'
import isEmpty from 'lodash/isEmpty'

const baseUrl = 'webcal://localhost:3000/api/ical-events?guild='

export const getSubscribeLink = (state) => {
  const activeGuildNames = getAllActiveGuildNames(state)
  if( isEmpty(activeGuildNames) ) {
    return
  }
  const buildUrlParams = join('&guild=')

  return baseUrl + buildUrlParams(activeGuildNames)
}
