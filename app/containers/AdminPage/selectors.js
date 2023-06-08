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
const selectDataEditPayment = () =>
  createSelector(
    selectAdminPageDomain,
    substate => substate.editPayment,
  );
const selectCarId = () =>
  createSelector(
    selectAdminPageDomain,
    substate => substate.carId,
  );
const selectPaymentId = () =>
  createSelector(
    selectAdminPageDomain,
    substate => substate.paymentId,
  );

export default makeSelectAdminPage;
export { 
  selectAdminPageDomain,
  selectDataNewPayment,
  selectCarId,
  selectPaymentId,
  selectDataEditPayment
};