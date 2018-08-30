import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the popularTags state domain
 */

const selectPopularTagsDomain = state => state.get('popularTags', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by PopularTags
 */

const makeSelectPopularTags = () =>
  createSelector(selectPopularTagsDomain, substate => substate.toJS());

export default makeSelectPopularTags;
export { selectPopularTagsDomain };
