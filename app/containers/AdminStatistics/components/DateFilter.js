import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import makeSelectAdminStatistics from '../selectors';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from '../reducer';
import { 
  setDateFilter, 
  getDataPaymentsByDate, 
  getDataPaymentsByDay, 
  setDataPaymentsFilter, 
  getDataPaymentsCustomDate,
  setCustomDate
} from '../actions';

import moment from 'moment';
import DatePicker from "react-datepicker";
import Modal from 'react-bootstrap/Modal';

function DateFilter({
  state,
  setDateFilter,
  getDataPaymentsByDate,
  getDataPaymentsByDay, 
  setDataPaymentsFilter,
  getDataPaymentsCustomDate,
  setCustomDate
}) {    
  useInjectReducer({ key: 'adminStatistics', reducer });

  const [activeFilter, setActiveFilter] = useState(false);
  const [activeBtn, setActiveBtn] = useState(false);
  const [inputError, setInputError] = useState(false);

  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState(false);

  const [startDate, setStartDate] = useState(moment(new Date).format('YYYY-MM-DD'));
  const [newDate, setNewtDate] = useState(false);
  const [newSecondDate, setNewtSecondDate] = useState(false);

  const modalClose = () => {setShow(false)}
  const modalShow = () => setShow(true);

  useEffect(() => {
    setActiveFilter(false)
    setDataPaymentsFilter(false)
  }, [state.carId])

  function getDate(data) {
    setCustomDate('firstDate', false)
    setCustomDate('secondDate', false)
    setActiveBtn(false)
    if ( data === 'day') {
      const now = new Date();
      const firstDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()); 
      const dateYMD = moment(firstDay).format('YYYY-MM-DD'); ;
      setDateFilter(dateYMD)
      setActiveFilter(data)
      getDataPaymentsByDay()
      return;
    }
    if ( data === 'week') {
      const now = new Date();
      const firstDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const dateYMD = moment(firstDay).subtract(6, 'days').format('YYYY-MM-DD'); 
      setDateFilter(dateYMD)
      setActiveFilter(data)
      getDataPaymentsByDate()
      return;
    }
    if ( data === 'month') {
      const now = new Date();
      const firstDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const dateYMD = moment(firstDay).subtract(1, 'month').format('YYYY-MM-DD'); 
      setDateFilter(dateYMD)
      setActiveFilter(data)
      getDataPaymentsByDate()
      return;
    }
    if ( data === 'year') {
      const now = new Date();
      const firstDay = moment(now).format('YYYY-01-01'); 
      const dateYMD = moment(firstDay).format('YYYY-MM-DD'); 
      setDateFilter(dateYMD)
      setActiveFilter(data)
      getDataPaymentsByDate()
      return;
    }
  }

  const editCustomDate = (name, date) => {
    const dateYMD = moment(date).format('YYYY-MM-DD'); 
    if (name === 'firstDate') {
      setNewtDate(dateYMD)
      setCustomDate('firstDate', dateYMD)
    }
    if (name === 'secondDate') {
      setNewtSecondDate(dateYMD)
      setCustomDate('secondDate', dateYMD)
    }
  }

  const errorInput = () => {
    if (!state.customDate || !state.customDate.firstDate || !state.customDate.secondDate) {
      setInputError(true);
    } else {
      setInputError(false);
      modalClose()
      getDataPaymentsCustomDate()
      setActiveFilter('інше')
      setActiveBtn(true)
    }
  }

  return (
    <div className='row'>
      <div className='mt-4 ms-2 col-2'>
        <h5 className='text-primary mt-2' style={{fontWeight: '200'}}>
          Ваші витрати за: 
        </h5>
      </div>
      <div className='mt-4 col-9'>
          <button type="button" 
            className={
              activeFilter === false ?
              "mx-2 btn btn-label-primary waves-effect" :
              "mx-2 btn btn-outline-primary waves-effect"
            }
            onClick={() => {setDateFilter(false), setDataPaymentsFilter(false), setActiveFilter(false), setActiveBtn(false)}}  
          >
            <span className="ti-xs ti ti-calendar me-1"></span>
            Весь час
          </button>
          <button type="button" 
            className={
              activeFilter === 'day' ?
              "mx-2 btn btn-label-primary waves-effect" :
              "mx-2 btn btn-outline-primary waves-effect"
            }
            onClick={() => {getDate('day')}}  
          >
            <span className="ti-xs ti ti-calendar me-1"></span>
            Сьогодні
          </button>
          <button type="button" 
            className={
              activeFilter === 'week' ?
              "mx-2 btn btn-label-primary waves-effect" :
              "mx-2 btn btn-outline-primary waves-effect"
            }
            onClick={() => {getDate('week')}}  
          >
            <span className="ti-xs ti ti-calendar me-1"></span>
            Тиждень
          </button>
          <button type="button" 
            className={
              activeFilter === 'month' ?
              "mx-2 btn btn-label-primary waves-effect" :
              "mx-2 btn btn-outline-primary waves-effect"
            }
            onClick={() => {getDate('month')}}  
          >
            <span className="ti-xs ti ti-calendar me-1"></span>
            Місяць
          </button>
          <button type="button" 
            className={
              activeFilter === 'year' ?
              "mx-2 btn btn-label-primary waves-effect" :
              "mx-2 btn btn-outline-primary waves-effect"
            }
            onClick={() => {getDate('year')}} 
          >
            <span className="ti-xs ti ti-calendar me-1"></span>
            Рік
          </button>
          <button type="button" 
            className="mx-2 btn btn-outline-primary waves-effect"
            onClick={() => modalShow()}
          >
            <span className="ti-xs ti ti-calendar me-1"></span>
            Інше
          </button>
          {activeBtn === true &&
            <button type="button" 
              className={
                activeFilter === 'інше' ?
                "mx-2 mt-4 btn btn-label-primary waves-effect" :
                "mx-2 mt-4 btn btn-outline-primary waves-effect"
              }
            >
              <span className="ti-xs ti ti-calendar me-1"></span>
              від {state.customDate.firstDate} до {state.customDate.secondDate}
            </button>
          }
      </div>
      <Modal show={show} onHide={modalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Виберіть проміжок часу, за який ви хочете переглянути витрати!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DatePicker 
            className="p-2 form-control"
            dateFormat="yyyy/MM/dd" 
            name='Date'
            placeholderText={newDate === false ? startDate : newDate}
            onChange={(date) => editCustomDate('firstDate', date)} 
          />
          <div className={inputError === true ? 'form-text text-danger' : 'form-text'}>
            Виберіть першу дату
          </div>
          <DatePicker 
            className="p-2 form-control"
            dateFormat="yyyy/MM/dd" 
            name='Date'
            placeholderText={newSecondDate === false ? startDate : newSecondDate}
            onChange={(date) => editCustomDate('secondDate', date)} 
          />
          <div className={inputError === true ? 'form-text text-danger' : 'form-text'}>
            Виберіть другу дату
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-label-secondary waves-effect m-1 mb-0"onClick={() => {setCustomDate('firstDate', false), setCustomDate('secondDate', false), modalClose()}}>
            Відмінити
          </button>
          <button type="button" className="btn btn-label-primary waves-effect m-1 mb-0"onClick={() => {errorInput()}}>
            <span className="ti-xs ti ti-calendar me-1"></span>
            Задати
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

DateFilter.propTypes = {
  setDateFilter: PropTypes.func.isRequired,
  setCustomDate: PropTypes.func.isRequired,
  setDataPaymentsFilter: PropTypes.func.isRequired,
  getDataPaymentsByDate: PropTypes.func.isRequired,
  getDataPaymentsByDay: PropTypes.func.isRequired,
  getDataPaymentsCustomDate: PropTypes.func.isRequired,
  state: PropTypes.oneOfType([PropTypes.bool, PropTypes.object, PropTypes.array]),
};

const mapStateToProps = createStructuredSelector({
  state: makeSelectAdminStatistics(),
});

function mapDispatchToProps(dispatch) {
  return {
    setDateFilter: (date) => { dispatch(setDateFilter(date)) },
    setCustomDate: (key, value) => { dispatch(setCustomDate(key, value)) },
    setDataPaymentsFilter: (bool) => { dispatch(setDataPaymentsFilter(bool)) },
    getDataPaymentsByDate: () => { dispatch(getDataPaymentsByDate()) },
    getDataPaymentsByDay: () => { dispatch(getDataPaymentsByDay()) },
    getDataPaymentsCustomDate: () => { dispatch(getDataPaymentsCustomDate()) },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo,
)(DateFilter);