import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

function TitlePage({
  callBack,
  buttonText,
  titleText,
  linkButton,
  numberCars,
}) {  

  return(
    <div className="row">
      <div className="col-12">
        <div className="card mt-4 p-5 me-2">
          <div className="row">
            <div className="col-8">
              <div className="d-flex align-items-start gap-2">
                <span className="badge bg-label-primary rounded">
                  <i className="ti ti-car ti-md"></i>
                </span>
                <div>
                  <h5 className="mt-2 fw-semibold"> {titleText} </h5>
                </div>
                {numberCars ? (
                  <span className="badge badge-center rounded-pill bg-label-success mt-2">{numberCars}</span>
                ) : ('')}
              </div>
            </div> 
            <div className="col-4 text-end">
              {buttonText ? (
                linkButton ? (
                  <NavLink to={linkButton} >
                    <button 
                      type="button" 
                      className="btn btn-primary waves-effect waves-light"
                    > 
                      {buttonText}
                    </button>
                  </NavLink>
                ) : (
                  <button 
                    type="button" 
                    className="btn btn-primary waves-effect waves-light"
                    onClick={() => callBack(false)}
                  > 
                    {buttonText}
                  </button>
                )
              ) : ('')}
            </div>
          </div> 
        </div>
      </div>
    </div>
  )
}

TitlePage.propTypes = {
  callBack: PropTypes.func,
  buttonText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  titleText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  linkButton: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  numberCars: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default memo(TitlePage);
