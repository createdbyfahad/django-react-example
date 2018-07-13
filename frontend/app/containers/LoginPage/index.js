/**
 *
 * LoginPage
 *
 */

import React from 'react';
import {connect} from 'react-redux';
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';
import {createStructuredSelector} from 'reselect';
import {compose} from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectLoginPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import LoginForm from 'components/LoginForm';
import {LOGIN_PROCESS} from "./constants";

/* eslint-disable react/prefer-stateless-function */
export class LoginPage extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>LoginPage</title>
          <meta name="description" content="Description of LoginPage"/>
        </Helmet>
        <h3>Login page (<Link to="/register">Register</Link>)</h3>
        <LoginForm onSubmit={this.props.onSubmitLogin} errors={this.props.loginpage.errors}/>
      </div>
    );
  }
}

// LoginPage.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

const mapStateToProps = createStructuredSelector({
  loginpage: makeSelectLoginPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmitLogin: (username, password) => {
      console.log(username, password);
      // dispatch(handleLogin(username, password));
      dispatch({
        type: LOGIN_PROCESS,
        username: username,
        password: password,
      });
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({key: 'loginPage', reducer});
const withSaga = injectSaga({key: 'loginPage', saga});

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(LoginPage);
