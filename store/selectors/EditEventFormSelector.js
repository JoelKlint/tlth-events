import { createSelector } from 'reselect'

export const getEditEventFormData = (state) => state.editEventForm.event

export const shouldEditEventFormBeOpen = (state) => state.editEventForm.open
