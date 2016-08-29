import { createSelector } from 'reselect'
import has from 'lodash/has'

export const getCurrentMainView = (state) => state.UI.mainView
