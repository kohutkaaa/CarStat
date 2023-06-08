import { 
  SET_ERROR,
  SET_RESPONCE,
  SET_LOADING,
  GET_DATA_CARS,
  SET_DATA_CARS,
  SET_CAR_ID,
  SET_PAYMENTS,
  SET_DATE_FILTER,
  GET_DATA_PAYMENTS_BY_DAY,
  GET_DATA_PAYMENTS_BY_DATE,
  SET_DATA_PAYMENTS_FILTER,
  GET_DATA_CARS_FUEL,
  SET_DATA_PAYM_FUEL,
  SET_PAYMENT_ID,
  SET_NEW_PAYMENT,
  SET_EDIT_PAYMENT,
  EDIT_PAYMENT,
  DELETE_PAYMENT,
  DELETE_EDIT_PAYMENT,
  DELETE_NEW_PAYMENT,
  ADD_NEW_PAYMENT,
  GET_DATA_PAYMENTS_CUSTOM_DATE,
  SET_CUSTOM_DATE,
  SET_FUEL_SHOW
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
  export function getDataCars() {
    return {
      type: GET_DATA_CARS,
    };
  }
  export function setDataCars(dataCars) {
    return {
      type: SET_DATA_CARS,
      dataCars
    };
  }
  export function setCarId(carId) {
    return {
      type: SET_CAR_ID,
      carId
    };
  }
  export function setPaymentsByCarId(dataPaym) {
    return {
      type: SET_PAYMENTS,
      dataPaym
    };
  }
  export function setDateFilter(dateFilter) {
    return {
      type: SET_DATE_FILTER,
      dateFilter
    };
  }
  export function getDataPaymentsByDay() {
    return {
      type: GET_DATA_PAYMENTS_BY_DAY,
    };
  }
  export function getDataPaymentsByDate() {
    return {
      type: GET_DATA_PAYMENTS_BY_DATE,
    };
  }
  export function setDataPaymentsFilter(dataPaymentsFilter) {
    return {
      type: SET_DATA_PAYMENTS_FILTER,
      dataPaymentsFilter
    };
  }
  export function getDataCarsFuel() {
    return {
      type: GET_DATA_CARS_FUEL,
    };
  }
  export function setDataPaymFuel(dataPaymFuel) {
    return {
      type: SET_DATA_PAYM_FUEL,
      dataPaymFuel
    };
  }
  export function setPaymentId(paymentId) {
    return {
      type: SET_PAYMENT_ID,
      paymentId
    };
  }
  export function setNewPayment(key, value) {
    return {
      type: SET_NEW_PAYMENT,
      key, 
      value
    };
  }
  export function setEditPayment(key, value) {
    return {
      type: SET_EDIT_PAYMENT,
      key, 
      value
    };
  }
  export function editPayment() {
    return {
      type: EDIT_PAYMENT,
    };
  }
  export function deletePayment() {
    return {
      type: DELETE_PAYMENT,
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
  export function addNewPayment() {
    return {
      type: ADD_NEW_PAYMENT,
    };
  }
  export function getDataPaymentsCustomDate() {
    return {
      type: GET_DATA_PAYMENTS_CUSTOM_DATE,
    };
  }
  export function setCustomDate(key, value) {
    return {
      type: SET_CUSTOM_DATE,
      key, 
      value
    };
  }
  export function setFuelShow(fuelShow) {
    return {
      type: SET_FUEL_SHOW,
      fuelShow
    };
  }