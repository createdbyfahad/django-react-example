import {createSelector} from 'reselect';
import {authInitialReducer} from '../../reducers';


export const selectAuthDomain = state => state.get('auth', authInitialReducer)

/**
 * Other specific selectors
 */


export function isAccessTokenExpired(state) {
  if (state.access && state.access.exp) {
    return 1000 * state.access.exp - (new Date()).getTime() < 5000
    // return 1000 * state.access.exp - (new Date()).getTime() < 20000
  }
  return true
}

export function isRefreshTokenExpired(state) {
  if (state.refresh && state.refresh.exp) {
    return 1000 * state.refresh.exp - (new Date()).getTime() < 5000
    // return 1000 * state.refresh.exp - (new Date()).getTime() < 20000
  }
  return true
}


export const makeSelectAuth = () =>
  createSelector(selectAuthDomain, substate => substate.toJS());

export const isAuthenticated = () =>
  createSelector(selectAuthDomain, substate => !isRefreshTokenExpired(substate.toJS()));

