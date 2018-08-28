/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

import createReducer from './reducers';
import {logger, checkAccessToken} from "utils/middlewares";

const sagaMiddleware = createSagaMiddleware();

import {loadAuthState, saveAuthState} from "./localStrorage";

export default function configureStore(initialState = {}, history) {
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [checkAccessToken, sagaMiddleware, routerMiddleware(history), logger];

  const enhancers = [applyMiddleware(...middlewares)];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle, indent */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // TODO Try to remove when `react-router-redux` is out of beta, LOCATION_CHANGE should not be fired more than once after hot reloading
          // Prevent recomputing reducers for `replaceReducer`
          shouldHotReload: false,
        })
      : compose;
  /* eslint-enable */

  const persistedState = loadAuthState()

  const store = createStore(
    createReducer(),
    fromJS(persistedState),
    composeEnhancers(...enhancers),
  );
  // TODO find a fix for the multi errors appear with task id bein replicate
  // store.subscribe(() => {
  //
  // });
  // store.subscribe(() => console.log(store.getState()))

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return store;
}
