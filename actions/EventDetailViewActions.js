export const VIEW_DETAILS = 'VIEW_EVENT_DETAILS';

export const viewEventDetails = (eventID) => {
  return {
    type: VIEW_DETAILS,
    eventID
  }
}

export const HIDE_DETAILS = 'HIDE_EVENT_DETAILS';

export const hideEventDetails = () => {
  return {
    type: HIDE_DETAILS
  }
}
