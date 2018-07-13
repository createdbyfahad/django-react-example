/**
 * Combine all reducers in this file and export the combined reducers.
 */

import axios from 'axios';
import {combineReducers} from 'redux-immutable';
import {fromJS, Map} from 'immutable';
import {LOCATION_CHANGE} from 'react-router-redux';
import jwtDecode from 'jwt-decode';

import languageProviderReducer from 'containers/LanguageProvider/reducer';
import {LOGIN_SUCCESS, LOGOUT_PROCESS, NEW_ACCESS_TOKEN} from "./containers/LoginPage/constants";
import {NOTE_ADD_PROCESS} from "./containers/NotesPage/constants";

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@4
 *
 */

// Initial routing state
const routeInitialState = fromJS({
  location: null,
});

/**
 * Merge route into the global application state
 */
export function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return state.merge({
        location: action.payload,
      });
    default:
      return state;
  }
}


export const authInitialReducer = fromJS({

});

export function authReducer(state = authInitialReducer, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      let auth = {
        access: {
          token: action.auth.access,
          ...jwtDecode(action.auth.access),
        },
        refresh: {
          token: action.auth.refresh,
          ...jwtDecode(action.auth.refresh),
        },
      };
      axios.defaults.headers.common['Authorization'] = `Bearer ${auth.access.token}`;
      // console.log(auth);
      return Map(auth);
    case LOGOUT_PROCESS:
      delete axios.defaults.headers.common['Authorization'];
      return authInitialReducer;
    case NEW_ACCESS_TOKEN:
      // console.log('new_access', action.new_token)
      const new_access = {
          token: action.new_token,
          ...jwtDecode(action.new_token),
        };
      axios.defaults.headers.common['Authorization'] = `Bearer ${action.new_token}`;
      return state.set('access', new_access);
    default:
      return state;
  }
}

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers) {
  return combineReducers({
    route: routeReducer,
    language: languageProviderReducer,
    auth: authReducer,
    ...injectedReducers,
  });
}
