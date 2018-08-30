/*
 *
 * PopularTags reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION } from './constants';
import {FETCH_TAGS_PROCESS, FETCH_TAGS_SUCCESS} from "./constants";

export const initialState = fromJS({
  tags: [],
});

function popularTagsReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case FETCH_TAGS_SUCCESS:
      return state.set('tags', action.tags);
    default:
      return state;
  }
}

export default popularTagsReducer;
