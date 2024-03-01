import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

function PageTitle({
  setResponseFalse,
  textInButton,
  textInTitle,
  linkInButton,
  numberOfCars,
}) {
  return (
    <div className="row">
      <div className="col-12">
        <div className="card mt-4 p-5 me-4">
          <div className="row">
            <div className="col-8">
              <div className="d-flex align-items-start gap-2">
                <span className="badge bg-label-primary rounded">
                  <i className="ti ti-car ti-md" />
                </span>
                <div>
                  <h5 className="mt-2 fw-semibold"> {textInTitle} </h5>
                </div>
                {numberOfCars ? (
                  <span className="badge badge-center rounded-pill bg-label-success mt-2">
                    {numberOfCars}
                  </span>
                ) : (
                  ''
                )}
              </div>
            </div>
            <div className="col-4 text-end">
              {textInButton ? (
                linkInButton ? (
                  <NavLink to={linkInButton}>
                    <button
                      type="button"
                      className="btn btn-primary waves-effect waves-light"
                      onClick={() =>
                        setResponseFalse && setResponseFalse(false)
                      }
                    >
                      {textInButton}
                    </button>
                  </NavLink>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary waves-effect waves-light"
                    onClick={() => setResponseFalse(false)}
                  >
                    {textInButton}
                  </button>
                )
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

PageTitle.propTypes = {
  setResponseFalse: PropTypes.func,
  textInButton: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  textInTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  linkInButton: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  numberOfCars: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default memo(PageTitle);
