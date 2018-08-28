import { fromJS } from 'immutable';
import noteVoteWidgetReducer from '../reducer';

describe('noteVoteWidgetReducer', () => {
  it('returns the initial state', () => {
    expect(noteVoteWidgetReducer(undefined, {})).toEqual(fromJS({}));
  });
});
