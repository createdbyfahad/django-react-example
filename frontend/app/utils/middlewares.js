import {isAccessTokenExpired} from "containers/AuthProvider/selectors";
import {NEW_ACCESS_TOKEN} from "containers/LoginPage/constants";
import {refreshAccessToken} from "./apiHandlers";
import axios from "axios/index";

export const logger = store => next => action => {
  console.log('dispatching', action);
  const result = next(action);
  console.log('next state', store.getState());
  return result;
};

export const checkAccessToken = (store) => next => action => {
  // console.log("checking the token status")
  // store.dispatch({type: NEW_ACCESS_TOKEN, new_token: 'fsdafasd'})
  const token = store.getState().get('auth');
  if(action.type !== NEW_ACCESS_TOKEN && token.get('access') !== undefined && isAccessTokenExpired(token.toJS())){
  // if(action.type !== NEW_ACCESS_TOKEN && token.get('access') !== undefined){
    // token is expired
    // get a new token using the refresh token
    // console.log(token.get('refresh').token)
    // TODO maybe there is a better way for doing asynchrous call?
    return refreshAccessToken(token.get('refresh').get('token'),
      (new_token) => {store.dispatch({type: NEW_ACCESS_TOKEN, new_token: new_token}); return next(action);});
    // pass

  }
  return next(action);
}
