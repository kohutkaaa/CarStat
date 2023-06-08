import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { isEmpty } from 'lodash';
import {
  MAKE_LOGIN
} from './constants';
import {
  setError,
} from './actions';
import {
  receiveLogin,
} from '../App/actions';
import {
  makeDataLogin
} from './selectors';

const BASE_URL = 'http://localhost:1337'

export function* loginRequest() {

  let data = yield select(makeDataLogin());

  let body = {
    identifier: data.identifier,
    password: data.password
  }

  var options = {
    method: 'POST',
    headers:  { 
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }

  const requestURL = BASE_URL + `/api/auth/local`;

  try {
    const res = yield call(request, requestURL, options);
    yield put(receiveLogin(res.jwt, res.user));
  } catch (err) {
    yield put(setError(err));
    console.clear();
  }
}

export default function* adminStatisticsSaga() {
  yield takeLatest( MAKE_LOGIN, loginRequest );
 }