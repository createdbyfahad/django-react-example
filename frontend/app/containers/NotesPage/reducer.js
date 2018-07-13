/*
 *
 * NotesPage reducer
 *
 */

import { fromJS } from 'immutable';
import {DEFAULT_ACTION, NOTE_ADD_FAIL, NOTE_ADD_PROCESS, NOTE_ADD_SUCCESS, NOTES_FETCH_SUCCESS} from './constants';

export const initialState = fromJS({
  errors: [],
  notes: [],
});

function notesPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case NOTE_ADD_PROCESS:
      return state.set('errors', []);
    case NOTE_ADD_SUCCESS:
      return state.updateIn(['notes'], arr => arr.concat(action.note));
    case NOTE_ADD_FAIL:
      return state.set('errors', action.errors);
    case NOTES_FETCH_SUCCESS:
      return state.set('notes', action.notes);
    default:
      return state;
  }
}

export default notesPageReducer;
