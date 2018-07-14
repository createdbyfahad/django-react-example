/*
 *
 * Timeline reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, TIMELINE_FETCH_SUCCESS } from './constants';

export const initialState = fromJS({
  notes: [],
});

function timelineReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case TIMELINE_FETCH_SUCCESS:
      return state.set('notes', action.notes);
    default:
      return state;
  }
}

export default timelineReducer;
