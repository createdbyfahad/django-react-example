import { fromJS } from 'immutable';
import timelineReducer from '../reducer';

describe('timelineReducer', () => {
  it('returns the initial state', () => {
    expect(timelineReducer(undefined, {})).toEqual(fromJS({}));
  });
});
