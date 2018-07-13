/**
 *
 * RegisterPage
 *
 */

import React from 'react';
import {connect} from 'react-redux';
import {Helmet} from 'react-helmet';
import {Link, Redirect} from 'react-router-dom';
import {push} from 'react-router-redux';
import {createStructuredSelector} from 'reselect';
import {compose} from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectRegisterPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import RegisterForm from 'components/RegisterForm';
import {REGISTER_PROCESS} from "./constants";

/* eslint-disable react/prefer-stateless-function */
export class RegisterPage extends React.Component {
  render() {
    // TODO need to find a better way for handling what happens when register is successful
    // const register_status = (this.props.registerpage.register_success)?
    //   <Redirect to='/login' /> : [];
    return (
      <div>
        <Helmet>
          <title>RegisterPage</title>
          <meta name="description" content="Description of RegisterPage"/>
        </Helmet>
        <h3>Register page (<Link to="/login">Login</Link>)</h3>
        <RegisterForm onSubmit={this.props.onSubmitRegister} errors={this.props.registerpage.errors}/>
      </div>
    );
  }
}

// RegisterPage.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

const mapStateToProps = createStructuredSelector({
  registerpage: makeSelectRegisterPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmitRegister: (fields) => {
      dispatch({
        type: REGISTER_PROCESS,
        fields: fields,
        callback: () => dispatch(push('/login')),
      });

    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({key: 'registerPage', reducer});
const withSaga = injectSaga({key: 'registerPage', saga});

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(RegisterPage);
