import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the loginPage state domain
 */

const selectRegisterPageDomain = state => state.get('registerPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by LoginPage
 */

const makeSelectRegisterPage = () =>
  createSelector(selectRegisterPageDomain, substate => substate.toJS());

export default makeSelectRegisterPage;
export { selectRegisterPageDomain };
