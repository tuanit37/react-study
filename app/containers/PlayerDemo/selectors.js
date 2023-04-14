import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the playerDemo state domain
 */

const selectPlayerDemoDomain = state => state.playerDemo || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by PlayerDemo
 */

const makeSelectPlayerDemo = () =>
  createSelector(
    selectPlayerDemoDomain,
    substate => substate,
  );

export default makeSelectPlayerDemo;
export { selectPlayerDemoDomain };
