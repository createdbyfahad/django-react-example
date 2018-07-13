/*
 *
 * LoginPage reducer
 *
 */

import { fromJS } from 'immutable';

import {
  DEFAULT_ACTION,
  LOGIN_FAIL,
  LOGIN_PROCESS,
  LOGIN_SUCCESS,
} from './constants';
import { loginHandler } from 'utils/apiHandlers';

export const initialState = fromJS({
  errors: [],
});

function loginPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOGIN_PROCESS:
      return state.set('errors', []);
    case LOGIN_FAIL:
      return state.set('errors', action.errors);
    default:
      return state;
  }
}

export default loginPageReducer;
