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
import makeSelectTagTimeline from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {TIMELINE_FETCH_PROCESS, UPVOTE_PROCESS, DOWNVOTE_PROCESS, PAGINATED_TIMELINE_FETCH_PROCESS, TAG_TIMELINE_FETCH_PROCESS} from './constants';
import NotesView from "components/NotesView";
import PaginatedTimelineView from "components/PaginatedTimelineView";

import {DAEMON} from 'utils/constants';

/* eslint-disable react/prefer-stateless-function */
export class TagTimeline extends React.Component {

  componentDidMount(){
    //  fetch notes
    this.props.fetchPaginatedTimeline(undefined, true)
    // if(this.props.timeline.tag_title !== this.props.match.params.title) this.props.fetchPaginatedTimeline(undefined, true)
    // if(this.props.timeline.notes !== undefined && this.props.timeline.notes.length === 0) this.props.fetchPaginatedTimeline()
  }

  render() {
    const notes_count = this.props.timeline.notes.length;
    return (
      <div>
        <Helmet>
          <title>Tag Timeline</title>
          <meta name="description" content="Description of Timeline" />
        </Helmet>
        <h2>Notes by Tag: !{this.props.timeline.tag_title}</h2>
        <p>There total {notes_count} notes.</p>
        {notes_count > 0 && <p>Last note was added <i>{this.props.timeline.notes[notes_count - 1].humanize_created_at}</i></p>}
        {/*<NotesView notes={this.props.timeline.notes}*/}
                   {/*onNoteUpVote={this.props.onNoteUpVote}*/}
                   {/*onNoteDownVote={this.props.onNoteDownVote}/>*/}
         <PaginatedTimelineView timeline={this.props.timeline}
                            fetchPaginatedNotesHandler={this.props.fetchPaginatedTimeline} />
      </div>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  timeline: makeSelectTagTimeline(),
});

function mapDispatchToProps(dispatch, ownProps) {
  return {
    fetchPaginatedTimeline: (next_link, isInitial = false) => {
      if(next_link === null || next_link === undefined && isInitial === false) return;
      return dispatch({
        type: TAG_TIMELINE_FETCH_PROCESS,
        tag_title: ownProps.match.params.title,
        next_link: next_link,
        isInitial: isInitial,
      });
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'tag_timeline', reducer });
const withSaga = injectSaga({ key: 'tag_timeline', saga, mode:DAEMON });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TagTimeline);
