import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the demoDataFile state domain
 */

const selectDemoDataFileDomain = state => state.demoDataFile || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DemoDataFile
 */

const makeSelectDemoDataFile = () =>
  createSelector(
    selectDemoDataFileDomain,
    substate => substate,
  );

export default makeSelectDemoDataFile;
export { selectDemoDataFileDomain };
