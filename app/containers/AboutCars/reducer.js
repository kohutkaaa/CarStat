import produce from 'immer';
import { 
  SET_ERROR,
  SET_RESPONCE,
  SET_LOADING,
  SET_DATA_CARS,
  SET_NEW_CAR,
  SET_ID_CAR,
  SET_DATA_CAR_EDIT,
  SET_EDIT_CAR
 } from './constants';

 export const initialState = {
  loading: false,
  error: false,
  responce: false,
  dataCars: false,
  newCar: false,
  idCar: false,
  dataCarEdit: false,
  editCarPut: false,
};

const aboutCarsReducer = (state = initialState, action) =>
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
      case SET_ID_CAR:
        draft.idCar = action.idCar;
        break;
      case SET_DATA_CAR_EDIT:
        draft.dataCarEdit = action.dataCarEdit;
        break;
      case SET_NEW_CAR:
        draft.newCar = { ...draft.newCar, [action.key]: action.value };
        break;
      case SET_EDIT_CAR:
        draft.editCarPut = { ...draft.editCarPut, [action.key]: action.value };
        break;
    }
  });

export default aboutCarsReducer;
