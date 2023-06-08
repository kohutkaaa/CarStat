import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAdminPage from './selectors';
import reducer from './reducer';
import saga from './saga';

import MyNavBar from 'components/MyNavBar/index.jsx';

export function AdminPage() {
  useInjectReducer({ key: 'adminPage', reducer });
  useInjectSaga({ key: 'adminPage', saga });

  return (
    <div className="row">
      <div className="col-3">
        <MyNavBar/>
      </div>
      <div className="col-9">
        <div>
          <div className="d-flex justify-content-center ">
            <img style={{ width: '250px' }} src={require('../../images/logo1.png')}  />
          </div>
          <h5 className="text-center text-uppercase ">Ласкаво просимо до  
            <span className="badge bg-label-primary p-2 rounded mx-2">
              Car Statistics
            </span>
            - автомобільного трекера витрат!</h5>
          <h6 className="mt-4 text-center text-uppercase text-muted">
            Цей додаток створений, щоб допомогти 
            контролювати витрати на автомобіль. 
            <br/>
            Він дає вам можливість 
            легко і зручно вести статистику своїх витрат.
          </h6>
          <div className="help-center-knowledge-base  help-center-bg-alt bg-help-center mt-5">
            <div className="container-xl ps-0">
              <div className="row">
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-md-4 col-sm-6 mb-4">
                      <div className="card">
                        <div className="card-body">
                          <div className="d-flex align-items-center mb-2">
                            <span className="badge bg-label-success p-2 rounded me-2">
                              <i className="ti ti-wallet ti-sm"></i>
                            </span>
                            <h5 className="fw-semibold mt-3 ms-1">Керування фінансами:  </h5>
                          </div>
                          <ul className='px-0 text-center'>
                              <span className="text-muted py-1"> 
                                Допомагає керувати фінансами та знаходити способи економії.
                              </span>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-6 mb-4">
                      <div className="card">
                        <div className="card-body">
                          <div className="d-flex align-items-center mb-2">
                            <span className="badge bg-label-info p-2 rounded me-2">
                              <i className="ti ti-device-laptop ti-sm"></i>
                            </span>
                            <h5 className="fw-semibold mt-3 ms-1">Зручний доступ: </h5>
                          </div>
                          <ul className='px-0 text-center'>
                              <span className="text-muted py-1"> 
                                Легко переглядати історію витрат та отримувати потрібну інформацію.
                              </span>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-6 mb-4">
                      <div className="card">
                        <div className="card-body">
                          <div className="d-flex align-items-center mb-2">
                            <span className="badge bg-label-primary p-2 rounded me-2">
                              <i className="ti ti-car ti-sm"></i>
                            </span>
                            <h5 className="fw-semibold mt-3 ms-1">Декілька авто: </h5>
                          </div>
                          <ul className='px-0 text-center'>
                              <span className="text-muted py-1"> 
                                Ведення статистики витрат на декілька авто одночасно.
                              </span>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-6 mb-4">
                      <div className="card">
                        <div className="card-body">
                          <div className="d-flex align-items-center mb-2">
                            <span className="badge bg-label-warning p-2 rounded me-2">
                              <i className="ti ti-chart-line ti-sm"></i>
                            </span>
                            <h5 className="fw-semibold mt-3 ms-1">Спільна статистика: </h5>
                          </div>
                          <ul className='px-0 text-center'>
                              <span className="text-muted py-1"> 
                                Перегляд загальної статистики витрат на всі автомобілі.
                              </span>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-6 mb-4">
                      <div className="card">
                        <div className="card-body">
                          <div className="d-flex align-items-center mb-2">
                            <span className="badge bg-label-secondary p-2 rounded me-2">
                              <i className="ti ti-mail ti-sm"></i>
                            </span>
                            <h5 className="fw-semibold mt-3 ms-1">Нагадування: </h5>
                          </div>
                          <ul className='px-0 text-center'>
                              <span className="text-muted py-1"> 
                                Отримання нагадувань про регулярні витрати, такі як страховка.
                              </span>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-6 mb-4">
                      <div className="card">
                        <div className="card-body">
                          <div className="d-flex align-items-center mb-2">
                            <span className="badge bg-label-danger p-2 rounded me-2">
                              <i className="ti ti-businessplan ti-sm"></i>
                            </span>
                            <h5 className="fw-semibold mt-3 ms-1">Організація витрат:  </h5>
                          </div>
                          <ul className='px-0 text-center'>
                              <span className="text-muted py-1"> 
                                Зручно організовувати і категоризувати витрати на авто.
                              </span>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

AdminPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  adminPage: makeSelectAdminPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AdminPage);