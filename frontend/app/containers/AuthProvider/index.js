import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {makeSelectAuth, isAuthenticated} from './selectors';
import {createStructuredSelector} from "reselect";


const PrivateRouteComponent = ({component: Component, isAuthenticated, ...rest}) => (
  <Route {...rest} render={props => (
    isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)


const mapStateToProps = createStructuredSelector({
  isAuthenticated: isAuthenticated(),
});

export const PrivateRoute = connect(mapStateToProps, null)(PrivateRouteComponent);

const AuthRouteComponent = ({component: Component, isAuthenticated, ...rest}) => (
  <Route {...rest} render={props => (
    !isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

export const AuthRoute = connect(mapStateToProps, null)(AuthRouteComponent);

const ShowIfAuthComponent = ({component: Component, isAuthenticated, ...rest}) => (
  isAuthenticated ? (
    <Component {...rest}/>
  ) : ([])
);

export const ShowIfAuth = connect(mapStateToProps, null)(ShowIfAuthComponent);

const ShowIfNotAuthComponent = ({component: Component, isAuthenticated, ...rest}) => (
  !isAuthenticated ? (
    <Component {...rest}/>
  ) : ([])
);

export const ShowIfNotAuth = connect(mapStateToProps, null)(ShowIfNotAuthComponent);
