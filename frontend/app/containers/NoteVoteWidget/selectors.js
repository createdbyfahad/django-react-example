import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the noteVoteWidget state domain
 */

const selectNoteVoteWidgetDomain = state =>
  state.get('noteVoteWidget', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by NoteVoteWidget
 */

const makeSelectNoteVoteWidget = () =>
  createSelector(selectNoteVoteWidgetDomain, substate => substate.toJS());

export default makeSelectNoteVoteWidget;
export { selectNoteVoteWidgetDomain };
