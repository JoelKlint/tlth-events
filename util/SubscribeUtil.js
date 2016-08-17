import Selector from '../store/selectors'
import join from 'lodash/fp/join'
import isEmpty from 'lodash/isEmpty'

const baseUrl = 'webcal://localhost:3000/api/ical-events?guild='

export const getSubscribeLink = (state) => {
  const activeGuildNames = Selector.getAllActiveGuildNames(state)
  if( isEmpty(activeGuildNames) ) {
    return
  }
  const buildUrlParams = join('&guild=')

  return baseUrl + buildUrlParams(activeGuildNames)
}
