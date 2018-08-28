/**
 *
 * NoteVoteWidget
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectNoteVoteWidget from './selectors';
import reducer from './reducer';
import saga from './saga';
import Col from "reactstrap/src/Col";
import Row from "reactstrap/src/Row";
import {UPVOTE_PROCESS, DOWNVOTE_PROCESS} from './constants';

/* eslint-disable react/prefer-stateless-function */
export class NoteVoteWidget extends React.Component {
  render() {
    return <Row><Col md="6">
        <span onClick={this.props.upvoteHandler}>up: {this.props.upvotes}</span>
      </Col>
      <Col md="6">
        <span onClick={this.props.downvoteHandler}>down: {this.props.downvotes}</span>
      </Col></Row>;
  }
}

NoteVoteWidget.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    onNoteUpVote: (note_id) => {
      dispatch({
        type: UPVOTE_PROCESS,
        note_id: note_id,
      });
    },
    onNoteDownVote: (note_id) =>{
      dispatch({
        type: DOWNVOTE_PROCESS,
        note_id: note_id,
      });
    },
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'noteVoteWidget', reducer });
const withSaga = injectSaga({ key: 'noteVoteWidget', saga });

export default compose(
  withSaga,
  withConnect,
)(NoteVoteWidget);
