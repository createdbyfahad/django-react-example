import {call, put, takeLatest} from "redux-saga/es/effects";
import {TIMELINE_FETCH_PROCESS, TIMELINE_FETCH_SUCCESS} from "./constants";
import {fetchTimelineHandler} from 'utils/apiHandlers';

export function* fetchTimeline(action) {
  try {
    const res = yield call(fetchTimelineHandler);
    yield put({type: TIMELINE_FETCH_SUCCESS, notes: res})
  } catch (errs) {
    // yield
    // yield put({type: NOTE_ADD_FAIL, errors: errs})
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(TIMELINE_FETCH_PROCESS, fetchTimeline);
}
