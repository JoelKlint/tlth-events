import { createSelector } from 'reselect'

export const shouldEventViewerBeOpen = (state) => state.eventViewer.open
