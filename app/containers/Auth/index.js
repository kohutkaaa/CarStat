import React, { memo, useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAuth from './selectors';
import { selectUser } from '../App/selectors';
import reducer from './reducer';
import saga from './saga';
import { setDataLogin, makeLogin } from './actions';

export function Auth({
  state,
  setDataLogin,
  makeLogin,
  user
}) {
  useInjectReducer({ key: 'auth', reducer });
  useInjectSaga({ key: 'auth', saga });

  const [showPass, setShowPass] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);

  useEffect(() => {
    console.log('state', state);
    console.log('user', user);
  }, [state, user])

  const errorInput = () => {
    if (!state.dataLogin) {
      setInvalidEmail(true)
      setInvalidPassword(true)
      return;
    }
    if (!state.dataLogin.identifier )  {
      setInvalidEmail(true)
      return;
    }
    if (!state.dataLogin.password) {
      setInvalidPassword(true)
      return;
    } else{
      makeLogin()
      setInvalidEmail(false)
      setInvalidPassword(false)
    }
  }

  return (
    <>
     { user && user.logined === true &&
        <>
          <Redirect
            push
            to={{
              pathname: '/dashboard/'
            }}
          />
        </>
      }
      <div className=" row">
        <div className="col-7 p-5">
          <h5 className="text-center text-uppercase mt-5 ">Ласкаво просимо до  
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
        <div className="d-flex col-5 align-items-center p-4 card">
          <div className="w-px-400 mx-auto">
            <div className="app-brand mb-4 mt-5">
              <span className="app-brand-logo ">
                <div className="d-flex  ">
                  <img style={{ width: '400px' }} src={require('../../images/logo2.png')}  />
                </div>
              </span>
            </div>
            <h3 className="mb-1 fw-bold">Ласкаво просимо до <br/> CAR STATISTICS! 👋</h3><br/>
            <p className="mb-4">Увійдіть у свій обліковий запис і відправляйтесь у подорож разом з трекером витрат!</p>
            <div>
              <div className="mb-3 ">
                <label className="form-label">Email</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="email" 
                  name="identifier" 
                  placeholder="Введіть адресу електронної пошти"
                  onChange={(e) => {
                    setDataLogin(e.target.name, e.target.value)
                  }}
                />
                {invalidEmail === true &&
                <div className="text-danger">
                  введіть Email!
                </div>}
              </div>
              <div className="mb-3 ">
                <div className="d-flex justify-content-between">
                  <label className="form-label">Пароль</label>
                </div>
                <div className="input-group input-group-merge ">
                  <input 
                    type={showPass ? 'text' : 'password'} 
                    id="password" 
                    className="form-control" 
                    name="password" 
                    placeholder="············" 
                    aria-describedby="password"
                    onChange={(e) => {
                      setDataLogin(e.target.name, e.target.value)
                    }}
                  />
                  <span className="input-group-text cursor-pointer">
                    <i 
                      className={showPass ? "ti ti-eye-off" : "ti ti-eye"} 
                      onClick={() => {setShowPass(!showPass)}}
                    >
                    </i>
                  </span>
                </div>
                {invalidPassword === true &&
                <div className="text-danger">
                  введіть пароль!
                </div>}
              </div>
              {state.error !== false &&
                <div className="text-danger mb-3">
                  Не правильний пароль або email!!!
                </div>}
              <button 
                className="btn btn-primary w-100 "
                onClick={() => {errorInput()}}
              >
                Ввійти
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Auth.propTypes = {
  setDataLogin: PropTypes.func.isRequired,
  makeLogin: PropTypes.func.isRequired,
  user: PropTypes.oneOfType([ PropTypes.bool, PropTypes.object]),
  state: PropTypes.oneOfType([ PropTypes.bool, PropTypes.object]),
};

const mapStateToProps = createStructuredSelector({
  state: makeSelectAuth(),
  user: selectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    setDataLogin: (key, value) => { dispatch(setDataLogin(key, value)) },
    makeLogin: () => { dispatch(makeLogin()) },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Auth);
