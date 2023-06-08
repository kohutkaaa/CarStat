import React, { memo, useEffect } from 'react';
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
  getDataCars, 
  setCarId,
  setPaymentsByCarId,
  setFuelShow
} from './actions';

import MyNavBar from 'components/MyNavBar/index.jsx';
import NavStat from './components/NavStat';
import DateFilter from './components/DateFilter';
import CardsByCategory from './components/CardsByCategory';
import SpinnersForLoading from 'components/SpinnersForLoading';

export function AdminStatistics({
  state,
  getDataCars,
  setCarId,
  setPaymentsByCarId,
  setFuelShow
}) {
  useInjectReducer({ key: 'adminStatistics', reducer });
  useInjectSaga({ key: 'adminStatistics', saga });

  useEffect(() => {
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
            {state.dataCars.length === 0 ? (
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
              state.dataCars.every((car) => car.attributes.payments.data.length === 0) ? (
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
                    У вас ще не має збережених витрат! 
                  </h4>
                </>
              ) : (
                <>
                  <DateFilter/>
                  <div className='row'>
                    <div className='mt-2 ms-2 col-6 pe-0'>
                      <h5 className='text-success mt-2' style={{fontWeight: '200'}}>
                        Врахувати витрати на топливо:
                        <i className='ti ti-gas-station text-success ti-sm mx-2 mb-2'></i> 
                        {state.fuelShow === false ? (
                          <label className="switch switch-outline-success">
                            <input type="checkbox" className="switch-input"
                              onClick={() => {setFuelShow(true)}}
                            />
                            <span className="switch-toggle-slider">
                              <span className="switch-on">
                                <i className="ti ti-check"></i>
                              </span>
                              <span className="switch-off">
                                <i className="ti ti-x"></i>
                              </span>
                            </span>
                          </label>
                        ) : (
                          <label className="switch switch-outline-success">
                            <input type="checkbox" className="switch-input"
                              onClick={() => {setFuelShow(false)}}
                            />
                            <span className="switch-toggle-slider">
                              <span className="switch-on">
                                <i className="ti ti-check"></i>
                              </span>
                              <span className="switch-off">
                                <i className="ti ti-x"></i>
                              </span>
                            </span>
                          </label>
                        )}
                      </h5>
                    </div>
                  </div>
                  <div className="row mt-4 me-3"> 
                    <CardsByCategory/>
                  </div> 
                </>
              )
            )} 
          </> 
        )}     
      </div>
    </div>
  );
}

AdminStatistics.propTypes = {
  getDataCars: PropTypes.func.isRequired,
  setCarId: PropTypes.func.isRequired,
  setFuelShow: PropTypes.func.isRequired,
  setPaymentsByCarId: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  state: makeSelectAdminStatistics(),
});

function mapDispatchToProps(dispatch) {
  return {
    getDataCars: () => { dispatch(getDataCars()) },
    setFuelShow: (bool) => { dispatch(setFuelShow(bool)) },
    setCarId: (bool) => { dispatch(setCarId(bool)) },
    setPaymentsByCarId: (bool) => { dispatch(setPaymentsByCarId(bool)) },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AdminStatistics);