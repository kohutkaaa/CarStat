import React from 'react';
import {BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';
import Cookies from "js-cookie";
import { isEmpty } from "lodash";

import { Auth } from '../Auth/Loadable';
import {
  AdminPage,
  PaymentsPage,
} from '../AdminPage/Loadable';
import {
  AboutCars,
  AddCar,
  EditCar
} from '../AboutCars/Loadable';
import {
  AdminStatistics,
  FuelStatistics
} from '../AdminStatistics/Loadable';

import GlobalStyle from '../../global-styles';

const PrivateRoute = ({ component, ...options }) => {
	if (isEmpty(Cookies.get("jwt"))) {
		var user = false;
	} else {
		user = true;
	}

	return user ? (
    <Route {...options} component={component} />
  ) : (
    <Redirect
      push
      to={{
        pathname: '/auth/login'
      }}
    />
  )
};

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/auth/login" component={Auth} />
          <PrivateRoute exact path="/dashboard" component={AdminPage} />
          <PrivateRoute exact path="/payments" component={PaymentsPage} />
          <PrivateRoute exact path="/about_cars" component={AboutCars} />
          <PrivateRoute exact path="/add_car" component={AddCar} />
          <PrivateRoute exact path="/edit_car/:id" component={EditCar} />
          <PrivateRoute exact path="/statistics" component={AdminStatistics} />
          <PrivateRoute exact path="/fuel" component={FuelStatistics} />
        {/* <Route component={NotFoundPage} /> */}
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
}
