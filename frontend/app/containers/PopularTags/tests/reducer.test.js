import { fromJS } from 'immutable';
import popularTagsReducer from '../reducer';

describe('popularTagsReducer', () => {
  it('returns the initial state', () => {
    expect(popularTagsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
