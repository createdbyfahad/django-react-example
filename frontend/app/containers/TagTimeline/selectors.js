import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the timeline state domain
 */

const selectTagTimelineDomain = state => state.get('tag_timeline', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Timeline
 */

const makeTagSelectTimeline = () =>
  createSelector(selectTagTimelineDomain, substate => substate.toJS());

export default makeTagSelectTimeline;
export { selectTagTimelineDomain };
