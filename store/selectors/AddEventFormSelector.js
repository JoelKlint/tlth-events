import { createSelector } from 'reselect'

export const getAddEventFormData = (state) => state.addEventForm.event

export const shouldAddEventFormBeOpen = (state) => state.addEventForm.open
