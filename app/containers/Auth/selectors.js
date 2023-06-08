import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAuthDomain = state => state.auth || initialState;

const makeSelectAuth = () =>
  createSelector(
    selectAuthDomain,
    substate => substate,
  );

const makeDataLogin = () =>
  createSelector(
    selectAuthDomain,
    substate => substate.dataLogin
  );

export default makeSelectAuth;
export { 
  selectAuthDomain,
  makeDataLogin 
};
