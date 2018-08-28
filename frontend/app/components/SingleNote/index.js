/**
 *
 * SingleNote
 *
 */

import React from 'react';
import {Card, CardTitle, CardBody, Button, CardText, CardSubtitle, CardImg, CardFooter, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';

import { push } from 'react-router-redux';
import { Link } from 'react-router-dom'

// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import VoteForm from 'components/VoteForm'

import {
  DOWNVOTE_PROCESS,
  UPVOTE_PROCESS
} from "../../containers/TagTimeline/constants";

const ByUser = (props) => <Row>
  <Col md="6"><VoteForm
    upvotes={props.votes.upvotes} downvotes={props.votes.downvotes}
    upvoteHandler={props.upvoteHandler} downvoteHandler={props.downvoteHandler}/></Col>
  <Col md="6"><span>By: {props.name}</span></Col>
</Row>;

const SingleNote = (props) => {
  const image = (props.image != null?
    <CardImg top width="100%" src={props.image} /> : []);
  const sideComponent = (props.sideComponent?
    <CardFooter>{props.sideComponent}</CardFooter> : []);
  const tags = props.tags.map((tag) => {
    return <span key={tag}><Link to={"/tags/" + tag}>{tag}</Link>, </span>
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
        <CardFooter>
          <ByUser votes={props.votes} name={props.name}
                        upvoteHandler={props.onNoteUpVote(props.id)} downvoteHandler={props.onNoteDownVote(props.id)} />
        </CardFooter>
        {sideComponent}
      </Card>
      <br />
    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    onNoteUpVote: (note_id) => () => {
      dispatch({
        type: UPVOTE_PROCESS,
        note_id: note_id,
      });
    },
    onNoteDownVote: (note_id) => () =>{
      dispatch({
        type: DOWNVOTE_PROCESS,
        note_id: note_id,
      });
    },
    dispatch
  };
}

export default connect(null, mapDispatchToProps)(SingleNote);
