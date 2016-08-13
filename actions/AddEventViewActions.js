export const OPEN_FORM = 'OPEN_ADD_EVENT_FORM';

export const openAddEventForm = () => {
  return {
    type: OPEN_FORM
  }
}

export const HIDE_FORM = 'CLOSE_ADD_EVENT_FORM';

export const hideAddEventForm = () => {
  return {
    type: HIDE_FORM
  }
}

export const UPDATE_EVENT_DATA = 'UPDATE_DATA_IN_ADD_EVENT_FORM'

export const updateAddEventData = (event) => {
  return {
    type: UPDATE_EVENT_DATA,
    event
  }
}

export const CLEAR_EVENT_DATA = 'CLEAR_DATA_IN_ADD_EVENT_FORM'

export const clearAddEventData = () => {
  return {
    type: CLEAR_EVENT_DATA
  }
}
