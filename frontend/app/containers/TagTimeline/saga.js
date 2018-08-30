import {call, put, takeLatest, take, cancel, fork} from "redux-saga/es/effects";
import {UPVOTE_PROCESS, DOWNVOTE_PROCESS,
  UPVOTE_SUCCESS, DOWNVOTE_SUCCESS,
  TIMELINE_FETCH_PROCESS, TIMELINE_FETCH_SUCCESS, PAGINATED_TIMELINE_FETCH_PROCESS, PAGINATED_TIMELINE_FETCH_SUCCESS, TAG_TIMELINE_FETCH_PROCESS, TAG_TIMELINE_FETCH_SUCCESS} from "./constants";
import {fetchTimelineHandler, noteUpVoteHandler, noteDownVoteHandler, fetchPaginatedTimelineHandler, fetchTagTimelineHandler} from 'utils/apiHandlers';

import {LOCATION_CHANGE} from 'react-router-redux';

export function* fetchTimeline(action) {
  try {
    const res = yield call(fetchTimelineHandler);
    yield put({type: TIMELINE_FETCH_SUCCESS, notes: res})
  } catch (errs) {
    // yield
    // yield put({type: NOTE_ADD_FAIL, errors: errs})
  }
}

// for testing a paginated timeline
export function* fetchTagTimeline(action) {
  try{
    const res = yield call(fetchTagTimelineHandler, action.next_link, action.tag_title);
    // console.warn("TAG_TIMELINE_FETCH_PROCESS is called, tag_title:", action.tag_title)
    yield put({type: TAG_TIMELINE_FETCH_SUCCESS, notes: res.results, next_link: res.next})
  } catch (errs) {
    console.log(errs)
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
  yield takeLatest(TAG_TIMELINE_FETCH_PROCESS, fetchTagTimeline);
  // yield fork(takeLatest, TAG_TIMELINE_FETCH_PROCESS, fetchPaginatedTimeline);
  yield takeLatest(UPVOTE_PROCESS, handleUpVote);
  yield takeLatest(DOWNVOTE_PROCESS, handleDownVote);
  // yield take(LOCATION_CHANGE);
  // yield cancel(watcher);
}
