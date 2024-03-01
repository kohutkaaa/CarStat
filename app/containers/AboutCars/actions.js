import {
  GET_DATA_CARS,
  SET_ERROR,
  SET_RESPONCE,
  SET_LOADING,
  SET_DATA_CARS,
  SET_DATA_NEW_CAR,
  ADD_NEW_CAR,
  DELETE_CAR,
  GET_CAR_FOR_EDITING,
  SET_CAR_FOR_EDITING,
  EDIT_CAR,
  SET_DATA_EDIT_CAR,
} from './constants';

export function getDataCars() {
  return {
    type: GET_DATA_CARS,
  };
}
export function setError(error) {
  return {
    type: SET_ERROR,
    error,
  };
}
export function setResponce(responce) {
  return {
    type: SET_RESPONCE,
    responce,
  };
}
export function setLoading(loading) {
  return {
    type: SET_LOADING,
    loading,
  };
}
export function setDataCars(dataCars) {
  return {
    type: SET_DATA_CARS,
    dataCars,
  };
}
export function setDataNewCar(key, value) {
  return {
    type: SET_DATA_NEW_CAR,
    key,
    value,
  };
}
export function addNewCar() {
  return {
    type: ADD_NEW_CAR,
  };
}
export function deleteCar(id) {
  return {
    type: DELETE_CAR,
    id,
  };
}
export function getCarForEditing(id) {
  return {
    type: GET_CAR_FOR_EDITING,
    id,
  };
}
export function setCarForEditing(carForEditing) {
  return {
    type: SET_CAR_FOR_EDITING,
    carForEditing,
  };
}
export function editCar(id) {
  return {
    type: EDIT_CAR,
    id,
  };
}
export function setDataEditCar(key, value) {
  return {
    type: SET_DATA_EDIT_CAR,
    key,
    value,
  };
}
