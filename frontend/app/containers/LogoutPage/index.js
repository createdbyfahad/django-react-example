/**
 *
 * LogoutPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {LOGOUT_PROCESS} from "../LoginPage/constants";

function LogoutPage(props) {
  props.dispatch({type: LOGOUT_PROCESS});
  return <div />;
}

LogoutPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(LogoutPage);
