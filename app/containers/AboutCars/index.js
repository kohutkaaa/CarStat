import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link } from 'react-router-dom';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAboutCars from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getDataCars, deleteCar } from './actions';

import MyNavBar from 'components/MyNavBar/index.jsx';
import SpinnersForLoading from 'components/SpinnersForLoading';
import PageTitle from './components/PageTitle';
import Modal from 'react-bootstrap/Modal';

export function AboutCars({
  getDataCars,
  state,
  deleteCar
}) {
  useInjectReducer({ key: 'aboutCars', reducer });
  useInjectSaga({ key: 'aboutCars', saga });

  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState(false);

  const modalClose = () => setShow(false);
  const modalShow = () => setShow(true);

  const reloadPage = () => location.reload();

  useEffect(() => {
    getDataCars()
  }, [])

  return(
    <>
     <div className="row">
        <div className="col-3">
          <MyNavBar/>
        </div>
        <div className="col-9">
          {state.loading === true ? (
            <SpinnersForLoading/>
          ) : (
            state.dataCars.length === 0 ? (
              <PageTitle
                textInTitle='Здається, у вас ще не має збережених авто'
                textInButton=' + Додати авто'
                linkInButton="/add_car"
              />
            ) : (
              <>
                <PageTitle
                  textInTitle='Ваші збережені автомобілі:'
                  numberOfCars={state.dataCars.length }
                />
                {state.dataCars && state.dataCars.map( (item, index) => (
                  <div className="row" key={index}>
                    <div className="col-12">
                      <div className="card mt-4 me-4 ps-2 mb-0">
                        <div className="row" >
                          <div className="col-4  ">
                            <div className=" pb-0 p-2">
                              <div className="card-header d-flex align-items-center flex-column">
                                <h3 className="card-action-title">{item.attributes.Model}</h3>
                                <span className="badge bg-label-secondary mt-1">{item.attributes.Brand}</span>
                              </div>
                                <div className="card-body  ">
                                  <div className="d-flex justify-content-around flex-wrap pt-3 ">
                                    <div className="d-flex align-items-start gap-2">
                                    <Link to={`/edit_car/${item.id}`} >
                                      <button type="button" className="btn btn-sm btn-label-primary waves-effect m-1 mb-0" >
                                        <i className="menu-icon tf-icons ti ti-pencil"></i>
                                        <span className='mt-1'>Редагувати</span>
                                      </button>
                                    </Link>
                                    </div>
                                    <div className="d-flex align-items-start gap-2">
                                      <button type="button" className="btn btn-sm btn-label-danger waves-effect m-1 mb-0" onClick={() => {setModalData(item.attributes.Model), modalShow()}}>
                                        <i className="menu-icon tf-icons ti ti-trash"></i>
                                        <span className='mt-1'>Видалити</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                            </div>
                          </div>
                          <div className="d-flex col-1 mt-5 justify-content-center text-center" style={{height: '180px'}}>
                            <div className="vr"></div>
                          </div>
                          <div className="col-7">
                            <div className=" card-action pb-0 ps-0 p-2 me-2 ">
                              <div className="card-header align-items-center">
                                <h5 className="card-action-title">Деталі</h5>
                              </div>
                              <div className="card-body">
                                <div className="row">
                                  <div className="col-xl-6 col-12">
                                    <div className="row mb-0">
                                      <div className="info-container">
                                        <ul className="list-unstyled">
                                          <li className="mb-2  pt-1">
                                            <span className="fw-semibold me-1">Двигун:</span>
                                            <span>{item.attributes.Motor}</span>
                                          </li>
                                          <li className="mb-2 pt-1">
                                            <span className="fw-semibold me-1">Паливо:</span>
                                            <span>{item.attributes.Fuel}</span>
                                          </li>
                                          <li className="mb-2 pt-1">
                                            <span className="fw-semibold me-1">Коробка передач:</span>
                                            <span>{item.attributes.Transmission}</span>
                                          </li>
                                          <li className=" pt-1">
                                            <span className="fw-semibold me-1">Пробіг:</span>
                                            <span>{item.attributes.Mileage}</span>
                                          </li>
                                        </ul> 
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-xl-6 col-12">
                                    <dl className="row mb-0">
                                      <ul className="list-unstyled">
                                        <li className="mb-2  pt-1">
                                          <span className="fw-semibold me-1">Колір:</span>
                                          <span>{item.attributes.Color}</span>
                                        </li>
                                        <li className="mb-2 pt-1">
                                          <span className="fw-semibold me-1">Номерний знак:</span>
                                          <span>{item.attributes.Number}</span>
                                        </li>
                                        <li className="mb-2 pt-1">
                                          <span className="fw-semibold me-1">Vin-код:</span>
                                          <span>{item.attributes.Vin}</span>
                                        </li>
                                        <li className=" pt-1">
                                          <span className="fw-semibold me-1">Рік:</span>
                                          <span>{item.attributes.Year}</span>
                                        </li>
                                      </ul> 
                                    </dl>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <Modal show={show} onHide={modalClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Видалити {modalData} ?</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Ви впевнені, що хочете видалити цей автомобіль?</Modal.Body>
                  <Modal.Footer>
                    <button type="button" className="btn btn-label-secondary waves-effect m-1 mb-0" onClick={modalClose}>
                      Відмінити
                    </button>
                    <button type="button" className="btn btn-label-danger waves-effect m-1 mb-0" onClick={() => {deleteCar(item.id), reloadPage()}}>
                      Видалити
                    </button>
                  </Modal.Footer>
                </Modal>
              </>
            )
          )}
        </div>
      </div>
    </>
  )
}

AboutCars.propTypes = {
  getDataCars: PropTypes.func.isRequired,
  deleteCar: PropTypes.func,
  state: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

const mapStateToProps = createStructuredSelector({
  state: makeSelectAboutCars(),
});

function mapDispatchToProps(dispatch) {
  return {
    getDataCars: () => { dispatch(getDataCars()) },
    deleteCar: (value) => { dispatch(deleteCar(value)) },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AboutCars);