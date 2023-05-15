import { 
  GET_CARS,
  SET_ERROR,
  SET_RESPONCE,
  SET_LOADING,
  SET_DATA_CARS,
  SET_NEW_CAR,
  ADD_NEW_CAR,
  DELETE_CAR,
  SET_ID_CAR,
  GET_CAR_BY_ID,
  SET_DATA_CAR_EDIT,
  EDIT_CAR,
  SET_EDIT_CAR,
 } from './constants';

export function getCars() {
  return {
    type: GET_CARS,
  };
}

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

export function setDataCars(dataCars) {
  return {
    type: SET_DATA_CARS,
    dataCars
  };
}

export function setNewCar(key, value) {
  return {
    type: SET_NEW_CAR,
    key, 
    value
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
    id
  };
}

export function setIdCar(idCar) {
  return {
    type: SET_ID_CAR,
    idCar
  };
}

export function getCarById(id) {
  return {
    type: GET_CAR_BY_ID,
    id
  };
}

export function setDataCarEdit(dataCarEdit) {
  return {
    type: SET_DATA_CAR_EDIT,
    dataCarEdit
  };
}

export function editCar() {
  return {
    type: EDIT_CAR,
  };
}

export function setEditCar(editCarPut) {
  return {
    type: SET_EDIT_CAR,
    editCarPut
  };
}