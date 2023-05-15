import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import {
  GET_CARS,
  ADD_NEW_CAR,
  DELETE_CAR,
  GET_CAR_BY_ID,
  EDIT_CAR
} from './constants';

import {
  setDataCars,
  setLoading,
  setError,
  setResponce,
  setDataCarEdit
} from './actions';

import {
  selectIdCar,
  selectNewCar,
  selectEditCar
} from './selectors';

const BASE_URL = 'http://localhost:1337'

function* getCarsInfo() {  

  var options = {
    method: 'get',
    headers: { 
      'Authorization': 'Bearer ca2df14ce89a69efde62a6d95ddf07af851b9fd9a46b6db2b523c7935c2313f11a6755ba676d937be4de03a8f955d4f4765784ade89a6f5a0582843b7e3e3c146bf7c9b94b9dedf01e050aa191df00ba893ae28348e4c350835794fa55eba0cba0ced3e077e5bb6d21bb4f7e5af60220f13311ec6c8f8b741bb606f0e59ba4d1'
    }
  }

  const requestURL = BASE_URL + `/api/cars`;

  try {
    yield put(setLoading(true));
    const res = yield call(request, requestURL, options);
    yield put(setDataCars(res.data));
    yield put(setLoading(false));
  } catch (err) {
    console.clear()
    yield put(setError(err.message))
    yield put(setLoading(false));
  }
}

function* postNewCar() {  

  let data = yield select(selectNewCar());

  var options = {
    method: 'POST',
    headers:  { 
      'Authorization': 'Bearer ca2df14ce89a69efde62a6d95ddf07af851b9fd9a46b6db2b523c7935c2313f11a6755ba676d937be4de03a8f955d4f4765784ade89a6f5a0582843b7e3e3c146bf7c9b94b9dedf01e050aa191df00ba893ae28348e4c350835794fa55eba0cba0ced3e077e5bb6d21bb4f7e5af60220f13311ec6c8f8b741bb606f0e59ba4d1',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      data
    })
  }

  const requestURL = BASE_URL + `/api/cars`;

  try {
    yield put(setLoading(true));
    const res = yield call(request, requestURL, options);
    yield put(setResponce(res));
    yield put(setLoading(false));
  } catch (err) {
    console.clear()
    yield put(setError(err.message))
    yield put(setLoading(false));
  }
}

function* deleteCarById(action) {  

  var options = {
    method: 'delete',
    headers: { 
      'Authorization': 'Bearer ca2df14ce89a69efde62a6d95ddf07af851b9fd9a46b6db2b523c7935c2313f11a6755ba676d937be4de03a8f955d4f4765784ade89a6f5a0582843b7e3e3c146bf7c9b94b9dedf01e050aa191df00ba893ae28348e4c350835794fa55eba0cba0ced3e077e5bb6d21bb4f7e5af60220f13311ec6c8f8b741bb606f0e59ba4d1'
    }
  }

  const requestURL = BASE_URL + `/api/cars/` + action.id;

  try {
    yield put(setLoading(true));
    const res = yield call(request, requestURL, options);
    yield put(setDataCars(res.data));
    yield put(setLoading(false));
  } catch (err) {
    console.clear()
    yield put(setError(err.message))
    yield put(setLoading(false));
  }
}

function* getCarsIdInfo(action) {  

  var options = {
    method: 'get',
    headers: { 
      'Authorization': 'Bearer ca2df14ce89a69efde62a6d95ddf07af851b9fd9a46b6db2b523c7935c2313f11a6755ba676d937be4de03a8f955d4f4765784ade89a6f5a0582843b7e3e3c146bf7c9b94b9dedf01e050aa191df00ba893ae28348e4c350835794fa55eba0cba0ced3e077e5bb6d21bb4f7e5af60220f13311ec6c8f8b741bb606f0e59ba4d1'
    }
  }

  const requestURL = BASE_URL + `/api/cars/` + action.id;

  try {
    yield put(setLoading(true));
    const res = yield call(request, requestURL, options);
    yield put(setDataCarEdit(res.data));
    yield put(setLoading(false));
  } catch (err) {
    console.clear()
    yield put(setError(err.message))
    yield put(setLoading(false));
  }
}

function* putEditCar() {  

  let data = yield select(selectEditCar());
  let id = yield select(selectIdCar());

  var options = {
    method: 'PUT',
    headers:  { 
      'Authorization': 'Bearer ca2df14ce89a69efde62a6d95ddf07af851b9fd9a46b6db2b523c7935c2313f11a6755ba676d937be4de03a8f955d4f4765784ade89a6f5a0582843b7e3e3c146bf7c9b94b9dedf01e050aa191df00ba893ae28348e4c350835794fa55eba0cba0ced3e077e5bb6d21bb4f7e5af60220f13311ec6c8f8b741bb606f0e59ba4d1',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      data
    })
  }

  const requestURL = BASE_URL + `/api/cars` + id;

  try {
    yield put(setLoading(true));
    const res = yield call(request, requestURL, options);
    yield put(setResponce(res));
    console.log('res', res, data);
    yield put(setLoading(false));
  } catch (err) {
    console.clear()
    yield put(setError(err.message))
    console.log('err.message', err.message);
    yield put(setLoading(false));
  }
}

export default function* mysterySaga() {
  yield takeLatest( GET_CARS, getCarsInfo );
  yield takeLatest( ADD_NEW_CAR, postNewCar );
  yield takeLatest( DELETE_CAR, deleteCarById );
  yield takeLatest( GET_CAR_BY_ID, getCarsIdInfo );
  yield takeLatest( EDIT_CAR, putEditCar );
}