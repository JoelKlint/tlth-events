export const OPEN_FORM = 'OPEN_EDIT_EVENT_FORM';

export const openEditEventForm = (ImmutableEventData) => {
  return {
    type: OPEN_FORM,
    ImmutableEventData
  }
}

export const HIDE_FORM = 'CLOSE_EDIT_EVENT_FORM';

export const hideEditEventForm = () => {
  return {
    type: HIDE_FORM
  }
}

export const UPDATE_EVENT_DATA = 'UPDATE_DATA_IN_EDIT_EVENT_FORM'

export const updateEditEventData = (ImmutableEventData) => {
  return {
    type: UPDATE_EVENT_DATA,
    ImmutableEventData
  }
}
