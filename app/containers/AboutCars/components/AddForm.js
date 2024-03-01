import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { NavLink } from 'react-router-dom';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { isEmpty } from 'lodash';
import makeSelectAboutCars from '../selectors';
import reducer from '../reducer';
import saga from '../saga';
import { setDataNewCar, addNewCar, editCar, setDataEditCar } from '../actions';

export function AddForm({
  editTrue,
  setDataNewCar,
  addNewCar,
  editCar,
  setDataEditCar,
  state,
}) {
  useInjectReducer({ key: 'aboutCars', reducer });
  useInjectSaga({ key: 'aboutCars', saga });

  const [errorInput, setErrorInput] = useState(false);

  const errorInInput = () => {
    if (!isEmpty(state.dataNewCar.Model) && !isEmpty(state.dataNewCar.Brand)) {
      setErrorInput(false);
      addNewCar();
    } else {
      setErrorInput(true);
    }
  };

  return (
    <>
      {editTrue === true ? (
        state.carForEditing && (
          <div className="col-12">
            <div className="card mt-4 me-4 py-3">
              <div className="card-body">
                <div className="user-avatar-section border-bottom">
                  <div className="d-flex align-items-start flex-column mb-3">
                    <div className="user-info">
                      <div className="row">
                        <div className="col-6">
                          <h4 className="mb-2">Марка</h4>
                          <input
                            type="text"
                            color="danger"
                            className="form-control mt-2"
                            id="defaultFormControlInput"
                            defaultValue={state.carForEditing.attributes.Brand}
                            placeholder={state.carForEditing.attributes.Brand}
                            aria-describedby="defaultFormControlHelp"
                            name="Brand"
                            onChange={e => {
                              setDataEditCar(e.target.name, e.target.value);
                            }}
                          />
                        </div>
                        <div className="col-6">
                          <h4 className="mb-2">Модель</h4>
                          <input
                            type="text"
                            className="form-control mt-2"
                            id="defaultFormControlInput"
                            defaultValue={state.carForEditing.attributes.Model}
                            placeholder={state.carForEditing.attributes.Model}
                            aria-describedby="defaultFormControlHelp"
                            name="Model"
                            onChange={e => {
                              setDataEditCar(e.target.name, e.target.value);
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
                            defaultValue={state.carForEditing.attributes.Motor}
                            placeholder={state.carForEditing.attributes.Motor}
                            aria-describedby="defaultFormControlHelp"
                            name="Motor"
                            onChange={e => {
                              setDataEditCar(e.target.name, e.target.value);
                            }}
                          />
                        </li>
                        <li className="mb-2 pt-1">
                          <span className="fw-semibold me-1">Паливо:</span>
                          <input
                            type="text"
                            className="form-control mt-2"
                            id="defaultFormControlInput"
                            defaultValue={state.carForEditing.attributes.Fuel}
                            placeholder={state.carForEditing.attributes.Fuel}
                            aria-describedby="defaultFormControlHelp"
                            name="Fuel"
                            onChange={e => {
                              setDataEditCar(e.target.name, e.target.value);
                            }}
                          />
                        </li>
                        <li className="mb-2 pt-1">
                          <span className="fw-semibold me-1">
                            Коробка передач:
                          </span>
                          <input
                            type="text"
                            className="form-control mt-2"
                            id="defaultFormControlInput"
                            defaultValue={
                              state.carForEditing.attributes.Transmission
                            }
                            placeholder={
                              state.carForEditing.attributes.Transmission
                            }
                            aria-describedby="defaultFormControlHelp"
                            name="Transmission"
                            onChange={e => {
                              setDataEditCar(e.target.name, e.target.value);
                            }}
                          />
                        </li>
                        <li className="mb-2 pt-1">
                          <span className="fw-semibold me-1">Пробіг:</span>
                          <input
                            type="text"
                            className="form-control mt-2"
                            id="defaultFormControlInput"
                            defaultValue={
                              state.carForEditing.attributes.Mileage
                            }
                            placeholder={state.carForEditing.attributes.Mileage}
                            aria-describedby="defaultFormControlHelp"
                            name="Mileage"
                            onChange={e => {
                              setDataEditCar(e.target.name, e.target.value);
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
                            defaultValue={state.carForEditing.attributes.Color}
                            placeholder={state.carForEditing.attributes.Color}
                            aria-describedby="defaultFormControlHelp"
                            name="Color"
                            onChange={e => {
                              setDataEditCar(e.target.name, e.target.value);
                            }}
                          />
                        </li>
                        <li className="mb-2 pt-1">
                          <span className="fw-semibold me-1">
                            Номерний знак:
                          </span>
                          <input
                            type="text"
                            className="form-control mt-2"
                            id="defaultFormControlInput"
                            defaultValue={state.carForEditing.attributes.Number}
                            placeholder={state.carForEditing.attributes.Number}
                            aria-describedby="defaultFormControlHelp"
                            name="Number"
                            onChange={e => {
                              setDataEditCar(e.target.name, e.target.value);
                            }}
                          />
                        </li>
                        <li className="mb-2 pt-1">
                          <span className="fw-semibold me-1">Vin-код:</span>
                          <input
                            type="text"
                            className="form-control mt-2"
                            id="defaultFormControlInput"
                            defaultValue={state.carForEditing.attributes.Vin}
                            placeholder={state.carForEditing.attributes.Vin}
                            aria-describedby="defaultFormControlHelp"
                            name="Vin"
                            onChange={e => {
                              setDataEditCar(e.target.name, e.target.value);
                            }}
                          />
                        </li>
                        <li className="mb-2 pt-1">
                          <span className="fw-semibold me-1">Рік:</span>
                          <input
                            type="text"
                            className="form-control mt-2"
                            id="defaultFormControlInput"
                            defaultValue={state.carForEditing.attributes.Year}
                            placeholder={state.carForEditing.attributes.Year}
                            // value={ state.editCarPut.Year && state.editCarPut.Year }
                            aria-describedby="defaultFormControlHelp"
                            name="Year"
                            onChange={e => {
                              setDataEditCar(e.target.name, e.target.value);
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
                      onClick={() => editCar(state.carForEditing.id)}
                    >
                      Зберегти
                    </button>
                    <NavLink to="/add_car">
                      <button
                        type="button"
                        className="btn btn-label-dark waves-effect"
                      >
                        Відмінити
                      </button>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      ) : (
        <div className="col-12">
          <div className="card mt-4 me-4 py-3">
            <div className="card-body">
              <div className="user-avatar-section border-bottom">
                <div className="d-flex align-items-start flex-column mb-3">
                  <div className="user-info">
                    <div className="row">
                      <div className="col-6">
                        <h4 className="mb-2">Марка</h4>
                        <input
                          type="text"
                          color="danger"
                          className={
                            errorInput === false
                              ? 'form-control mt-2'
                              : 'form-control mt-2 is-invalid'
                          }
                          id="defaultFormControlInput"
                          placeholder="Volkswagen"
                          aria-describedby="defaultFormControlHelp"
                          name="Brand"
                          onChange={e => {
                            setDataNewCar(e.target.name, e.target.value);
                          }}
                        />
                        {errorInput === false ? (
                          ''
                        ) : (
                          <div
                            id="defaultFormControlHelp"
                            className="form-text text-danger"
                          >
                            Поле обов'язкове для заповнення!
                          </div>
                        )}
                      </div>
                      <div className="col-6">
                        <h4 className="mb-2">Модель</h4>
                        <input
                          type="text"
                          className={
                            errorInput === false
                              ? 'form-control mt-2'
                              : 'form-control mt-2 is-invalid'
                          }
                          id="defaultFormControlInput"
                          placeholder="Passat"
                          aria-describedby="defaultFormControlHelp"
                          name="Model"
                          onChange={e => {
                            setDataNewCar(e.target.name, e.target.value);
                          }}
                        />
                        {errorInput === false ? (
                          ''
                        ) : (
                          <div
                            id="defaultFormControlHelp"
                            className="form-text text-danger"
                          >
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
                          name="Motor"
                          onChange={e => {
                            setDataNewCar(e.target.name, e.target.value);
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
                          name="Fuel"
                          onChange={e => {
                            setDataNewCar(e.target.name, e.target.value);
                          }}
                        />
                      </li>
                      <li className="mb-2 pt-1">
                        <span className="fw-semibold me-1">
                          Коробка передач:
                        </span>
                        <input
                          type="text"
                          className="form-control mt-2"
                          id="defaultFormControlInput"
                          placeholder="механіка"
                          aria-describedby="defaultFormControlHelp"
                          name="Transmission"
                          onChange={e => {
                            setDataNewCar(e.target.name, e.target.value);
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
                          name="Mileage"
                          onChange={e => {
                            setDataNewCar(e.target.name, e.target.value);
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
                          name="Color"
                          onChange={e => {
                            setDataNewCar(e.target.name, e.target.value);
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
                          name="Number"
                          onChange={e => {
                            setDataNewCar(e.target.name, e.target.value);
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
                          name="Vin"
                          onChange={e => {
                            setDataNewCar(e.target.name, e.target.value);
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
                          name="Year"
                          onChange={e => {
                            setDataNewCar(e.target.name, e.target.value);
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
                    onClick={errorInInput}
                  >
                    Зберегти
                  </button>
                  <NavLink to="/add_car">
                    <button
                      type="button"
                      className="btn btn-label-dark waves-effect"
                    >
                      Відмінити
                    </button>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

AddForm.propTypes = {
  state: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  editTrue: PropTypes.bool,
  editCar: PropTypes.func.isRequired,
  addNewCar: PropTypes.func.isRequired,
  setDataNewCar: PropTypes.func.isRequired,
  setDataEditCar: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  state: makeSelectAboutCars(),
});

function mapDispatchToProps(dispatch) {
  return {
    setDataNewCar: (key, value) => {
      dispatch(setDataNewCar(key, value));
    },
    addNewCar: () => {
      dispatch(addNewCar());
    },
    editCar: id => {
      dispatch(editCar(id));
    },
    setDataEditCar: (key, value) => {
      dispatch(setDataEditCar(key, value));
    },
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
