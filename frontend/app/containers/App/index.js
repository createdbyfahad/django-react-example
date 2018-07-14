/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Switch, Route, Link, StaticRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Timeline from 'containers/Timeline/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import LoginPage from 'containers/LoginPage';
import RegisterPage from 'containers/RegisterPage';
import LogoutPage from 'containers/LogoutPage';
import NotesPage from 'containers/NotesPage';
import {PrivateRoute, AuthRoute, ShowIfAuth} from 'containers/AuthProvider';
import Header from 'components/Header';

export default function App() {
  return (
    <div className="container">
      <h1>Personal Notes App</h1>
      <Header />
      <Switch>
        <Route exact path="/" component={Timeline} />
        <PrivateRoute path="/notes" component={NotesPage} />
        <PrivateRoute path="/logout" component={LogoutPage} />
        <AuthRoute path="/login" component={LoginPage} />
        <AuthRoute path="/register" component={RegisterPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}
