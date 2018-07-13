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
class RegisterForm extends React.Component {

  state = {
    username: '',
    first_name: '',
    last_name: '',
    email: '',
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
        this.props.onSubmit(this.state)
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
          <TextInput name="username" label="Username (*)"
                     error={errors.username}
                     onChange={this.handleInputChange}/>
          <TextInput name="first_name" label="First Name"
                     error={errors.first_name}
                     onChange={this.handleInputChange}/>
          <TextInput name="last_name" label="Last Name"
                     error={errors.last_name}
                     onChange={this.handleInputChange}/>
          <TextInput name="email" label="Email"
                     error={errors.email}
                     onChange={this.handleInputChange} type="email"/>
          <TextInput name="password" label="Password (*)"
                     error={errors.password} type="password"
                     onChange={this.handleInputChange}/>
          <Button type="submit" color="primary" size="lg">
            Register
          </Button>
        </Form>
      </div>
    );
  }
}

RegisterForm.propTypes = {};

export default RegisterForm;
