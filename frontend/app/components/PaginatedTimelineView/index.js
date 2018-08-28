/**
 *
 * NotesView
 *
 */

import React from 'react';
import { Row, Col } from 'reactstrap';

// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import SingleNote from 'components/SingleNote';
import VoteForm from 'components/VoteForm';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */

const ByUser = (props) => <Row>
  <Col md="6"><VoteForm
    upvotes={props.votes.upvotes} downvotes={props.votes.downvotes}
    upvoteHandler={props.upvoteHandler} downvoteHandler={props.downvoteHandler}/></Col>
  <Col md="6"><span>By: {props.name}</span></Col>
</Row>;

class PaginatedTimelineView extends React.Component {

  constructor(props) {
    super(props)
    this.fetchPaginatedNotesHandler = props.fetchPaginatedNotesHandler.bind(this)
    this.handleOnScroll = this.handleOnScroll.bind(this)
  }

  componentDidMount(){
    window.addEventListener('scroll', this.handleOnScroll);
  }

  componentWillUnmount(){
     window.removeEventListener('scroll', this.handleOnScroll);
  }

  handleOnScroll(){
    let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    let scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    let clientHeight = document.documentElement.clientHeight || window.innerHeight;
    let scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (scrolledToBottom) {
      this.fetchPaginatedNotesHandler(this.props.timeline.next_link);
    }
  }

  render() {
    const notes = this.props.timeline.notes.map(
      note =>
        <SingleNote key={note.id} id={note.id}
                    title={note.title} body={note.body} image={note.image} when={note.humanize_created_at} tags={note.tags}
                    votes={note.votes} name={note.owner}
                     />
    )
    // notes.reverse()
    return (
      <div>
        {notes}
      </div>
    );
  }
}

PaginatedTimelineView.propTypes = {};

export default PaginatedTimelineView;
