import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAdminStatisticsDomain = state =>
  state.adminStatistics || initialState;
  
const makeSelectAdminStatistics = () =>
  createSelector(
    selectAdminStatisticsDomain,
    substate => substate,
  );

const selectDateFilter = () =>
  createSelector(
    selectAdminStatisticsDomain,
    substate => substate.dateFilter,
  );

const selectCarId = () =>
  createSelector(
    selectAdminStatisticsDomain,
    substate => substate.carId,
  );

const selectPaymentId = () =>
  createSelector(
    selectAdminStatisticsDomain,
    substate => substate.paymentId,
  );

const selectDataEditPayment = () =>
  createSelector(
    selectAdminStatisticsDomain,
    substate => substate.editPayment,
  );

const selectDataNewPayment = () =>
  createSelector(
    selectAdminStatisticsDomain,
    substate => substate.newPayment,
  );

const selectMyDate = () =>
  createSelector(
    selectAdminStatisticsDomain,
    substate => substate.customDate,
  );

export default makeSelectAdminStatistics;
export { 
  selectAdminStatisticsDomain,
  selectDateFilter,
  selectCarId,
  selectPaymentId,
  selectDataEditPayment,
  selectDataNewPayment,
  selectMyDate
};
