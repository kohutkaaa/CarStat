import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history';
import globalReducer from 'containers/App/reducer';
import aboutCarReducer from 'containers/AboutCars/reducer';

export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    global: globalReducer,
    aboutCars: aboutCarReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  return rootReducer;
}