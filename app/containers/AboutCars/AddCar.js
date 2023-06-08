import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAboutCars from './selectors';
import reducer from './reducer';
import saga from './saga';

import MyNavBar from 'components/MyNavBar/index.jsx';
import SpinnersForLoading from 'components/SpinnersForLoading';
import PageTitle from './components/PageTitle';
import AddForm from './components/AddForm';
import { setResponce } from './actions';

export function AddCar({
  setResponce,
  state
}) {
  useInjectReducer({ key: 'aboutCars', reducer });
  useInjectSaga({ key: 'aboutCars', saga });

  const setResponseFalse = (bool) => {
    setResponce(bool)
  }

  return(
    <>
     <div className="row">
        <div className="col-3">
          <MyNavBar/>
        </div>
        <div className="col-9">
            {state.responce === false ? (
              <>
                <PageTitle
                  textInTitle='Заповніть форму, щоб зберегти свій автомобіль'
                />
                <AddForm/>
              </>
            ) : (
              state.loading === true ? (
                <SpinnersForLoading/>
              ) : (
              <PageTitle
                textInTitle='Ваш автомобіль було успішно додано ✔️'
                textInButton=' + Додати ще авто'
                setResponseFalse={setResponseFalse}
              />
              )
            )}
        </div>
      </div>
    </>
  )
}

AddCar.propTypes = {
  state: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  setResponce: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  state: makeSelectAboutCars(),
});

function mapDispatchToProps(dispatch) {
  return {
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
)(AddCar);
