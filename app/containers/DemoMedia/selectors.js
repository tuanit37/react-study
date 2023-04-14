import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the demoMedia state domain
 */

const selectDemoMediaDomain = state => state.demoMedia || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DemoMedia
 */

const makeSelectDemoMedia = () =>
  createSelector(
    selectDemoMediaDomain,
    substate => substate,
  );

export default makeSelectDemoMedia;
export { selectDemoMediaDomain };
