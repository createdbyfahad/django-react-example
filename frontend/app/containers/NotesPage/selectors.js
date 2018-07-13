import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the notesPage state domain
 */

const selectNotesPageDomain = state => state.get('notesPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by NotesPage
 */

const makeSelectNotesPage = () =>
  createSelector(selectNotesPageDomain, substate => substate.toJS());

export default makeSelectNotesPage;
export { selectNotesPageDomain };
