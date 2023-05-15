import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAboutCarsDomain = state => state.aboutCars || initialState;

const makeSelectAboutCars = () =>
  createSelector(
    selectAboutCarsDomain,
    substate => substate,
  );

const selectIdCar = () =>
  createSelector(
    selectAboutCarsDomain,
    substate => substate.idCar
  )

const selectNewCar = () =>
  createSelector(
    selectAboutCarsDomain,
    substate => substate.newCar,
  );

const selectEditCar = () =>
  createSelector(
    selectAboutCarsDomain,
    substate => substate.editCarPut,
  );

export default makeSelectAboutCars;
export { 
  selectAboutCarsDomain,
  selectNewCar,
  selectEditCar,
  selectIdCar
 };
