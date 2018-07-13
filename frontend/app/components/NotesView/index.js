/**
 *
 * NotesView
 *
 */

import React from 'react';
import {Card, CardTitle, CardBody, Button, CardText, CardSubtitle, CardImg } from 'reactstrap';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

const SingleNote = (props) => {
  const image = (props.image != null?
    <CardImg top width="100%" src={props.image} /> : []);

  return (
    <div>
      <Card>
        {image}
        <CardBody>
          <CardTitle>{props.id}.</CardTitle>
          <CardSubtitle>{props.title}</CardSubtitle>
          <CardText>{props.body}</CardText>
        </CardBody>
      </Card>
      <br />
    </div>
  )
}

/* eslint-disable react/prefer-stateless-function */
class NotesView extends React.PureComponent {

  render() {
    const notes = this.props.notes.map(note => <SingleNote key={note.id} id={note.id} title={note.title} body={note.body} image={note.image}/>)
    notes.reverse()
    return (
      <div>
        {notes}
      </div>
    );
  }
}

NotesView.propTypes = {};

export default NotesView;
