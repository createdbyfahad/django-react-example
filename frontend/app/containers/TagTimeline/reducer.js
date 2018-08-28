/*
 *
 * Timeline reducer
 *
 */

import { fromJS } from 'immutable';
import {DEFAULT_ACTION, UPVOTE_PROCESS, DOWNVOTE_PROCESS,
  UPVOTE_SUCCESS, DOWNVOTE_SUCCESS,
  TIMELINE_FETCH_PROCESS, TIMELINE_FETCH_SUCCESS, PAGINATED_TIMELINE_FETCH_SUCCESS, TAG_TIMELINE_FETCH_SUCCESS, TAG_TIMELINE_FETCH_PROCESS} from "./constants";

export const initialState = fromJS({
  notes: [],
  tag_title: null,
  next_link: null,
});

function timelineReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case TIMELINE_FETCH_SUCCESS:
      return state.set('notes', action.notes);
    case TAG_TIMELINE_FETCH_PROCESS:
      if(action.isInitial === true) return initialState.set('tag_title', action.tag_title);
      return state.set('tag_title', action.tag_title);
    case TAG_TIMELINE_FETCH_SUCCESS:
      // if(action.isInitial){
      //   state = state.set('notes', action.notes);
      // }else{
      //   state = state.update('notes', list => list.push(...action.notes));
      // }
      return state.update('notes', list => list.push(...action.notes)).set('next_link', action.next_link);
    case DOWNVOTE_SUCCESS:
    case UPVOTE_SUCCESS:
      let notes = state.get('notes').map(note => {
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
