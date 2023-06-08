import { call, put, select, takeLatest } from 'redux-saga/effects';
import moment from 'moment';
import request from 'utils/request';
import {
  GET_DATA_CARS,
  GET_DATA_PAYMENTS_BY_DAY,
  GET_DATA_PAYMENTS_BY_DATE,
  GET_DATA_CARS_FUEL,
  EDIT_PAYMENT,
  DELETE_PAYMENT,
  ADD_NEW_PAYMENT,
  GET_DATA_PAYMENTS_CUSTOM_DATE
} from './constants';
import {
  setLoading,
  setError,
  setResponce,
  setDataCars,
  setDataPaymentsFilter,
  setDataPaymFuel
} from './actions';
import {
  selectDateFilter,
  selectCarId,
  selectPaymentId,
  selectDataEditPayment,
  selectDataNewPayment,
  selectMyDate
} from './selectors';

const BASE_URL = 'http://localhost:1337'

function* getCarsData() {  

  var options = {
    method: 'get',
    headers: { 
      'Authorization': 'Bearer ca2df14ce89a69efde62a6d95ddf07af851b9fd9a46b6db2b523c7935c2313f11a6755ba676d937be4de03a8f955d4f4765784ade89a6f5a0582843b7e3e3c146bf7c9b94b9dedf01e050aa191df00ba893ae28348e4c350835794fa55eba0cba0ced3e077e5bb6d21bb4f7e5af60220f13311ec6c8f8b741bb606f0e59ba4d1'
    }
  }

  const requestURL = BASE_URL + `/api/cars?populate=*`;

  try {
    const res = yield call(request, requestURL, options);
    yield put(setDataCars(res.data));
    yield put(setLoading(false));
  } catch (err) {
    console.clear()
    yield put(setError(err.message))
    yield put(setLoading(false));
  }
}

function* getPaymentsByDay() {  

  let carId = yield select(selectCarId());
  let date = yield select(selectDateFilter());

  var options = {
    method: 'get',
    headers: { 
      'Authorization': 'Bearer ca2df14ce89a69efde62a6d95ddf07af851b9fd9a46b6db2b523c7935c2313f11a6755ba676d937be4de03a8f955d4f4765784ade89a6f5a0582843b7e3e3c146bf7c9b94b9dedf01e050aa191df00ba893ae28348e4c350835794fa55eba0cba0ced3e077e5bb6d21bb4f7e5af60220f13311ec6c8f8b741bb606f0e59ba4d1'
    }
  }

  if (carId === false) {

    const requestURL = BASE_URL + `/api/payments?filters[Date][$eq]=` + date  + `&populate=*`;

    try {
      const res = yield call(request, requestURL, options);
      yield put(setDataPaymentsFilter(res.data));
      yield put(setLoading(false));
    } catch (err) {
      console.clear()
      yield put(setError(err.message))
      yield put(setLoading(false));
    }
  } else {

    const requestURL = BASE_URL + `/api/payments?filters[Date][$eq]=` + date + `&filters[car][id][$eq]=` + carId + `&populate=*`;

    try {
      const res = yield call(request, requestURL, options);
      yield put(setDataPaymentsFilter(res.data));
      yield put(setLoading(false));
    } catch (err) {
      console.clear()
      yield put(setError(err.message))
      yield put(setLoading(false));
    }
  }
}

function* getPaymentsByDate() { 

  let carId = yield select(selectCarId());
  let date = yield select(selectDateFilter());

  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()); 
  const dateYMD = moment(firstDay).format('YYYY-MM-DD'); 

  var options = {
    method: 'get',
    headers: { 
      'Authorization': 'Bearer ca2df14ce89a69efde62a6d95ddf07af851b9fd9a46b6db2b523c7935c2313f11a6755ba676d937be4de03a8f955d4f4765784ade89a6f5a0582843b7e3e3c146bf7c9b94b9dedf01e050aa191df00ba893ae28348e4c350835794fa55eba0cba0ced3e077e5bb6d21bb4f7e5af60220f13311ec6c8f8b741bb606f0e59ba4d1'
    }
  }

  if (carId === false) {
  
    const requestURL = BASE_URL + `/api/payments?filters[Date][$gte]=` + date + `&filters[Date][$lte]=` + dateYMD + `&populate=*`;
    
    try {
      const res = yield call(request, requestURL, options);
      yield put(setDataPaymentsFilter(res.data));
      yield put(setLoading(false));
    } catch (err) {
      console.clear()
      yield put(setError(err.message))
      yield put(setLoading(false));
    }
  } else {
    
    const requestURL = BASE_URL + `/api/payments?filters[Date][$gte]=` + date + `&filters[Date][$lte]=` + dateYMD  + `&filters[car][id][$eq]=` + carId  + `&populate=*`;

    try {
      const res = yield call(request, requestURL, options);
      yield put(setDataPaymentsFilter(res.data));
      yield put(setLoading(false));
    } catch (err) {
      console.clear()
      yield put(setError(err.message))
      yield put(setLoading(false));
    }
  }
}

function* getPaymentsFuel() {  

  var options = {
    method: 'get',
    headers: { 
      'Authorization': 'Bearer ca2df14ce89a69efde62a6d95ddf07af851b9fd9a46b6db2b523c7935c2313f11a6755ba676d937be4de03a8f955d4f4765784ade89a6f5a0582843b7e3e3c146bf7c9b94b9dedf01e050aa191df00ba893ae28348e4c350835794fa55eba0cba0ced3e077e5bb6d21bb4f7e5af60220f13311ec6c8f8b741bb606f0e59ba4d1'
    }
  }

  const requestURL = BASE_URL + `/api/payments?filters[Category][$eq]=Топливо&populate=*`;

  try {
    const res = yield call(request, requestURL, options);
    yield put(setDataPaymFuel(res.data));
    yield put(setLoading(false));
  } catch (err) {
    console.clear()
    yield put(setError(err.message))
    yield put(setLoading(false));
  }
}

function* putEditPayment() {  
  let data = yield select(selectDataEditPayment());
  let payId = yield select(selectPaymentId());
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
  const requestURL = BASE_URL + `/api/payments/` + payId;
  try {
    const res = yield call(request, requestURL, options);
    yield put(setResponce(res));
    yield put(setLoading(false));
  } catch (err) {
    console.clear()
    yield put(setError(err.message))
    yield put(setLoading(false));
  }
}

function* deletePaymentById() {  
  let payId = yield select(selectPaymentId());
  var options = {
    method: 'delete',
    headers: { 
      'Authorization': 'Bearer ca2df14ce89a69efde62a6d95ddf07af851b9fd9a46b6db2b523c7935c2313f11a6755ba676d937be4de03a8f955d4f4765784ade89a6f5a0582843b7e3e3c146bf7c9b94b9dedf01e050aa191df00ba893ae28348e4c350835794fa55eba0cba0ced3e077e5bb6d21bb4f7e5af60220f13311ec6c8f8b741bb606f0e59ba4d1'
    }
  }
  const requestURL = BASE_URL + `/api/payments/` + payId;
  try {
    const res = yield call(request, requestURL, options);
    yield put(setResponce(res));
    yield put(setLoading(false));
  } catch (err) {
    console.clear()
    yield put(setError(err.message))
    yield put(setLoading(false));
  }
}

function* postNewPayment() {  
  let data = yield select(selectDataNewPayment());
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
  const requestURL = BASE_URL + `/api/payments`;
  try {
    const res = yield call(request, requestURL, options);
    yield put(setResponce(res));
    yield put(setLoading(false));
  } catch (err) {
    console.clear()
    yield put(setError(err.message))
    yield put(setLoading(false));
  }
}

function* getPaymentsByMyDate() { 

  let carId = yield select(selectCarId());
  let date = yield select(selectMyDate());

  var options = {
    method: 'get',
    headers: { 
      'Authorization': 'Bearer ca2df14ce89a69efde62a6d95ddf07af851b9fd9a46b6db2b523c7935c2313f11a6755ba676d937be4de03a8f955d4f4765784ade89a6f5a0582843b7e3e3c146bf7c9b94b9dedf01e050aa191df00ba893ae28348e4c350835794fa55eba0cba0ced3e077e5bb6d21bb4f7e5af60220f13311ec6c8f8b741bb606f0e59ba4d1'
    }
  }

  if (carId === false) {
  
    const requestURL = BASE_URL + `/api/payments?filters[Date][$gte]=` + date.firstDate + `&filters[Date][$lte]=` + date.secondDate + `&populate=*`;
    
    try {
      const res = yield call(request, requestURL, options);
      yield put(setDataPaymentsFilter(res.data));
      yield put(setLoading(false));
    } catch (err) {
      console.clear()
      yield put(setError(err.message))
      yield put(setLoading(false));
    }
  } else {
    
    const requestURL = BASE_URL + `/api/payments?filters[Date][$gte]=` + date.firstDate + `&filters[Date][$lte]=` + date.secondDate + `&filters[car][id][$eq]=` + carId  + `&populate=*`;

    try {
      const res = yield call(request, requestURL, options);
      yield put(setDataPaymentsFilter(res.data));
      yield put(setLoading(false));
    } catch (err) {
      console.clear()
      yield put(setError(err.message))
      yield put(setLoading(false));
    }
  }
}

export default function* adminStatisticsSaga() {
 yield takeLatest( GET_DATA_CARS, getCarsData );
 yield takeLatest( GET_DATA_PAYMENTS_BY_DAY, getPaymentsByDay);
 yield takeLatest( GET_DATA_PAYMENTS_BY_DATE, getPaymentsByDate);
 yield takeLatest( GET_DATA_CARS_FUEL, getPaymentsFuel);
 yield takeLatest( EDIT_PAYMENT, putEditPayment);
 yield takeLatest( DELETE_PAYMENT, deletePaymentById);
 yield takeLatest( ADD_NEW_PAYMENT, postNewPayment);
 yield takeLatest( GET_DATA_PAYMENTS_CUSTOM_DATE, getPaymentsByMyDate);
}