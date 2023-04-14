import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the socketIoDemo state domain
 */

const selectSocketIoDemoDomain = state => state.socketIoDemo || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SocketIoDemo
 */

const makeSelectSocketIoDemo = () =>
  createSelector(
    selectSocketIoDemoDomain,
    substate => substate,
  );

export default makeSelectSocketIoDemo;
export { selectSocketIoDemoDomain };
