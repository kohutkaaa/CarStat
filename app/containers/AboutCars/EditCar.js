import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useParams } from "react-router-dom";

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAboutCars from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getCarForEditing, setResponce } from './actions';

import MyNavBar from 'components/MyNavBar/index.jsx';
import SpinnersForLoading from 'components/SpinnersForLoading';
import PageTitle from './components/PageTitle';
import AddForm from './components/AddForm';

export function EditCar({
  state,
  getCarForEditing,
  setResponce
}) {
  useInjectReducer({ key: 'aboutCars', reducer });
  useInjectSaga({ key: 'aboutCars', saga });

  const { id } = useParams();

  const setResponseFalse = (bool) => {
    setResponce(bool)
  }

  useEffect(() => {
    getCarForEditing(id)
  }, [])

  return(
    <>
     <div className="row">
        <div className="col-3">
          <MyNavBar/>
        </div>
        <div className="col-9">
        {state.loading === true ? (
            <SpinnersForLoading/>
          ) : (
            state.responce === false ? (
              <>
                <PageTitle
                  textInTitle='Заповніть форму, щоб редагувати свій автомобіль'
                />
                <AddForm
                  editTrue={true}
                />
              </>
            ) : (
              <PageTitle
                textInTitle='Ваш автомобіль було успішно редаговано ✔️'
                textInButton='Повернутись до моїх авто'
                setResponseFalse={setResponseFalse}
                linkInButton="/about_cars"
              />
            )
          )}
        </div>
      </div>
    </>
  )
}

EditCar.propTypes = {
  state: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  getCarForEditing: PropTypes.func.isRequired,
  setResponce: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  state: makeSelectAboutCars(),
});

function mapDispatchToProps(dispatch) {
  return {
    getCarForEditing: (id) => { dispatch(getCarForEditing(id)) },
    setResponce: (bool) => { dispatch(setResponce(bool)) }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(EditCar);