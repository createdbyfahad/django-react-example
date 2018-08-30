// import { take, call, put, select } from 'redux-saga/effects';
import {call, put, takeLatest} from "redux-saga/es/effects";
import {FETCH_TAGS_PROCESS, FETCH_TAGS_SUCCESS} from "./constants";

import {fetchPopularTagsHandler} from 'utils/apiHandlers';

export function* fetchTags(action) {
  // console.log("in saga", action)
  try {
    const res = yield call(fetchPopularTagsHandler);
    // success login
    yield put({type: FETCH_TAGS_SUCCESS, tags: res})
    // yield put(null)
  } catch (errs) {
    // yield
    // yield put({type: NOTE_ADD_FAIL, errors: errs})
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(FETCH_TAGS_PROCESS, fetchTags);

}

