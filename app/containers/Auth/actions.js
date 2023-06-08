import { 
  SET_DATA_LOGIN,
  MAKE_LOGIN,
  SET_ERROR
 } from './constants';

export function setDataLogin(key, value) {
  return {
    type: SET_DATA_LOGIN,
    key, 
    value
  };
}
export function makeLogin() {
  return {
    type: MAKE_LOGIN,
  };
}
export function setError(error) {
  return {
    type: SET_ERROR,
    error
  };
}
