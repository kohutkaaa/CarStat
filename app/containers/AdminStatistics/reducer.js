import produce from 'immer';
import { 
  SET_ERROR,
  SET_RESPONCE,
  SET_LOADING,
  SET_DATA_CARS,
  SET_CAR_ID,
  SET_PAYMENTS,
  SET_DATE_FILTER,
  SET_DATA_PAYMENTS_FILTER,
  SET_DATA_PAYM_FUEL,
  SET_PAYMENT_ID,
  SET_NEW_PAYMENT,
  SET_EDIT_PAYMENT,
  DELETE_EDIT_PAYMENT,
  DELETE_NEW_PAYMENT,
  SET_CUSTOM_DATE,
  SET_FUEL_SHOW
 } from './constants';

export const initialState = {
  loading: true,
  error: false,
  responce: false,
  dataCars: false,
  carId: false,
  dataPaym: false,
  dateFilter: false,
  dataPaymentsFilter: false,
  dataPaymFuel: false,
  paymentId: false,
  newPayment: false,
  editPayment: false,
  customDate: false,
  fuelShow: false,
};

const adminStatisticsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_ERROR:
        draft.error = action.error;
        break;
      case SET_RESPONCE:
        draft.responce = action.responce;
        break;
      case SET_LOADING:
        draft.loading = action.loading;
        break;
      case SET_DATA_CARS:
        draft.dataCars = action.dataCars;
        break;
      case SET_CAR_ID:
        draft.carId = action.carId;
        break;
      case SET_PAYMENTS:
        draft.dataPaym = action.dataPaym;
        break;
      case SET_DATE_FILTER:
        draft.dateFilter = action.dateFilter;
        break;
      case SET_DATA_PAYMENTS_FILTER:
        draft.dataPaymentsFilter = action.dataPaymentsFilter;
        break;
      case SET_DATA_PAYM_FUEL:
        draft.dataPaymFuel = action.dataPaymFuel;
        break;
      case SET_PAYMENT_ID:
        draft.paymentId = action.paymentId;
        break;
      case SET_NEW_PAYMENT:
        draft.newPayment = { ...draft.newPayment, [action.key]: action.value,};
        break;
      case SET_EDIT_PAYMENT:
        draft.editPayment = { ...draft.editPayment, [action.key]: action.value,};
        break;
      case SET_CUSTOM_DATE:
        draft.customDate = { ...draft.customDate, [action.key]: action.value,};
        break;
      case DELETE_EDIT_PAYMENT:
        draft.editPayment = false;
        break;
      case DELETE_NEW_PAYMENT:
        draft.newPayment = false;
        break;
      case SET_FUEL_SHOW:
        draft.fuelShow = action.fuelShow;
        break;
    }
  });

export default adminStatisticsReducer;
