/*
 *
 * LoginPage reducer
 *
 */

import {fromJS} from 'immutable';
import {Redirect, Route} from 'react-router-dom';

import {DEFAULT_ACTION, REGISTER_FAIL, REGISTER_PROCESS, REGISTER_SUCCESS} from './constants';

export const initialState = fromJS({
  errors: [],
});

function registerPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case REGISTER_PROCESS:
      return state.set('errors', []);
    case REGISTER_FAIL:
      return state.set('errors', action.errors);
    case REGISTER_SUCCESS:
      // return state.set('register_success', true)
      return state
    default:
      return state;
  }
}

export default registerPageReducer;
