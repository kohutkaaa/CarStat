import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAdminPage from '../selectors';
import reducer from '../reducer';
import saga from '../saga';
import { 
  setPaymentId, 
  setNewPayment, 
  addNewPayment, 
  editPayment, 
  setEditPayment, 
  deleteEditPayment,
  deleteNewPayment,
 } from '../actions';

import Form from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";
import DataTable from 'react-data-table-component';
import "react-datepicker/dist/react-datepicker.css";
import { isEmpty, isNaN } from 'lodash';
import moment from 'moment';

export function PaymentsForm({
  state,
  cars,
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
  useInjectReducer({ key: 'adminPage', reducer });
  useInjectSaga({ key: 'adminPage', saga });

  const [addForm, setAddForm] = useState(false);
  const [editForm, setEditForm] = useState(false);

  const [startDate, setStartDate] = useState(moment(new Date).format('YYYY-MM-DD'));
  const [newDate, setNewtDate] = useState(false);

  const [errorInput, setErrorInput] = useState(false);
  const [errorInputPayment, setErrorInputPayment] = useState(false);
  const [errorInputDate, setErrorInputDate] = useState(false);

  const [total, setTotal] = useState(false);

  const reloadPage = () => {
    if (state.error === false){
      location.reload();
    }
  }

  const amountPayment = () => {
    var tot = 0;
    for (var i = 0; i < state.carShow.payments.data.length; i++) {
      tot = tot + state.carShow.payments.data[i].attributes.Payment;
    }
    setTotal(tot)
  }

  const editDate = (date) => {
    const dateYMD = moment(date).format('YYYY-MM-DD'); 
    setNewtDate(dateYMD)
    setNewPayment('Date', dateYMD)
    setEditPayment('Date', dateYMD)
  }

  const iconbyCategory = (category) => {
    if (category === "Ремонтні роботи"){
      return 'ti-hammer text-danger';
    }
    if (category === "Автозапчастини"){
      return 'ti-puzzle text-warning';
    }
    if (category === "Інше"){
      return 'ti-link text-info';
    }
  }

  const errorNewPayment = () => {
    if (state.newPayment === false){
      setErrorInput(true)
      setErrorInputPayment(true)
      return;
    }
    if (isEmpty(state.newPayment.Category)){
      setErrorInput(true)
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

  useEffect(() => {
      amountPayment()
  }, [state.carShow]);

  useEffect(() => {
    if (cars.payments.data.length === 0 ) {
      setAddForm(true)
    }
  }, [cars]);

  const columns = [
      {
        name: 'КАТЕГОРІЯ',
        width: "230px",
        selector: (row) => row.attributes.Category,
        sortable: true,
        cell: (row) => {
          return (
            <>
              {editForm === true && state.paymentId === row.id ? (
                <div className='mt-3'>
                  <Form.Select 
                    aria-label="Default select example"
                    name='Category'
                    onChange={(e) => {
                    setEditPayment(e.target.name, e.target.value)
                    }}
                  >
                    <option value={row.attributes.Category}> 
                      {row.attributes.Category}
                    </option>
                    {row.attributes.Category === 'Ремонтні роботи' ? (
                      ''
                    ) : (
                      <option value="Ремонтні роботи"> 
                        Ремонтні роботи
                      </option>
                    )}
                    {row.attributes.Category === 'Автозапчастини' ? (
                      ''
                    ) : (
                      <option value="Автозапчастини"> 
                        Автозапчастини
                      </option>
                    )}
                    {row.attributes.Category === 'Інше' ? (
                      ''
                    ) : (
                      <option value="Інше"> 
                        Інше
                      </option>
                    )}
                  </Form.Select>
                  <div className={errorInput === true ? 'form-text text-danger' : 'form-text'}>
                    Редагуйте категорію витрат 
                  </div>
                </div>
              ) : (
                <div>
                  <i className={`ti ${iconbyCategory(row.attributes.Category)} ti-sm me-2 mb-2`}></i> 
                  <strong>{row.attributes.Category}</strong>
                </div>
              )}
            </>
          )},
        style: {
          marginBottom: '15px',
          marginTop: '15px'
        },
      },
      {
        name: 'КОМЕНТАР',
        grow: 2,
        width: '370px',
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
        width: "120px",
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
        width: "150px",
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
        width: "180px",
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
      <div className="table-responsive text-nowrap m-3">
        <div>
          {cars.payments.data.length === 0 ? (
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
              className='px-1 my-table'
              columns={columns}
              data={cars.payments.data}
              fixedHeader
              highlightOnHover={true}
              fixedHeaderScrollHeight="350px"
            />
          )}
        </div>
        <table className="table table-borderless">
          {addForm === false ? (
            <tfoot className="border-top">
              <tr>
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
                <th> 
                  <button type="button" className="mt-2 btn  waves-effect" >
                    <strong className="text-muted ms-1">
                      всього
                      <span className="badge bg-label-danger ms-4 px-2">
                        {total}
                      </span>
                    </strong>
                  </button>
                </th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </tfoot>
          ) : (
            <tfoot className="border-top">
              <tr>
                <td>
                  <div className='mt-3'>
                    <Form.Select 
                      aria-label="Default select example"
                      name='Category'
                      onChange={(e) => {
                        setNewPayment(e.target.name, e.target.value)
                      }}
                    >
                      <option >Виберіть категорію</option>
                      <option value="Ремонтні роботи"> 
                        Ремонтні роботи
                      </option>
                      <option value="Автозапчастини">
                        Автозапчастини
                      </option>
                      <option value="Інше">
                        Інше
                      </option>
                    </Form.Select>
                    <div className={errorInput === true ? 'form-text text-danger' : 'form-text'}>
                      Виберіть одну з категорій витрат 
                    </div>
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
                      //selected={ startDate }
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
    </>     
  );
}

PaymentsForm.propTypes = {
  state: PropTypes.oneOfType([PropTypes.bool, PropTypes.object, PropTypes.array]),
  cars: PropTypes.oneOfType([PropTypes.bool, PropTypes.object, PropTypes.array]),
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
  state: makeSelectAdminPage(),
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
)(PaymentsForm);