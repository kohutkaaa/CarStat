import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import SpinnersForLoading from '../../../components/SpinnersForLoading';
import { NavLink } from 'react-router-dom';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from '../reducer';
import saga from '../saga';

function NavCars({
  saveCar,
  saveCarShow,
  carModel,
  cars
}) {    
  useInjectReducer({ key: 'adminPage', reducer });
  useInjectSaga({ key: 'adminPage', saga });

  return(
    cars === false ? (
      <SpinnersForLoading/>
    ) : (
      <div className="card mt-4 me-4">
        <div className="card-body">
          <ul className="nav nav-tabs widget-nav-tabs pb-1 gap-4 mx-1 d-flex flex-nowrap" role="tablist">
            <li className="nav-item d-flex align-items-center justify-content-center " role="presentation">
              <div className="card-title  mb-0 me-2  ">
                <h5 className="mb-0">Виберіть авто:</h5>
              </div>
            </li>
            {cars && cars.map( (item, index) => 
              <li className="nav-item" role="presentation" key={index}>
                <button 
                  className={
                    carModel === item.attributes.Model ?
                    "nav-link active btn d-flex flex-column align-items-center justify-content-center" :
                    "nav-link btn d-flex flex-column align-items-center justify-content-center"}
                  onClick={() => {saveCar(item.id), saveCarShow(item.attributes)}} 
                >
                  <div className="badge bg-label-secondary rounded p-2">
                    <i className="ti ti-car text-primary ti-sm"></i>
                  </div>
                  <h6 className="tab-widget-title mb-0 mt-2">{item.attributes.Model}</h6>
                </button>
              </li>
            )}
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
    )
  )
}

NavCars.propTypes = {
  saveCar: PropTypes.func.isRequired,
  saveCarShow: PropTypes.func.isRequired,
  state: PropTypes.oneOfType([PropTypes.bool, PropTypes.object, PropTypes.array]),
  cars: PropTypes.oneOfType([PropTypes.bool, PropTypes.object, PropTypes.array]),
  carModel: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default compose(
  memo,
)(NavCars);