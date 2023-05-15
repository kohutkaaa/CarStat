import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAboutCars from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getCarById } from './actions';

import MyNavBar from 'components/MyNavBar/index.jsx';
import Spiners from 'components/Spiners';
import TitlePage from 'components/TitlePage';
import AddForm from './components/AddForm';

export function EditCar({
  state,
  getCarById
}) {
  useInjectReducer({ key: 'aboutCars', reducer });
  useInjectSaga({ key: 'aboutCars', saga });

  useEffect(() => {
    getCarById(state.idCar)
  }, [])


  return(
    <>
     <div className="row">
        <div className="col-3">
          <MyNavBar/>
        </div>
        <div className="col-9">
        {state.loading === true ? (
            <Spiners/>
          ) : (
              <>
                <TitlePage
                  titleText='Заповніть форму, щоб редагувати свій автомобіль'
                />
                <AddForm
                  editTrue={true}
                />
              </>
          )}
        </div>
      </div>
    </>
  )
}


EditCar.propTypes = {
  state: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  getCarById: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  state: makeSelectAboutCars(),
});

function mapDispatchToProps(dispatch) {
  return {
    getCarById: (id) => { dispatch(getCarById(id)) },
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
