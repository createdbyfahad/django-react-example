import { fromJS } from 'immutable';
import notesPageReducer from '../reducer';

describe('notesPageReducer', () => {
  it('returns the initial state', () => {
    expect(notesPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
