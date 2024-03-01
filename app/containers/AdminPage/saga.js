import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import { DELETE_PAYMENT, ADD_NEW_PAYMENT } from './constants';

import { setLoading, setError, setResponce } from './actions';

import { selectDataNewPayment, selectCarId } from './selectors';

const BASE_URL = 'http://localhost:1337';

function* deletePaymentById(action) {
  const options = {
    method: 'delete',
    headers: {
      Authorization:
        'Bearer ca2df14ce89a69efde62a6d95ddf07af851b9fd9a46b6db2b523c7935c2313f11a6755ba676d937be4de03a8f955d4f4765784ade89a6f5a0582843b7e3e3c146bf7c9b94b9dedf01e050aa191df00ba893ae28348e4c350835794fa55eba0cba0ced3e077e5bb6d21bb4f7e5af60220f13311ec6c8f8b741bb606f0e59ba4d1',
    },
  };

  const requestURL = `${BASE_URL}/api/payments/${action.id}`;

  try {
    const res = yield call(request, requestURL, options);
    yield put(setResponce(res));
    console.log('res', res);
    yield put(setLoading(false));
  } catch (err) {
    console.clear();
    yield put(setError(err.message));
    console.log('err.message', err.message);
    yield put(setLoading(false));
  }
}

function* postNewPayment() {
  const data = yield select(selectDataNewPayment());

  const options = {
    method: 'POST',
    headers: {
      Authorization:
        'Bearer ca2df14ce89a69efde62a6d95ddf07af851b9fd9a46b6db2b523c7935c2313f11a6755ba676d937be4de03a8f955d4f4765784ade89a6f5a0582843b7e3e3c146bf7c9b94b9dedf01e050aa191df00ba893ae28348e4c350835794fa55eba0cba0ced3e077e5bb6d21bb4f7e5af60220f13311ec6c8f8b741bb606f0e59ba4d1',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data,
    }),
  };

  const requestURL = `${BASE_URL}/api/payments`;

  try {
    const res = yield call(request, requestURL, options);
    yield put(setResponce(res));
    yield put(setLoading(false));
  } catch (err) {
    console.clear();
    yield put(setError(err.message));
    yield put(setLoading(false));
  }
}

export default function* adminPageSaga() {
  yield takeLatest(DELETE_PAYMENT, deletePaymentById);
  yield takeLatest(ADD_NEW_PAYMENT, postNewPayment);
}
