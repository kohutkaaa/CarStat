import produce from 'immer';
import { 
  SET_ERROR,
  SET_RESPONCE,
  SET_LOADING,
  SET_CAR_ID,
  SET_PAYMENT_ID,
  SET_CAR_SHOW,
  SET_NEW_PAYMENT,
  SET_EDIT_PAYMENT,
  DELETE_EDIT_PAYMENT,
  DELETE_NEW_PAYMENT
 } from './constants';
export const initialState = {
  loading: true,
  error: false,
  responce: false,
  carId: false,
  paymentId: false,
  carShow: false,
  newPayment: false,
  editPayment: false
};

const adminPageReducer = (state = initialState, action) =>
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
      case SET_CAR_ID:
        draft.carId = action.carId;
        break;
      case SET_PAYMENT_ID:
        draft.paymentId = action.paymentId;
        break;
      case SET_CAR_SHOW:
        draft.carShow = action.carShow;
        break;
      case DELETE_EDIT_PAYMENT:
        draft.editPayment = false;
        break;
      case DELETE_NEW_PAYMENT:
        draft.newPayment = false;
        break;
      case SET_NEW_PAYMENT:
        draft.newPayment = { ...draft.newPayment, [action.key]: action.value,};
        break;
      case SET_EDIT_PAYMENT:
        draft.editPayment = { ...draft.editPayment, [action.key]: action.value,};
        break;
    }
  });

export default adminPageReducer;