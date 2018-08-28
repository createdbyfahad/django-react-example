/**
 *
 * SingleNote
 *
 */

import React from 'react';
import {Card, CardTitle, CardBody, Button, CardText, CardSubtitle, CardImg, CardFooter, Row } from 'reactstrap';
import { connect } from 'react-redux';

import { push } from 'react-router-redux';

// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

const SingleNote = (props) => {
  const image = (props.image != null?
    <CardImg top width="100%" src={props.image} /> : []);
  const sideComponent = (props.sideComponent?
    <CardFooter>{props.sideComponent}</CardFooter> : []);
  const tags = props.tags.map((tag) => {
    return <span key={tag}><a onClick={() => (props.dispatch(push("/tags/" + tag)))}>{tag}</a>, </span>
  });


  return (
    <div>
      <Card>
        {image}
        <CardBody>
          <CardTitle>{props.id}. </CardTitle>
          <CardSubtitle>{props.title}</CardSubtitle>
          <CardText>
            {props.body}<br />
            <small>({props.when})</small><br />
            {tags.length > 0 && <b>tags: </b>}{tags}
          </CardText>
        </CardBody>
        {sideComponent}
      </Card>
      <br />
    </div>
  )
}

SingleNote.propTypes = {};

export default connect()(SingleNote);
