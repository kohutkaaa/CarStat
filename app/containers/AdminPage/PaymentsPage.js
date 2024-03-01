import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { NavLink } from 'react-router-dom';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import MyNavBar from 'components/MyNavBar/index.jsx';
import SpinnersForLoading from 'components/SpinnersForLoading';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import makeSelectAdminPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getDataCars } from '../AboutCars/actions';
import {
  setLoading,
  deletePayment,
  setCarShow,
  setPaymentId,
  setCarId,
} from './actions';
import { getCarsSaga } from '../AboutCars/saga';
import { selectDataCars } from '../AboutCars/selectors';

import NavCars from './components/NavCars';
import PaymentsForm from './components/PaymentsForm';
import 'react-datepicker/dist/react-datepicker.css';

export function PaymentsPage({
  getDataCars,
  state,
  carsState,
  setLoading,
  setCarId,
  setPaymentId,
  setCarShow,
  deletePayment,
}) {
  useInjectReducer({ key: 'adminPage', reducer });
  useInjectSaga({ key: 'adminPage', saga });
  useInjectSaga({ key: 'aboutCars', saga: getCarsSaga });

  useEffect(() => {
    getDataCars();
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(false);

  const modalClose = () => setShowModal(false);
  const modalShow = () => setShowModal(true);

  const reloadPage = () => location.reload();

  useEffect(() => {
    if (carsState.length === 1) {
      setCarId(carsState[0].id);
      setCarShow(carsState[0].attributes);
    }
    setLoading(false);
  }, [carsState]);

  // useEffect(() => {
  //   console.log('state', state);
  // }, [state]);

  return (
    <div className="row">
      <div className="col-3">
        <MyNavBar />
      </div>
      <div className="col-9">
        {state.loading === true ? (
          <SpinnersForLoading />
        ) : (
          <>
            <NavCars
              cars={carsState}
              saveCar={setCarId}
              saveCarShow={setCarShow}
              carModel={state.carShow.Model}
            />
            {state.carShow === false ? (
              carsState.length === 0 ? (
                <>
                  <div className="d-flex justify-content-center mt-5">
                    <img
                      style={{ width: '300px' }}
                      src={require('../../images/logo1.png')}
                    />
                  </div>
                  <h5 className="text-center text-uppercase text-muted ">
                    Ласкаво просимо до
                    <span className="badge bg-label-primary p-2 rounded mx-2">
                      Car Statistics
                    </span>
                    - автомобільного трекера витрат!
                  </h5>
                  <h4 className="mt-4 text-center text-uppercase">
                    У вас ще не має збережених авто!
                    <br />
                    <br />
                    Додайте авто, щоб переглядати витрати!
                  </h4>
                </>
              ) : (
                <>
                  <div className="d-flex justify-content-center mt-5">
                    <img
                      style={{ width: '300px' }}
                      src={require('../../images/logo1.png')}
                    />
                  </div>
                  <h5 className="text-center text-uppercase text-muted ">
                    Ласкаво просимо до
                    <span className="badge bg-label-primary p-2 rounded mx-2">
                      Car Statistics
                    </span>
                    - автомобільного трекера витрат!
                  </h5>
                  <h4 className="mt-4 text-center text-uppercase">
                    Щоб переглянути витрати - виберіть авто!
                  </h4>
                </>
              )
            ) : (
              <>
                <div className=" card mt-4 me-4">
                  <h4 className="card-header ">
                    <span>
                      Ваші витрати на
                      <button
                        type="button"
                        className="btn btn-label-primary waves-effect pb-0 ms-2"
                      >
                        <h5>{state.carShow && state.carShow.Model}</h5>
                      </button>
                    </span>
                  </h4>
                  {/* <div className="table-responsive text-nowrap m-3">
                    <table className="table table-borderless">
                      <thead className="border-bottom">
                        <tr >
                          <th>Категорія</th>
                          <th>Коментар</th>
                          <th>Сума</th>
                          <th>Дата</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody >
                        {state.carShow && state.carShow.payments.data && state.carShow.payments.data.map( (item, index) => (
                          <tr key={index}>
                            <td>
                              <i className={`ti ${iconbyCategory(item.attributes.Category)} ti-sm me-2 mb-2`}></i> 
                              <strong>{item.attributes.Category}</strong>
                            </td>
                            <td>
                              {item.attributes.Comentar}
                            </td>
                            <td>
                              <span className="badge bg-label-danger px-2">{item.attributes.Payment}</span>
                            </td>
                            <td>
                              {item.attributes.Date}
                            </td>
                            <td>
                              <div className="dropdown">
                                <button type="button" className="btn btn-xs btn-label-info waves-effect m-1" >
                                  <i className="menu-icon tf-icons ti ti-pencil ti-xs my-1 ms-1"></i>
                                </button>
                                <button type="button" className="btn btn-xs btn-label-dark waves-effect m-1" onClick={() => {setPaymentId(item.id), setModalData(item.attributes.Comentar), modalShow()}}>
                                  <i className="menu-icon tf-icons ti ti-trash ti-xs my-1 ms-1"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      {AddNewPaym === false ? (
                        <tfoot className="border-top">
                          <tr>
                            <th>
                              <button type="button" className="btn btn-outline-primary waves-effect" onClick={() => setAddNewPaym(true)}>
                                <i className="ti ti-plus ti-sm text-primary"></i> 
                                <strong className="text-muted ms-1">додати витрату</strong>
                              </button>
                            </th>
                            <th></th>
                            <th>
                              <span className="badge bg-label-danger px-2">всього</span>
                            </th>
                            <th></th>
                            <th></th>
                          </tr>
                        </tfoot>
                      ) : (
                        <tfoot className="border-top">
                          <tr>
                            <td>
                              <div className='mt-3'>
                                <Form.Select aria-label="Default select example">
                                  <option >Виберіть категорію</option>
                                  <option value="1"> 
                                    Ремонтні роботи
                                  </option>
                                  <option value="2">
                                    Автозапчастини
                                  </option>
                                  <option value="3">
                                    Інше
                                  </option>
                                </Form.Select>
                                <div className="form-text">
                                  Виберіть одну з категорій витрат 
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className='mt-3'>
                                <input type="text" className="form-control" placeholder="заміна масла / фільтр"/>
                                <div className="form-text">
                                  Напишіть коментар до витрати
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className='mt-3'>
                                <input type="text" className="form-control" placeholder="1000"/>
                                <div className="form-text">
                                  Напишіть суму витрати
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className='mt-3'>
                                <DatePicker 
                                  className="p-2 form-control"
                                  dateFormat="yyyy/MM/dd" 
                                  selected={startDate} 
                                  onChange={(date) => setStartDate(date)} 
                                />
                                <div className="form-text">
                                  Виберіть дату
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dropdown">
                                <button type="button" className="btn btn-xs btn-label-info waves-effect m-1" >
                                  <i className="menu-icon tf-icons ti ti-plus ti-xs my-1 ms-1"></i>
                                </button>
                                <button type="button" className="btn btn-xs btn-label-dark waves-effect m-1" onClick={() => {setPaymentId(item.id), setModalData(item.attributes.Comentar), modalShow()}}>
                                  <i className="menu-icon tf-icons ti ti-trash ti-xs my-1 ms-1"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        </tfoot>
                      )}
                    </table>
                  </div> */}
                  <PaymentsForm
                    cars={state.carShow}
                    setModalData={setModalData}
                    modalShow={modalShow}
                  />
                </div>
                <Modal show={showModal} onHide={modalClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Видалити?</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Ви впевнені, що хочете видалити цю витрату?
                    <br />
                    <span className="text-primary"> {modalData} </span>
                  </Modal.Body>
                  <Modal.Footer>
                    <button
                      type="button"
                      className="btn btn-label-secondary waves-effect m-1 mb-0"
                      onClick={modalClose}
                    >
                      Відмінити
                    </button>
                    <button
                      type="button"
                      className="btn btn-label-danger waves-effect m-1 mb-0"
                      onClick={() => {
                        deletePayment(state.paymentId), reloadPage();
                      }}
                    >
                      Видалити
                    </button>
                  </Modal.Footer>
                </Modal>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

PaymentsPage.propTypes = {
  state: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
    PropTypes.array,
  ]),
  carsState: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
    PropTypes.array,
  ]),
  getDataCars: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  setCarId: PropTypes.func.isRequired,
  setPaymentId: PropTypes.func.isRequired,
  setCarShow: PropTypes.func.isRequired,
  deletePayment: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  state: makeSelectAdminPage(),
  carsState: selectDataCars(),
});

function mapDispatchToProps(dispatch) {
  return {
    getDataCars: () => {
      dispatch(getDataCars());
    },
    setPaymentId: value => {
      dispatch(setPaymentId(value));
    },
    setCarId: value => {
      dispatch(setCarId(value));
    },
    setLoading: bool => {
      dispatch(setLoading(bool));
    },
    setCarShow: value => {
      dispatch(setCarShow(value));
    },
    deletePayment: id => {
      dispatch(deletePayment(id));
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
)(PaymentsPage);
