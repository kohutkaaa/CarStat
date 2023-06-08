import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAdminStatistics from '../selectors';
import reducer from '../reducer';
import { 
  setPaymentId, 
  setNewPayment, 
  addNewPayment, 
  editPayment, 
  setEditPayment, 
  deleteEditPayment,
  deleteNewPayment,
 } from '../actions';

import SpinnersForLoading from '../../../components/SpinnersForLoading';
import DatePicker from "react-datepicker";
import DataTable from 'react-data-table-component';
import "react-datepicker/dist/react-datepicker.css";
import { isEmpty, isNaN } from 'lodash';
import moment from 'moment';

export function FuelForm({
  state,
  setPaymentId,
  setModalData,
  modalShow,
  setNewPayment,
  addNewPayment,
  editPayment,
  setEditPayment,
  deleteEditPayment,
  deleteNewPayment,
}) {
  useInjectReducer({ key: 'adminStatistics', reducer });

  const [addForm, setAddForm] = useState(false);
  const [editForm, setEditForm] = useState(false);

  const [startDate, setStartDate] = useState(moment(new Date).format('YYYY-MM-DD'));
  const [newDate, setNewtDate] = useState(false);

  const [errorInput, setErrorInput] = useState(false);
  const [errorInputPayment, setErrorInputPayment] = useState(false);
  const [errorInputDate, setErrorInputDate] = useState(false);

  const [dataPaymFuelById, setDataPaymFuelById] = useState(false);

  const reloadPage = () => {
    if (state.error === false) {
      location.reload();
    }
  }

  const amountPayment = (data) => {
    var tot = 0;
    for (var i = 0; i < data.length; i++) {
      tot = tot + data[i].attributes.Payment;
    }
    return(tot);
  }

  const editDate = (date) => {
    const dateYMD = moment(date).format('YYYY-MM-DD'); 
    setNewtDate(dateYMD)
    setNewPayment('Date', dateYMD)
    setEditPayment('Date', dateYMD)
  }

  const errorNewPayment = () => {
    if (state.newPayment === false){
      setErrorInput(true)
      setErrorInputPayment(true)
      return;
    }
    if (isEmpty(state.newPayment.Comentar)){
      setErrorInput(true)
      return;
    }
    if (isEmpty(state.newPayment.Payment) || isNaN(state.newPayment.Payment)){
      setErrorInputPayment(true)
      return;
    } else {
    setNewPayment('car',{'id': state.carId} );
    setNewPayment('Category', 'Топливо')
    setErrorInput(false);
    setErrorInputPayment(false);
    setErrorInputDate(false);
    addNewPayment()
    reloadPage()
    }
  }

  const errorEditPayment = (id) => {
    if (state.editPayment === false){
      setErrorInput(true)
      setErrorInputPayment(true)
      return;
    } else {
    setEditPayment('id', id)
    setErrorInput(false);
    setErrorInputPayment(false);
    editPayment()
    reloadPage()
    }
  }

  const filterDataPaymFuel = () => {
    if (state.carId !== false) {
      const data = state.dataPaymFuel.filter((expense) => expense.attributes.car.data.id === state.carId)
      setDataPaymFuelById(data) 
    }
  }

  useEffect(() => {
    filterDataPaymFuel()
    setAddForm(false)
  }, [state.carId]);

  useEffect(() => {
    if (state.dataPaymFuel.length === 0 ) {
      setAddForm(true)
    }
  }, [state.dataPaymFuel]);

  const columns = [
      {
        name: 'КАТЕГОРІЯ',
        selector: (row) => row.attributes.Category,
        sortable: true,
        cell: (row) => {
          return (
            <>
              <div>
                <i className='ti ti-gas-station text-success ti-sm me-2 mb-2'></i> 
                <strong>{row.attributes.Category}</strong>
              </div>
            </>
          )},
        style: {
          marginBottom: '15px',
          marginTop: '15px'
        },
      },
      {
        name: 'КОМЕНТАР',
        selector: row => row.attributes.Comentar,
        sortable: true,
        cell: (row) => {
          return (
            <>
              {editForm === true && state.paymentId === row.id ? (
                <div className='mt-3'>
                  <input 
                    type="text" 
                    className="form-control" 
                    defaultValue={row.attributes.Comentar} 
                    placeholder={row.attributes.Comentar}
                    name='Comentar'
                    onChange={(e) => {
                    setEditPayment(e.target.name, e.target.value)
                    }}
                  />
                  <div className={errorInput === true ? 'form-text text-danger' : 'form-text'}>
                    Редагуйте коментар до витрати
                  </div>
                </div>
              ) : (
                row.attributes.Comentar
              )}
            </>
        )}
      },
      {
        name: 'СУМА',
        selector: (row) => row.attributes.Payment,
        sortable: true,
        cell: (row) => {
          return (
            <>
              {editForm === true && state.paymentId === row.id ? (
                <div className='mt-3'>
                <input 
                  type="number" 
                  className="form-control" 
                  defaultValue={row.attributes.Payment}
                  placeholder={row.attributes.Payment}
                  name='Payment'
                  onChange={(e) => {
                  setEditPayment(e.target.name, e.target.value)
                  }}
                />
                <div className={errorInputPayment === true ? 'form-text text-danger' : 'form-text'}>
                  Редагуйте суму витрати
                </div>
              </div>
              ) : (
                <div>
                  <span className="badge bg-label-danger px-2">{row.attributes.Payment}</span>
                </div>
              )}
            </>
          )}
      },
      {
        name: 'ДАТА',
        selector: row => row.attributes.Date,
        sortable: true,
        cell: (row) => {
          return (
            <>
              {editForm === true && state.paymentId === row.id ? (
                <div className='mt-3'>
                  <DatePicker 
                    className="p-2 form-control"
                    dateFormat="yyyy/MM/dd" 
                    name='Date'
                    placeholderText={newDate === false ? row.attributes.Date : newDate}
                    onChange={(date) => editDate(date)} 
                  />
                  <div className={errorInput === true ? 'form-text text-danger' : 'form-text'}>
                    Редагуйте дату
                  </div>
                </div>
              ) : (
                row.attributes.Date
              )}
              </>
          )}
      },
      {
        name: '',
        button: true,
        cell: (row) => {
        return (
          <>
          {editForm === true && state.paymentId === row.id ? (
            <div className='mx-2'>
              <button type="button" className="btn btn-xs btn-label-info waves-effect m-1" 
                onClick={() => {
                  errorEditPayment(row.id)
                }}
              >
                <i className="menu-icon tf-icons ti ti-pencil ti-xs my-1 ms-1"></i>
              </button>
              <br/>
              <button type="button" className="btn btn-xs btn-label-danger waves-effect m-1" 
                onClick={() => {
                setEditForm(false);
                setErrorInput(false)
                setErrorInputPayment(false)
                deleteEditPayment()
                }}
              >
                <i className="menu-icon tf-icons ti ti-x ti-xs my-1 ms-1"></i>
              </button>
            </div>
          ) : (
            <div className='me-5'>
              <button type="button" className="btn btn-xs btn-label-info waves-effect m-1" 
                onClick={() => {
                  setEditForm(true), 
                  setAddForm(false), 
                  setPaymentId(row.id)
                  deleteNewPayment()
                  deleteEditPayment()
                  setErrorInput(false)
                  setErrorInputPayment(false)
                }}
                >
                <i className="menu-icon tf-icons ti ti-pencil ti-xs my-1 ms-1"></i>
              </button>
              <button type="button" className="btn btn-xs btn-label-dark waves-effect m-1 me-3" onClick={() => {setPaymentId(row.id), setModalData(row.attributes.Comentar), modalShow()}}>
                <i className="menu-icon tf-icons ti ti-trash ti-xs my-1 ms-1"></i>
              </button>
            </div>
          )}
          </>
        )}
      },
    ];
 
  return (
    <>
     <div className=" card my-4 me-4">
        <h4 className="card-header ">
          <span>
            Ваші витрати по топливу
          </span>
        </h4>
        {state.dataPaymFuel === false ? (
          <SpinnersForLoading/>
        ) : (
          <div className="table-responsive text-nowrap p-3">
            <div>
              {state.dataPaymFuel.length === 0 ? (
                <>
                  <div className="d-flex justify-content-center mt-1">
                    <img style={{ width: '150px' }} src={require('../../../images/logo1.png')}  />
                  </div>
                  <h6 className="text-center text-uppercase text-muted "> 
                    <span className="badge bg-label-primary p-2 rounded mx-2">
                      Car Statistics
                    </span>
                  </h6>
                  <h6 className="my-5 text-center text-uppercase">
                    У вас ще не має збережених витрат! 
                  </h6>
                </>
              ) : (
                state.carId === false ? (
                  <DataTable
                    className='my-table'
                    columns={columns}
                    data={state.dataPaymFuel}
                    fixedHeader
                    highlightOnHover={true}
                    fixedHeaderScrollHeight="350px"
                  />
                ) : (
                  dataPaymFuelById.length === 0 ? (
                    <>
                      <div className="d-flex justify-content-center mt-1">
                        <img style={{ width: '150px' }} src={require('../../../images/logo1.png')}  />
                      </div>
                      <h6 className="text-center text-uppercase text-muted "> 
                        <span className="badge bg-label-primary p-2 rounded mx-2">
                          Car Statistics
                        </span>
                      </h6>
                      <h6 className="my-5 text-center text-uppercase">
                        У вас ще не має збережених витрат! 
                      </h6>
                    </>
                  ) : (
                    <DataTable
                      className='my-table'
                      columns={columns}
                      data={dataPaymFuelById}
                      fixedHeader
                      highlightOnHover={true}
                      fixedHeaderScrollHeight="350px"
                    />
                  )
                )
              )}
            </div>
            <table className="table table-borderless">
              {addForm === false ? (
                <tfoot className="border-top">
                  <tr>
                  {state.carId !== false ? (
                    <th>
                      <button type="button" className="mt-2 btn btn-outline-primary waves-effect" 
                        onClick={() => {
                          setAddForm(true), 
                          setEditForm(false), 
                          deleteEditPayment()
                          setErrorInput(false)
                          setErrorInputPayment(false)
                        }}
                      >
                        <i className="ti ti-plus ti-sm text-primary"></i> 
                        <strong className="text-muted ms-1">додати витрату</strong>
                      </button>
                    </th>
                  ) : (<><th><div className='me-5'></div></th><th><div className='me-5'></div></th></>)}
                    <th> 
                      <button type="button" className="mt-2 btn  waves-effect" >
                        <strong className="text-muted ms-1">
                          всього
                          <span className="badge bg-label-danger ms-4 px-2">
                            {state.carId === false ? amountPayment(state.dataPaymFuel) : amountPayment(dataPaymFuelById)}
                          </span>
                        </strong>
                      </button>
                    </th>
                    <th></th><th></th><th></th>
                  </tr>
                </tfoot>
              ) : (
                <tfoot className="border-top">
                  <tr>
                    <td>
                      <div>
                          <i className='ti ti-gas-station text-success ti-sm me-2 mb-2'></i> 
                          <strong>Топливо</strong>
                      </div>
                    </td>
                    <td>
                      <div className='mt-3'>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="заміна масла / фільтр"
                          name='Comentar'
                          onChange={(e) => {
                            setNewPayment(e.target.name, e.target.value)
                          }}
                        />
                        <div className={errorInput === true ? 'form-text text-danger' : 'form-text'}>
                          Напишіть коментар до витрати
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className='mt-3'>
                        <input 
                          type="number" 
                          className="form-control" 
                          placeholder="1000"
                          name='Payment'
                          onChange={(e) => {
                            setNewPayment(e.target.name, e.target.value)
                          }}
                        />
                        <div className={errorInputPayment === true ? 'form-text text-danger' : 'form-text'}>
                          Напишіть суму витрати
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className='mt-3'>
                        <DatePicker 
                          className="p-2 form-control"
                          dateFormat="yyyy/MM/dd" 
                          name='Date'
                          placeholderText={newDate === false ? startDate : newDate}
                          onChange={(date) => editDate(date)} 
                        />
                        <div className={errorInputDate === true ? 'form-text text-danger' : 'form-text'}>
                          Виберіть дату
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="dropdown">
                        <button 
                          type="button" 
                          className="btn btn-xs btn-label-success waves-effect m-1" 
                          onClick={() => {
                            newDate === false && editDate(startDate)
                            errorNewPayment()
                          }}
                        >
                          <i className="menu-icon tf-icons ti ti-plus ti-xs my-1 ms-1"></i>
                        </button>
                        <button 
                          type="button" 
                          className="btn btn-xs btn-label-danger waves-effect m-1" 
                          onClick={() => {
                            setAddForm(false);
                            deleteNewPayment()
                            setErrorInput(false)
                            setErrorInputPayment(false)
                          }}
                        >
                          <i className="menu-icon tf-icons ti ti-x ti-xs my-1 ms-1"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        )}
      </div>
    </>     
  );
}

FuelForm.propTypes = {
  state: PropTypes.oneOfType([PropTypes.bool, PropTypes.object, PropTypes.array]),
  setPaymentId: PropTypes.func.isRequired,
  setModalData: PropTypes.func.isRequired,
  setNewPayment: PropTypes.func.isRequired,
  addNewPayment: PropTypes.func.isRequired,
  editPayment: PropTypes.func.isRequired,
  setEditPayment: PropTypes.func.isRequired,
  modalShow: PropTypes.func.isRequired,
  deleteEditPayment: PropTypes.func.isRequired,
  deleteNewPayment: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  state: makeSelectAdminStatistics(),
});

function mapDispatchToProps(dispatch) {
  return {
    setPaymentId: (value) => { dispatch(setPaymentId(value)) },
    addNewPayment: () => { dispatch(addNewPayment()) },
    setNewPayment: (key, value) => { dispatch(setNewPayment(key, value)) },
    editPayment: () => { dispatch(editPayment()) },
    deleteEditPayment: () => { dispatch(deleteEditPayment()) },
    deleteNewPayment: () => { dispatch(deleteNewPayment()) },
    setEditPayment: (key, value) => { dispatch(setEditPayment(key, value)) },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(FuelForm);