export const OPEN_EDIT_EVENT_FORM = 'OPEN_EDIT_EVENT_FORM';

export const openEditEventForm = (event) => {
  return {
    type: OPEN_EDIT_EVENT_FORM,
    event
  }
}

export const HIDE_EDIT_EVENT_FORM = 'HIDE_EDIT_EVENT_FORM';

export const hideEditEventForm = () => {
  return {
    type: HIDE_EDIT_EVENT_FORM
  }
}

export const UPDATE_EDIT_EVENT_FORM_DATA = 'UPDATE_EDIT_EVENT_FORM_DATA'

export const updateEditEventData = (event) => {
  return {
    type: UPDATE_EDIT_EVENT_FORM_DATA,
    event
  }
}
