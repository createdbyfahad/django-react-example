/**
 *
 * Header
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Switch, Route, Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import {PrivateRoute, AuthRoute, ShowIfAuth, ShowIfNotAuth} from 'containers/AuthProvider';



/* eslint-disable react/prefer-stateless-function */
class Header extends React.Component {
  render() {
    return (
      <div>
        <Link to="/"><h4>Public Timeline</h4></Link>
        <ShowIfAuth component={() => <Link to="/notes"><h4>Go to My Notes</h4></Link>} />
        <ShowIfAuth component={() => <Link to="/logout"><h4>Logout</h4></Link>} />
        <ShowIfNotAuth component={() =>  <Link to="/login"><h4>Go to login</h4></Link>} />
      </div>
    );
  }
}

Header.propTypes = {};

export default Header;
