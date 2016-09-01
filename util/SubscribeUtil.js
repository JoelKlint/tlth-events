import Selector from '../store/selectors'
import join from 'lodash/fp/join'
import isEmpty from 'lodash/isEmpty'

// If we are in browser environment
let BASE_URL = ''
if( typeof window !== 'undefined' ) {
  BASE_URL = window.location.host
}
const baseIcalUrl = 'webcal://' + BASE_URL + '/api/ical-events?guild='

export const getSubscribeLink = (state) => {
  const activeGuildNames = Selector.getAllActiveGuildNames(state)
  if( isEmpty(activeGuildNames) ) {
    return
  }
  const buildUrlParams = join('&guild=')

  return baseIcalUrl + buildUrlParams(activeGuildNames)
}
