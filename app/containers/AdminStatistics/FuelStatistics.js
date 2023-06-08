import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAdminStatistics from './selectors';
import reducer from './reducer';
import saga from './saga';
import { 
  getDataCarsFuel,
  getDataCars,
  deletePayment
} from './actions';

import MyNavBar from 'components/MyNavBar/index.jsx';
import NavStat from './components/NavStat';
import DateFilter from './components/DateFilter';
import CardsByCategory from './components/CardsByCategory';
import SpinnersForLoading from 'components/SpinnersForLoading';
import FuelForm from './components/FuelForm';
import Modal from 'react-bootstrap/Modal';

export function FuelStatistics({
  state,
  getDataCarsFuel,
  getDataCars,
  deletePayment
}) {
  useInjectReducer({ key: 'adminStatistics', reducer });
  useInjectSaga({ key: 'adminStatistics', saga });

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(false);

  const modalClose = () => setShowModal(false);
  const modalShow = () => setShowModal(true);

  const reloadPage = () => {
    setTimeout(() => {
      if (state.error === false) {
        location.reload();
      }
    }, 500);
  }

  useEffect(() => {
    console.log('dataPaymFuel', state.dataPaymFuel);
  }, [state])

  useEffect(() => {
    getDataCarsFuel(),
    getDataCars()
  }, [])

  useEffect(() => {
    if (state.dataCars.length === 1) {
      setCarId(state.dataCars[0].id)
      setPaymentsByCarId(state.dataCars[0].attributes.payments.data)
    }
  }, [state.dataCars])

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
            <NavStat/> 
            {state.dataPaymFuel && state.dataPaymFuel.length !== 0 &&    
              <>       
                <DateFilter/>
                <div className="row mt-4 me-3"> 
                  <CardsByCategory
                    page='fuel' 
                  />
                </div> 
              </>
            }
            <FuelForm
              setModalData={setModalData}
              modalShow={modalShow}
            />
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
      </div>
    </div>
  );
}

FuelStatistics.propTypes = {
  getDataCarsFuel: PropTypes.func.isRequired,
  getDataCars: PropTypes.func.isRequired,
  deletePayment: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  state: makeSelectAdminStatistics(),
});

function mapDispatchToProps(dispatch) {
  return {
    getDataCarsFuel: () => { dispatch(getDataCarsFuel()) },
    getDataCars: () => { dispatch(getDataCars()) },
    deletePayment: () => { dispatch(deletePayment()) },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(FuelStatistics);