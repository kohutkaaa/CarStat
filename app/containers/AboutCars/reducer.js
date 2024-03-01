import produce from 'immer';
import {
  SET_ERROR,
  SET_RESPONCE,
  SET_LOADING,
  SET_DATA_CARS,
  SET_DATA_NEW_CAR,
  SET_CAR_FOR_EDITING,
  SET_DATA_EDIT_CAR,
} from './constants';

export const initialState = {
  loading: true,
  error: false,
  responce: false,
  dataCars: false,
  dataNewCar: false,
  carForEditing: false,
  dataEditCar: false,
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
        // draft.loading = false;
        break;
      case SET_CAR_FOR_EDITING:
        draft.carForEditing = action.carForEditing;
        break;
      case SET_DATA_NEW_CAR:
        draft.dataNewCar = { ...draft.dataNewCar, [action.key]: action.value };
        break;
      case SET_DATA_EDIT_CAR:
        draft.dataEditCar = {
          ...draft.dataEditCar,
          [action.key]: action.value,
        };
        break;
    }
  });

export default aboutCarsReducer;
