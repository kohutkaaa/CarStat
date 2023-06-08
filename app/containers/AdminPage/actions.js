import { 
  SET_ERROR,
  SET_RESPONCE,
  SET_LOADING,
  DELETE_PAYMENT,
  SET_CAR_ID,
  SET_PAYMENT_ID,
  SET_CAR_SHOW,
  ADD_NEW_PAYMENT,
  SET_NEW_PAYMENT,
  EDIT_PAYMENT,
  SET_EDIT_PAYMENT,
  DELETE_EDIT_PAYMENT,
  DELETE_NEW_PAYMENT
 } from './constants';

 export function setError(error) {
  return {
    type: SET_ERROR,
    error
  };
}
export function setResponce(responce) {
  return {
    type: SET_RESPONCE,
    responce
  };
}
export function setLoading(loading) {
  return {
    type: SET_LOADING,
    loading
  };
}
export function setCarId(carId) {
  return {
    type: SET_CAR_ID,
    carId
  };
}
export function setPaymentId(paymentId) {
  return {
    type: SET_PAYMENT_ID,
    paymentId
  };
}
export function setCarShow(carShow) {
  return {
    type: SET_CAR_SHOW,
    carShow
  };
}
export function deletePayment() {
  return {
    type: DELETE_PAYMENT,
  };
}
export function addNewPayment() {
  return {
    type: ADD_NEW_PAYMENT,
  };
}
export function setNewPayment(key, value) {
  return {
    type: SET_NEW_PAYMENT,
    key, 
    value
  };
}
export function editPayment() {
  return {
    type: EDIT_PAYMENT,
  };
}
export function setEditPayment(key, value) {
  return {
    type: SET_EDIT_PAYMENT,
    key, 
    value
  };
}
export function deleteEditPayment() {
  return {
    type: DELETE_EDIT_PAYMENT,
  };
}
export function deleteNewPayment() {
  return {
    type: DELETE_NEW_PAYMENT,
  };
}