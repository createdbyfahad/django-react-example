// import { take, call, put, select } from 'redux-saga/effects';


import {call, put, takeLatest} from "redux-saga/es/effects";
import {NOTE_ADD_PROCESS, NOTE_ADD_SUCCESS, NOTE_ADD_FAIL,
  NOTES_FETCH_PROCESS, NOTES_FETCH_SUCCESS,
  NOTE_MAKEPUBLIC_PROCESS, NOTE_MAKEPUBLIC_SUCCESS,
  NOTE_MAKEPRIVATE_PROCESS, NOTE_MAKEPRIVATE_SUCCESS} from "./constants";
import {handleLogin} from "../LoginPage/saga";
import {noteAddHandler, fetchNotesHandler,
  noteMakePublicHandler, noteMakePrivateHandler} from 'utils/apiHandlers';

export function* handleNoteAdd(action) {
  // console.log("in saga", action)
  try {
    const res = yield call(noteAddHandler, action.title, action.body, action.image, action.tags);
    // success login
    yield put({type: NOTE_ADD_SUCCESS, note: res})
    // yield put(null)
  } catch (errs) {
    // yield
    console.log(errs)
    yield put({type: NOTE_ADD_FAIL, errors: errs})
  }
}

export function* fetchNotes(action) {
  // console.log("in saga", action)
  try {
    const res = yield call(fetchNotesHandler);
    // success login
    yield put({type: NOTES_FETCH_SUCCESS, notes: res})
    // yield put(null)
  } catch (errs) {
    // yield
    // yield put({type: NOTE_ADD_FAIL, errors: errs})
  }
}

export function* handleMakePublic(action) {
  try {
    const res = yield call(noteMakePublicHandler, action.note_id);
    // success login
    yield put({type: NOTE_MAKEPUBLIC_SUCCESS, note_id: action.note_id})
    // yield put(null)
  } catch (errs) {
    // yield
    // yield put({type: NOTE_ADD_FAIL, errors: errs})
  }
}
export function* handleMakePrivate(action) {
  try {
    const res = yield call(noteMakePrivateHandler, action.note_id);
    // success login
    yield put({type: NOTE_MAKEPRIVATE_SUCCESS, note_id: action.note_id})
    // yield put(null)
  } catch (errs) {
    // yield
    // yield put({type: NOTE_ADD_FAIL, errors: errs})
  }
}


// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(NOTE_ADD_PROCESS, handleNoteAdd);
  yield takeLatest(NOTES_FETCH_PROCESS, fetchNotes);
  yield takeLatest(NOTE_MAKEPUBLIC_PROCESS, handleMakePublic)
  yield takeLatest(NOTE_MAKEPRIVATE_PROCESS, handleMakePrivate)
}
