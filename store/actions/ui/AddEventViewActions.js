export const OPEN_ADD_EVENT_FORM = 'OPEN_ADD_EVENT_FORM';

export const openAddEventForm = () => {
  return {
    type: OPEN_ADD_EVENT_FORM
  }
}

export const HIDE_ADD_EVENT_FORM = 'HIDE_ADD_EVENT_FORM';

export const hideAddEventForm = () => {
  return {
    type: HIDE_ADD_EVENT_FORM
  }
}

export const UPDATE_ADD_EVENT_FORM_DATA = 'UPDATE_ADD_EVENT_FORM_DATA'

export const updateAddEventData = (event) => {
  return {
    type: UPDATE_ADD_EVENT_FORM_DATA,
    event
  }
}

export const CLEAR_ADD_EVENT_FORM_DATA = 'CLEAR_ADD_EVENT_FORM_DATA'

export const clearAddEventData = () => {
  return {
    type: CLEAR_ADD_EVENT_FORM_DATA
  }
}
