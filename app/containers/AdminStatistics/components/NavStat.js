import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import makeSelectAdminStatistics from '../selectors';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from '../reducer';
import { setCarId, setPaymentsByCarId } from '../actions';

import SpinnersForLoading from '../../../components/SpinnersForLoading';
import { NavLink } from 'react-router-dom';

function NavStat({
  setCarId,
  setPaymentsByCarId,
  state,
}) {    
  useInjectReducer({ key: 'adminStatistics', reducer });

  return(
    state.dataCars === false ? ( 
      <SpinnersForLoading/>
    ) : (
      <>
        <div className="card mt-4 me-4">
          <div className="card-body">
            <ul className="nav nav-tabs widget-nav-tabs pb-1 gap-4 mx-1 d-flex flex-nowrap" role="tablist">
              <li className="nav-item d-flex align-items-center justify-content-center " role="presentation">
                <div className="card-title  mb-0 me-2  ">
                  <h5 className="mb-0">Виберіть авто:</h5>
                </div>
              </li>
                {state.dataCars.length !== 0 && 
                  <>
                    {state.dataCars.length !== 1 && (
                      <li className="nav-item" role="presentation">
                        <button 
                          className={
                            state.carId === false ?
                            "nav-link active btn d-flex flex-column align-items-center justify-content-center" :
                            "nav-link btn d-flex flex-column align-items-center justify-content-center"
                          }
                          onClick={() => {setCarId(false), setPaymentsByCarId(false) }}   
                        >
                          <div className="badge bg-label-secondary rounded p-2">
                            <i className="ti ti-hierarchy text-primary ti-sm"></i>
                          </div>
                          <h6 className="tab-widget-title mb-0 mt-2">Разом</h6>
                        </button>
                      </li>
                    )}
                    {state.dataCars.map( (item, index) => 
                      <li className="nav-item" role="presentation" key={index}>
                        <button 
                          className={
                            state.carId === item.id ?
                            "nav-link active btn d-flex flex-column align-items-center justify-content-center" :
                            "nav-link btn d-flex flex-column align-items-center justify-content-center"}
                          onClick={() => {setCarId(item.id), setPaymentsByCarId(item.attributes.payments.data)}}>
                          <div className="badge bg-label-secondary rounded p-2">
                            <i className="ti ti-car text-primary ti-sm"></i>
                          </div>
                          <h6 className="tab-widget-title mb-0 mt-2">{item.attributes.Model}</h6>
                        </button>
                      </li>
                    )}
                  </>
                }
              <li className="nav-item" role="presentation">
                <NavLink to='/add_car'>
                  <span className="nav-link btn d-flex flex-column  align-items-center justify-content-center">
                    <div className="badge bg-label-secondary rounded p-2">
                      <i className="ti ti-plus ti-sm"></i>
                    </div>
                    <h6 className="tab-widget-title mb-0 mt-2">додати</h6>
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </>
    ) 
  )
}

NavStat.propTypes = {
  setCarId: PropTypes.func.isRequired,
  setPaymentsByCarId: PropTypes.func.isRequired,
  state: PropTypes.oneOfType([PropTypes.bool, PropTypes.object, PropTypes.array]),
};

const mapStateToProps = createStructuredSelector({
  state: makeSelectAdminStatistics(),
});

function mapDispatchToProps(dispatch) {
  return {
    setCarId: (id) => { dispatch(setCarId(id)) },
    setPaymentsByCarId: (data) => { dispatch(setPaymentsByCarId(data)) },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo,
)(NavStat);