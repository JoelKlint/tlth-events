export const VIEW_DETAILS = 'VIEW_EVENT_DETAILS';

export const viewEventDetails = (ImmutableEventData) => {
  return {
    type: VIEW_DETAILS,
    ImmutableEventData
  }
}

export const HIDE_DETAILS = 'HIDE_EVENT_DETAILS';

export const hideEventDetails = () => {
  return {
    type: HIDE_DETAILS
  }
}
