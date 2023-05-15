import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { NavLink } from 'react-router-dom';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAboutCars from '../selectors';
import reducer from '../reducer';
import saga from '../saga';
import { setNewCar, addNewCar, editCar, setEditCar } from '../actions';

import { isEmpty } from 'lodash';

export function AddForm({
  editTrue,
  setNewCar,
  addNewCar,
  editCar,
  setEditCar,
  state
}) {
  useInjectReducer({ key: 'aboutCars', reducer });
  useInjectSaga({ key: 'aboutCars', saga });

  const [errorInput, setErrorInput] = useState(false);

  useEffect(() => {
    console.log('state', state);
  }, [state])

  const errorNewCar = () => {
    if (!isEmpty(state.newCar.Model) && !isEmpty(state.newCar.Brand)) {
        setErrorInput(false);
        addNewCar()
        return;
    } else {
      setErrorInput(true);
    }
  }



  return(
    <>
      {editTrue === true ? (
          state.dataCarEdit &&
            <div className="col-12">
              <div className="card mt-4 me-2 py-3">
                <div className="card-body">
                  <div className="user-avatar-section border-bottom">
                    <div className="d-flex align-items-start flex-column mb-3">
                      <div className="user-info">
                        <div className="row">
                          <div className="col-6">
                            <h4 className="mb-2">Марка</h4>
                            <input 
                              type="text" 
                              color='danger'
                              className='form-control mt-2'
                              id="defaultFormControlInput" 
                              defaultValue={state.dataCarEdit.attributes.Brand} 
                              placeholder={state.dataCarEdit.attributes.Brand} 
                              aria-describedby="defaultFormControlHelp"
                              name='Brand'
                              onChange={(e) => {
                                setEditCar(e.target.name, e.target.value)
                              }}
                            />
                            
                          </div>
                          <div className="col-6">
                            <h4 className="mb-2">Модель</h4>
                            <input 
                              type="text" 
                              className='form-control mt-2'
                              id="defaultFormControlInput" 
                              defaultValue={state.dataCarEdit.attributes.Model} 
                              placeholder={state.dataCarEdit.attributes.Model} 
                              aria-describedby="defaultFormControlHelp"
                              name='Model'
                              onChange={(e) => {
                                setEditCar(e.target.name, e.target.value)
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h5 className="mt-4 small text-uppercase text-muted">Деталі</h5>
                  <div className="info-container">
                    <div className="row">
                      <div className="col-6">
                        <ul className="list-unstyled">
                          <li className="mb-2">
                            <span className="fw-semibold me-1">Двигун:</span>
                            <input 
                              type="text" 
                              className="form-control mt-2" 
                              id="defaultFormControlInput" 
                              defaultValue={state.dataCarEdit.attributes.Motor}  
                              placeholder={state.dataCarEdit.attributes.Motor}  
                              aria-describedby="defaultFormControlHelp"
                              name='Motor'
                              onChange={(e) => {
                                setEditCar(e.target.name, e.target.value)
                              }}
                            />
                          </li>
                          <li className="mb-2 pt-1">
                            <span className="fw-semibold me-1">Паливо:</span>
                            <input 
                              type="text" 
                              className="form-control mt-2" 
                              id="defaultFormControlInput" 
                              defaultValue={state.dataCarEdit.attributes.Fuel} 
                              placeholder={state.dataCarEdit.attributes.Fuel} 
                              aria-describedby="defaultFormControlHelp"
                              name='Fuel'
                              onChange={(e) => {
                                setEditCar(e.target.name, e.target.value)
                              }}
                            />
                          </li>
                          <li className="mb-2 pt-1">
                            <span className="fw-semibold me-1">Коробка передач:</span>
                            <input 
                              type="text" 
                              className="form-control mt-2" 
                              id="defaultFormControlInput" 
                              defaultValue={state.dataCarEdit.attributes.Transmission} 
                              placeholder={state.dataCarEdit.attributes.Transmission} 
                              aria-describedby="defaultFormControlHelp"
                              name='Transmission'
                              onChange={(e) => {
                                setEditCar(e.target.name, e.target.value)
                              }}
                            />
                          </li>
                          <li className="mb-2 pt-1">
                            <span className="fw-semibold me-1">Пробіг:</span>
                            <input 
                              type="text" 
                              className="form-control mt-2" 
                              id="defaultFormControlInput" 
                              defaultValue={state.dataCarEdit.attributes.Mileage}  
                              placeholder={state.dataCarEdit.attributes.Mileage}  
                              aria-describedby="defaultFormControlHelp"
                              name='Mileage'
                              onChange={(e) => {
                                setEditCar(e.target.name, e.target.value)
                              }}
                            />
                          </li>
                        </ul>
                      </div>
                      <div className="col-6">
                        <ul className="list-unstyled">
                          <li className="mb-2">
                            <span className="fw-semibold me-1">Колір:</span>
                            <input 
                              type="text" 
                              className="form-control mt-2" 
                              id="defaultFormControlInput" 
                              defaultValue={state.dataCarEdit.attributes.Color}  
                              placeholder={state.dataCarEdit.attributes.Color}  
                              aria-describedby="defaultFormControlHelp"
                              name='Color'
                              onChange={(e) => {
                                setEditCar(e.target.name, e.target.value)
                              }}
                            />
                          </li>
                          <li className="mb-2 pt-1">
                            <span className="fw-semibold me-1">Номерний знак:</span>
                            <input 
                              type="text" 
                              className="form-control mt-2" 
                              id="defaultFormControlInput" 
                              defaultValue={state.dataCarEdit.attributes.Number}  
                              placeholder={state.dataCarEdit.attributes.Number}  
                              aria-describedby="defaultFormControlHelp"
                              name='Number'
                              onChange={(e) => {
                                setEditCar(e.target.name, e.target.value)
                              }}
                            />
                          </li>
                          <li className="mb-2 pt-1">
                            <span className="fw-semibold me-1">Vin-код:</span>
                            <input 
                              type="text" 
                              className="form-control mt-2" 
                              id="defaultFormControlInput" 
                              defaultValue={state.dataCarEdit.attributes.Vin}   
                              placeholder={state.dataCarEdit.attributes.Vin}   
                              aria-describedby="defaultFormControlHelp"
                              name='Vin'
                              onChange={(e) => {
                                setEditCar(e.target.name, e.target.value)
                              }}
                            />
                          </li>
                          <li className="mb-2 pt-1">
                            <span className="fw-semibold me-1">Рік:</span>
                            <input 
                              type="text" 
                              className="form-control mt-2" 
                              id="defaultFormControlInput" 
                              defaultValue={state.dataCarEdit.attributes.Year} 
                              placeholder={state.dataCarEdit.attributes.Year} 
                              aria-describedby="defaultFormControlHelp"
                              name='Year'
                              onChange={(e) => {
                                setEditCar(e.target.name, e.target.value)
                              }}
                            />
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="d-flex mt-3">
                      <button 
                        type="button" 
                        className="btn btn-label-success waves-effect me-3"
                        onClick={editCar()}
                      >
                        Зберегти
                      </button>
                      <NavLink to='/add_car'>
                        <button type="button" className="btn btn-label-dark waves-effect">Відмінити</button>
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        ) : (
          <div className="col-12">
            <div className="card mt-4 me-2 py-3">
              <div className="card-body">
                <div className="user-avatar-section border-bottom">
                  <div className="d-flex align-items-start flex-column mb-3">
                    <div className="user-info">
                      <div className="row">
                        <div className="col-6">
                          <h4 className="mb-2">Марка</h4>
                          <input 
                            type="text" 
                            color='danger'
                            className={errorInput === false ? ('form-control mt-2') : ('form-control mt-2 is-invalid')}
                            id="defaultFormControlInput" 
                            placeholder="Volkswagen" 
                            aria-describedby="defaultFormControlHelp"
                            name='Brand'
                            onChange={(e) => {
                              setNewCar(e.target.name, e.target.value)
                            }}
                          />
                          {errorInput === false ? ('') : (
                            <div id="defaultFormControlHelp" className="form-text text-danger">
                              Поле обов'язкове для заповнення!
                            </div>
                          )}
                        </div>
                        <div className="col-6">
                          <h4 className="mb-2">Модель</h4>
                          <input 
                            type="text" 
                            className={errorInput === false ? ('form-control mt-2') : ('form-control mt-2 is-invalid')}
                            id="defaultFormControlInput" 
                            placeholder="Passat" 
                            aria-describedby="defaultFormControlHelp"
                            name='Model'
                            onChange={(e) => {
                              setNewCar(e.target.name, e.target.value)
                            }}
                          />
                          {errorInput === false ? ('') : (
                            <div id="defaultFormControlHelp" className="form-text text-danger">
                              Поле обов'язкове для заповнення!
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <h5 className="mt-4 small text-uppercase text-muted">Деталі</h5>
                <div className="info-container">
                  <div className="row">
                    <div className="col-6">
                      <ul className="list-unstyled">
                        <li className="mb-2">
                          <span className="fw-semibold me-1">Двигун:</span>
                          <input 
                            type="text" 
                            className="form-control mt-2" 
                            id="defaultFormControlInput" 
                            placeholder="1.9 tdi" 
                            aria-describedby="defaultFormControlHelp"
                            name='Motor'
                            onChange={(e) => {
                              setNewCar(e.target.name, e.target.value)
                            }}
                          />
                        </li>
                        <li className="mb-2 pt-1">
                          <span className="fw-semibold me-1">Паливо:</span>
                          <input 
                            type="text" 
                            className="form-control mt-2" 
                            id="defaultFormControlInput" 
                            placeholder="дизель" 
                            aria-describedby="defaultFormControlHelp"
                            name='Fuel'
                            onChange={(e) => {
                              setNewCar(e.target.name, e.target.value)
                            }}
                          />
                        </li>
                        <li className="mb-2 pt-1">
                          <span className="fw-semibold me-1">Коробка передач:</span>
                          <input 
                            type="text" 
                            className="form-control mt-2" 
                            id="defaultFormControlInput" 
                            placeholder="механіка" 
                            aria-describedby="defaultFormControlHelp"
                            name='Transmission'
                            onChange={(e) => {
                              setNewCar(e.target.name, e.target.value)
                            }}
                          />
                        </li>
                        <li className="mb-2 pt-1">
                          <span className="fw-semibold me-1">Пробіг:</span>
                          <input 
                            type="text" 
                            className="form-control mt-2" 
                            id="defaultFormControlInput" 
                            placeholder="100 000" 
                            aria-describedby="defaultFormControlHelp"
                            name='Mileage'
                            onChange={(e) => {
                              setNewCar(e.target.name, e.target.value)
                            }}
                          />
                        </li>
                      </ul>
                    </div>
                    <div className="col-6">
                      <ul className="list-unstyled">
                        <li className="mb-2">
                          <span className="fw-semibold me-1">Колір:</span>
                          <input 
                            type="text" 
                            className="form-control mt-2" 
                            id="defaultFormControlInput" 
                            placeholder="сірий" 
                            aria-describedby="defaultFormControlHelp"
                            name='Color'
                            onChange={(e) => {
                              setNewCar(e.target.name, e.target.value)
                            }}
                          />
                        </li>
                        <li className="mb-2 pt-1">
                          <span className="fw-semibold me-1">Номерний знак:</span>
                          <input 
                            type="text" 
                            className="form-control mt-2" 
                            id="defaultFormControlInput" 
                            placeholder="AA 1234 OO" 
                            aria-describedby="defaultFormControlHelp"
                            name='Number'
                            onChange={(e) => {
                              setNewCar(e.target.name, e.target.value)
                            }}
                          />
                        </li>
                        <li className="mb-2 pt-1">
                          <span className="fw-semibold me-1">Vin-код:</span>
                          <input 
                            type="text" 
                            className="form-control mt-2" 
                            id="defaultFormControlInput" 
                            placeholder="WWW0ZZZ1234567890" 
                            aria-describedby="defaultFormControlHelp"
                            name='Vin'
                            onChange={(e) => {
                              setNewCar(e.target.name, e.target.value)
                            }}
                          />
                        </li>
                        <li className="mb-2 pt-1">
                          <span className="fw-semibold me-1">Рік:</span>
                          <input 
                            type="text" 
                            className="form-control mt-2" 
                            id="defaultFormControlInput" 
                            placeholder="2004" 
                            aria-describedby="defaultFormControlHelp"
                            name='Year'
                            onChange={(e) => {
                              setNewCar(e.target.name, e.target.value)
                            }}
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="d-flex mt-3">
                    <button 
                      type="button" 
                      className="btn btn-label-success waves-effect me-3"
                      onClick={errorNewCar}
                    >
                      Зберегти
                    </button>
                    <NavLink to='/add_car'>
                      <button type="button" className="btn btn-label-dark waves-effect">Відмінити</button>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}

AddForm.propTypes = {
  state: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  editTrue: PropTypes.bool,
  editCar: PropTypes.func.isRequired,
  addNewCar: PropTypes.func.isRequired,
  setNewCar: PropTypes.func.isRequired,
  setEditCar: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  state: makeSelectAboutCars(),
});

function mapDispatchToProps(dispatch) {
  return {
    setNewCar: ( key, value ) => { dispatch(setNewCar( key, value )) },
    addNewCar: () => { dispatch(addNewCar()) },
    editCar: ( key, value ) => { dispatch(editCar( key, value )) },
    setEditCar: () => { dispatch(setEditCar()) },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AddForm);
