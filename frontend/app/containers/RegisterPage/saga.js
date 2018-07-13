import { take, call, put, select, takeLatest} from 'redux-saga/effects';

// Individual exports for testing
import {DEFAULT_ACTION, REGISTER_FAIL, REGISTER_PROCESS, REGISTER_SUCCESS} from './constants';
import {registerHandler} from 'utils/apiHandlers';


export function* handleRegister(action) {
  // console.log(action)
  try {
    const res = yield call(registerHandler, action.fields);
    // console.log(res);
    // success login
    yield put({type: REGISTER_SUCCESS})
    yield call(action.callback)
    // yield put(null)
  } catch (errs) {
    // yield
    // console.log(errs)
    yield put({type: REGISTER_FAIL, errors: errs})
  }

}

export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(REGISTER_PROCESS, handleRegister);
}
