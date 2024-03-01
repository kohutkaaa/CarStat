import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAdminPageDomain = state => state.adminPage || initialState;

const makeSelectAdminPage = () =>
  createSelector(
    selectAdminPageDomain,
    substate => substate,
  );

const selectDataNewPayment = () =>
  createSelector(
    selectAdminPageDomain,
    substate => substate.newPayment,
  );

const selectCarId = () =>
  createSelector(
    selectAdminPageDomain,
    substate => substate.carId,
  );

export default makeSelectAdminPage;
export { selectAdminPageDomain, selectDataNewPayment, selectCarId };
