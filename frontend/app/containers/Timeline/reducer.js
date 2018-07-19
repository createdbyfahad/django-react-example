/*
 *
 * Timeline reducer
 *
 */

import { fromJS } from 'immutable';
import {DEFAULT_ACTION, UPVOTE_PROCESS, DOWNVOTE_PROCESS,
  UPVOTE_SUCCESS, DOWNVOTE_SUCCESS,
  TIMELINE_FETCH_PROCESS, TIMELINE_FETCH_SUCCESS} from "./constants";

export const initialState = fromJS({
  notes: [],
});

function timelineReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case TIMELINE_FETCH_SUCCESS:
      return state.set('notes', action.notes);
    case DOWNVOTE_SUCCESS:
    case UPVOTE_SUCCESS:
      var notes = state.get('notes').map(note => {
        if (note.id === action.note_id){
          note.votes = action.new_votes;
        }
        return note
      });
      return state.set('notes', notes);
    default:
      return state;
  }
}

export default timelineReducer;
