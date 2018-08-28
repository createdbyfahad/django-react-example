/**
 *
 * Timeline
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectTimeline from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {TIMELINE_FETCH_PROCESS, UPVOTE_PROCESS, DOWNVOTE_PROCESS, PAGINATED_TIMELINE_FETCH_PROCESS} from './constants';
import NotesView from "components/NotesView";
import PaginatedTimelineView from "components/PaginatedTimelineView";


/* eslint-disable react/prefer-stateless-function */
export class Timeline extends React.Component {

  componentDidMount(){
    //  fetch notes
    // this.props.fetchTimeline();
    if(this.props.timeline.notes !== undefined && this.props.timeline.notes.length === 0) this.props.fetchPaginatedTimeline()
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Timeline</title>
          <meta name="description" content="Description of Timeline" />
        </Helmet>
        <h2>Notes Timeline</h2>
        <p>Users can make any of their notes public, and it will be shown in the home page to all visitors.</p>
        {/*<NotesView notes={this.props.timeline.notes}*/}
                   {/*onNoteUpVote={this.props.onNoteUpVote}*/}
                   {/*onNoteDownVote={this.props.onNoteDownVote}/>*/}
         <PaginatedTimelineView timeline={this.props.timeline}
                            fetchPaginatedNotesHandler={this.props.fetchPaginatedTimeline}
                            onNoteUpVote={this.props.onNoteUpVote}
                            onNoteDownVote={this.props.onNoteDownVote}>

         </PaginatedTimelineView>
      </div>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  timeline: makeSelectTimeline(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchTimeline: () => dispatch({
      type: TIMELINE_FETCH_PROCESS,
    }),
    fetchPaginatedTimeline: (next_id) => dispatch({
      type: PAGINATED_TIMELINE_FETCH_PROCESS,
      next_id: next_id,
    }),
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
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'timeline', reducer });
const withSaga = injectSaga({ key: 'timeline', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Timeline);
