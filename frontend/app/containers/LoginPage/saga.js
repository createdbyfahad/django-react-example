import { take, call, put, select, takeLatest} from 'redux-saga/effects';

// Individual exports for testing
import {LOGIN_FAIL, LOGIN_PROCESS, LOGIN_SUCCESS} from './constants';
import {loginHandler} from 'utils/apiHandlers';


export function* handleLogin(action) {

  console.log("in saga", action.username, action.password);
  try {
    const res = yield call(loginHandler, action.username, action.password);
    // console.log(res);
    // success login
    yield put({type: LOGIN_SUCCESS, auth: res})
    // yield put(null)
  } catch (errs) {
    // yield
    // console.log(errs)
    yield put({type: LOGIN_FAIL, errors: errs})
  }

}
export function* testFunc(action) {
  console.log("refresh token");
}
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(LOGIN_PROCESS, handleLogin);
}
