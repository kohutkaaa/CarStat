import React from 'react';
import { Switch, Route } from 'react-router-dom';

import {AdminPage} from '../AdminPage/Loadable';
import {
  AboutCars,
  AddCar,
  EditCar
} from '../AboutCars/Loadable';

import GlobalStyle from '../../global-styles';

export default function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={AdminPage} />
        <Route exact path="/about_cars" component={AboutCars} />
        <Route exact path="/add_car" component={AddCar} />
        <Route exact path="/edit_car/:id" component={EditCar} />
      </Switch>
      <GlobalStyle />
    </>
  );
}
