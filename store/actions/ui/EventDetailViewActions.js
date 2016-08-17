export const VIEW_EVENT_DETAILS = 'VIEW_EVENT_DETAILS';

export const viewEventDetails = (eventID) => {
  return {
    type: VIEW_EVENT_DETAILS,
    eventID
  }
}

export const HIDE_EVENT_DETAILS = 'HIDE_EVENT_DETAILS';

export const hideEventDetails = () => {
  return {
    type: HIDE_EVENT_DETAILS
  }
}
