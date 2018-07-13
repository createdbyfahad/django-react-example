/**
 *
 * LoginForm
 *
 */

import React from 'react';

import TextInput from 'components/TextInput';
import {Alert, Button, Form} from 'reactstrap';

// import PropTypes from 'prop-types';
// import styled from 'styled-components';


/* eslint-disable react/prefer-stateless-function */
class LoginForm extends React.Component {

  state = {
    username: '',
    password: '',
  };

  handleInputChange = (event) => {
    const target = event.target,
      value = target.type ===
      'checkbox' ? target.checked : target.value,
      name = target.name
    this.setState({
      [name]: value
    });
  }
  onSubmit = (e) => {
    if (e !== undefined && e.preventDefault) e.preventDefault();
    this.props.onSubmit(this.state.username, this.state.password);
  }

  render() {
    const errors = this.props.errors || {}

    return (
      <div>
        <Form onSubmit={this.onSubmit}>
          {
            errors.non_field_errors ?
              <Alert color="danger">
                {errors.non_field_errors}
              </Alert> : ""
          }
          <TextInput label="Username" type="text" name="username"
                     id="UsernameField" placeholder="Enter Username" error={errors.username} onChange={this.handleInputChange}/>
          <TextInput label="Password" type="password" name="password"
                     id="PasswordField" placeholder="Enter Password" error={errors.password} onChange={this.handleInputChange}/>
          <Button color="primary">Login</Button>
        </Form>
      </div>
    );
  }
}

LoginForm.propTypes = {};

export default LoginForm;
