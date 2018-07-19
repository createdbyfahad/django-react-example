/**
 *
 * VoteForm
 *
 */

import React from 'react';
import { Row, Col } from 'reactstrap';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class VoteForm extends React.Component {
  render() {
    return (
      <Row><Col md="6">
        <span onClick={this.props.upvoteHandler}>up: {this.props.upvotes}</span>
      </Col>
      <Col md="6">
        <span onClick={this.props.downvoteHandler}>down: {this.props.downvotes}</span>
      </Col></Row>
    );
  }
}

VoteForm.propTypes = {};

export default VoteForm;
