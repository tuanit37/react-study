import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the viewOnMap state domain
 */

const selectViewOnMapDomain = state => state.viewOnMap || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ViewOnMap
 */

const makeSelectViewOnMap = () =>
  createSelector(
    selectViewOnMapDomain,
    substate => substate,
  );

export default makeSelectViewOnMap;
export { selectViewOnMapDomain };
