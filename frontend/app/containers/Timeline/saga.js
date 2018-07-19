import {call, put, takeLatest} from "redux-saga/es/effects";
import {UPVOTE_PROCESS, DOWNVOTE_PROCESS,
  UPVOTE_SUCCESS, DOWNVOTE_SUCCESS,
  TIMELINE_FETCH_PROCESS, TIMELINE_FETCH_SUCCESS} from "./constants";
import {fetchTimelineHandler, noteUpVoteHandler, noteDownVoteHandler} from 'utils/apiHandlers';

export function* fetchTimeline(action) {
  try {
    const res = yield call(fetchTimelineHandler);
    yield put({type: TIMELINE_FETCH_SUCCESS, notes: res})
  } catch (errs) {
    // yield
    // yield put({type: NOTE_ADD_FAIL, errors: errs})
  }
}

export function* handleUpVote(action) {
  try {
    const res = yield call(noteUpVoteHandler, action.note_id);
    // success login
    yield put({type: UPVOTE_SUCCESS, note_id: action.note_id, new_votes: res})
    // yield put(null)
  } catch (errs) {
    // yield
    // yield put({type: NOTE_ADD_FAIL, errors: errs})
  }
}

export function* handleDownVote(action) {
  try {
    const res = yield call(noteDownVoteHandler, action.note_id);
    // success login
    yield put({type: DOWNVOTE_SUCCESS, note_id: action.note_id, new_votes: res})
    // yield put(null)
  } catch (errs) {
    // yield
    // yield put({type: NOTE_ADD_FAIL, errors: errs})
  }
}
// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(TIMELINE_FETCH_PROCESS, fetchTimeline);
  yield takeLatest(UPVOTE_PROCESS, handleUpVote);
  yield takeLatest(DOWNVOTE_PROCESS, handleDownVote);
}
