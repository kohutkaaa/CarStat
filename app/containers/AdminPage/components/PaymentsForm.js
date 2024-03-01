import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import makeSelectAdminPage from '../selectors';
import reducer from '../reducer';
import saga from '../saga';

import { setPaymentId, setNewPayment, addNewPayment } from '../actions';

import 'react-datepicker/dist/react-datepicker.css';
import { isEmpty, isNaN } from 'lodash';

export function PaymentsForm({
  state,
  cars,
  setPaymentId,
  setModalData,
  modalShow,
  setNewPayment,
  addNewPayment,
}) {
  useInjectReducer({ key: 'adminPage', reducer });
  useInjectSaga({ key: 'adminPage', saga });

  const [AddForm, setAddForm] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const [errorInput, setErrorInput] = useState(false);
  const [errorInputPayment, setErrorInputPayment] = useState(false);

  const reloadPage = () => location.reload();

  const iconbyCategory = category => {
    if (category === 'Ремонтні роботи') {
      return 'ti-hammer text-danger';
    }
    if (category === 'Автозапчастини') {
      return 'ti-puzzle text-warning';
    }
    if (category === 'Інше') {
      return 'ti-link text-info';
    }
  };

  const inputError = () => {
    if (state.newPayment === false) {
      setErrorInput(true);
      return;
    }
    if (isEmpty(state.newPayment.Category)) {
      setErrorInput(true);
      return;
    }
    if (isEmpty(state.newPayment.Comentar)) {
      setErrorInput(true);
      return;
    }
    if (isEmpty(state.newPayment.Payment) || isNaN(state.newPayment.Payment)) {
      setErrorInputPayment(true);
    } else {
      setNewPayment('Date', startDate);
      setNewPayment('car', { id: state.carId });
      setErrorInput(false);
      setErrorInputPayment(false);
      addNewPayment();
      reloadPage();
    }
  };

  useEffect(() => {
    console.log('state', state);
  }, [state]);

  return (
    <>
      <div className="table-responsive text-nowrap m-3">
        <table className="table table-borderless">
          <thead className="border-bottom">
            <tr>
              <th>Категорія</th>
              <th>Коментар</th>
              <th>Сума</th>
              <th>Дата</th>
            </tr>
          </thead>
          <tbody>
            {cars &&
              cars.payments.data &&
              cars.payments.data.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div>
                      <i
                        className={`ti ${iconbyCategory(
                          item.attributes.Category,
                        )} ti-sm me-2 mb-2`}
                      />
                      <strong>{item.attributes.Category}</strong>
                    </div>
                  </td>
                  <td>
                    <div>{item.attributes.Comentar}</div>
                  </td>
                  <td>
                    <div>
                      <span className="badge bg-label-danger px-2">
                        {item.attributes.Payment}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div>{item.attributes.Date}</div>
                  </td>
                  <td>
                    <div className="dropdown">
                      <button
                        type="button"
                        className="btn btn-xs btn-label-info waves-effect m-1"
                      >
                        <i className="menu-icon tf-icons ti ti-pencil ti-xs my-1 ms-1" />
                      </button>
                      <button
                        type="button"
                        className="btn btn-xs btn-label-dark waves-effect m-1"
                        onClick={() => {
                          setPaymentId(item.id),
                          setModalData(item.attributes.Comentar),
                          modalShow();
                        }}
                      >
                        <i className="menu-icon tf-icons ti ti-trash ti-xs my-1 ms-1" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
          {AddForm === false ? (
            <tfoot className="border-top">
              <tr>
                <th>
                  <button
                    type="button"
                    className="btn btn-outline-primary waves-effect"
                    onClick={() => setAddForm(true)}
                  >
                    <i className="ti ti-plus ti-sm text-primary" />
                    <strong className="text-muted ms-1">додати витрату</strong>
                  </button>
                </th>
                <th />
                <th>
                  <span className="badge bg-label-danger px-2">всього</span>
                </th>
                <th />
                <th />
              </tr>
            </tfoot>
          ) : (
            <tfoot className="border-top">
              <tr>
                <td>
                  <div className="mt-3">
                    <Form.Select
                      aria-label="Default select example"
                      name="Category"
                      onChange={e => {
                        setNewPayment(e.target.name, e.target.value);
                      }}
                    >
                      <option>Виберіть категорію</option>
                      <option value="Ремонтні роботи">Ремонтні роботи</option>
                      <option value="Автозапчастини">Автозапчастини</option>
                      <option value="Інше">Інше</option>
                    </Form.Select>
                    <div
                      className={
                        errorInput === true
                          ? 'form-text text-danger'
                          : 'form-text'
                      }
                    >
                      Виберіть одну з категорій витрат
                    </div>
                  </div>
                </td>
                <td>
                  <div className="mt-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="заміна масла / фільтр"
                      name="Comentar"
                      onChange={e => {
                        setNewPayment(e.target.name, e.target.value);
                      }}
                    />
                    <div
                      className={
                        errorInput === true
                          ? 'form-text text-danger'
                          : 'form-text'
                      }
                    >
                      Напишіть коментар до витрати
                    </div>
                  </div>
                </td>
                <td>
                  <div className="mt-3">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="1000"
                      name="Payment"
                      onChange={e => {
                        setNewPayment(e.target.name, e.target.value);
                      }}
                    />
                    <div
                      className={
                        errorInputPayment === true
                          ? 'form-text text-danger'
                          : 'form-text'
                      }
                    >
                      Напишіть суму витрати
                    </div>
                  </div>
                </td>
                <td>
                  <div className="mt-3">
                    <DatePicker
                      className="p-2 form-control"
                      dateFormat="yyyy/MM/dd"
                      name="Date"
                      selected={startDate}
                      onChange={date => setStartDate(date)}
                    />
                    <div className="form-text">Виберіть дату</div>
                  </div>
                </td>
                <td>
                  <div className="dropdown">
                    <button
                      type="button"
                      className="btn btn-xs btn-label-info waves-effect m-1"
                      onClick={inputError}
                    >
                      <i className="menu-icon tf-icons ti ti-plus ti-xs my-1 ms-1" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-xs btn-label-dark waves-effect m-1"
                      onClick={() => {
                        setAddForm(false);
                        setNewPayment('Category', false);
                        setNewPayment('Comentar', false);
                        setNewPayment('Payment', false);
                        setNewPayment('Date', false);
                      }}
                    >
                      <i className="menu-icon tf-icons ti ti-trash ti-xs my-1 ms-1" />
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
  state: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
    PropTypes.array,
  ]),
  cars: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
    PropTypes.array,
  ]),
  setPaymentId: PropTypes.func.isRequired,
  setModalData: PropTypes.func.isRequired,
  setNewPayment: PropTypes.func.isRequired,
  addNewPayment: PropTypes.func.isRequired,
  modalShow: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  state: makeSelectAdminPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    setPaymentId: value => {
      dispatch(setPaymentId(value));
    },
    addNewPayment: () => {
      dispatch(addNewPayment());
    },
    setNewPayment: (key, value) => {
      dispatch(setNewPayment(key, value));
    },
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
