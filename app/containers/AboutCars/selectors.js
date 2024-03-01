import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAboutCarsDomain = state => state.aboutCars || initialState;

const makeSelectAboutCars = () =>
  createSelector(
    selectAboutCarsDomain,
    substate => substate,
  );

const selectDataNewCar = () =>
  createSelector(
    selectAboutCarsDomain,
    substate => substate.dataNewCar,
  );

const selectDataEditCar = () =>
  createSelector(
    selectAboutCarsDomain,
    substate => substate.dataEditCar,
  );

const selectDataCars = () =>
  createSelector(
    selectAboutCarsDomain,
    substate => substate.dataCars,
  );

export default makeSelectAboutCars;
export {
  selectAboutCarsDomain,
  selectDataNewCar,
  selectDataEditCar,
  selectDataCars,
};
