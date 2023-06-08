import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAdminPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getCarsSaga } from '../AboutCars/saga';
import { selectDataCars } from '../AboutCars/selectors';

import { getDataCars } from '../AboutCars/actions';
import { setLoading, deletePayment, setCarShow, setCarId } from './actions';

import MyNavBar from 'components/MyNavBar/index.jsx';
import SpinnersForLoading from 'components/SpinnersForLoading';
import NavCars from './components/NavCars';
import PaymentsForm from './components/PaymentsForm';
import Modal from 'react-bootstrap/Modal';

export function PaymentsPage({
  getDataCars,
  state,
  carsState,
  setLoading,
  setCarId,
  setCarShow,
  deletePayment
}) {
  useInjectReducer({ key: 'adminPage', reducer });
  useInjectSaga({ key: 'adminPage', saga });
  useInjectSaga({ key: 'aboutCars', saga: getCarsSaga });

  useEffect(() => {
    getDataCars()
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(false);

  const modalClose = () => setShowModal(false);
  const modalShow = () => setShowModal(true);

  const reloadPage = () => {
    if (state.error === false){
      location.reload();
    }
  }

  useEffect(() => {
    if ( carsState.length >= 1 ) {
      setCarId(carsState[0].id);
      setCarShow(carsState[0].attributes);
    }
    setLoading(false)
  }, [carsState]);

  return (
    <div className="row">
      <div className="col-3">
        <MyNavBar/>
      </div>
      <div className="col-9">
        {state.loading === true ? (
          <SpinnersForLoading/>
        ) : (
          <>
            <NavCars
              cars={carsState}
              saveCar={setCarId}
              saveCarShow={setCarShow}
              carModel={state.carShow.Model}
            />
            {state.carShow === false ? (
              carsState.length === 0 && 
                <>
                  <div className="d-flex justify-content-center mt-5">
                    <img style={{ width: '300px' }} src={require('../../images/logo1.png')}  />
                  </div>
                  <h5 className="text-center text-uppercase text-muted ">Ласкаво просимо до  
                    <span className="badge bg-label-primary p-2 rounded mx-2">
                      Car Statistics
                    </span>
                    - автомобільного трекера витрат!
                  </h5>
                  <h4 className="mt-4 text-center text-uppercase">
                    У вас ще не має збережених авто! 
                    <br/>
                    <br/>
                    Додайте авто, щоб переглядати витрати!
                  </h4>
                </>
            ) : (
              <>
                <div className=" card mt-4 me-4">
                  <h4 className="card-header ">
                    <span>
                      Ваші витрати на
                      <button type="button" className="btn btn-label-primary waves-effect pb-0 ms-2" >
                        <h5>{state.carShow && state.carShow.Model}</h5>
                      </button>
                    </span>
                  </h4>
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
                    <br/>
                    <span className="text-primary"> {modalData} </span>
                  </Modal.Body>
                  <Modal.Footer>
                    <button type="button" className="btn btn-label-secondary waves-effect m-1 mb-0" onClick={modalClose}>
                      Відмінити
                    </button>
                    <button type="button" className="btn btn-label-danger waves-effect m-1 mb-0" onClick={() => {deletePayment(), reloadPage()}}>
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
  state: PropTypes.oneOfType([PropTypes.bool, PropTypes.object, PropTypes.array]),
  carsState: PropTypes.oneOfType([PropTypes.bool, PropTypes.object, PropTypes.array]),
  getDataCars: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  setCarId: PropTypes.func.isRequired,
  setCarShow: PropTypes.func.isRequired,
  deletePayment: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  state: makeSelectAdminPage(),
  carsState: selectDataCars(),
});

function mapDispatchToProps(dispatch) {
  return {
    getDataCars: () => { dispatch(getDataCars()) },
    setCarId: (value) => { dispatch(setCarId(value)) },
    setLoading: (bool) => { dispatch(setLoading(bool)) },
    setCarShow: (value) => { dispatch(setCarShow(value)) },
    deletePayment: (id) => { dispatch(deletePayment(id)) },
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