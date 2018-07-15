/**
 *
 * SingleNote
 *
 */

import React from 'react';
import {Card, CardTitle, CardBody, Button, CardText, CardSubtitle, CardImg, CardFooter } from 'reactstrap';

// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

const SingleNote = (props) => {
  const image = (props.image != null?
    <CardImg top width="100%" src={props.image} /> : []);
  const sideComponent = (props.sideComponent?
    <CardFooter>{props.sideComponent}</CardFooter> : []);
  return (
    <div>
      <Card>
        {image}
        <CardBody>
          <CardTitle>{props.id}. </CardTitle>
          <CardSubtitle>{props.title}</CardSubtitle>
          <CardText>
            {props.body}<br />
            <small>({props.when})</small>
          </CardText>
        </CardBody>
        {sideComponent}
      </Card>
      <br />
    </div>
  )
}

SingleNote.propTypes = {};

export default SingleNote;
