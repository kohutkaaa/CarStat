import produce from 'immer';
import { 
  SET_DATA_LOGIN ,
  SET_ERROR
} from './constants';

export const initialState = {
  dataLogin: false,
  error: false
};

const authReducer = (state = initialState, action) =>
  produce(state, draft  => {
    switch (action.type) {
      case SET_DATA_LOGIN:
        draft.dataLogin = { ...draft.dataLogin, [action.key]: action.value,};
        break;
      case SET_ERROR:
        draft.error = action.error;
        break;
    }
  });

export default authReducer;
