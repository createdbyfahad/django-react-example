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
import {TAG_TIMELINE_FETCH_PROCESS} from "../TagTimeline/constants";
import PopularTags from "containers/PopularTags/Loadable";


/* eslint-disable react/prefer-stateless-function */
export class Timeline extends React.Component {

  componentDidMount() {
    //  fetch notes
    // this.props.fetchTimeline();
    // if(this.props.timeline.notes !== undefined && this.props.timeline.notes.length === 0) this.props.fetchPaginatedTimeline()
    this.props.fetchPaginatedTimeline(undefined, true)
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
        <div>
          <h4>Popular tags</h4>
          <PopularTags />
          <br />
        </div>
        {/*<NotesView notes={this.props.timeline.notes}*/}
                   {/*onNoteUpVote={this.props.onNoteUpVote}*/}
                   {/*onNoteDownVote={this.props.onNoteDownVote}/>*/}
         <PaginatedTimelineView timeline={this.props.timeline}
                            fetchPaginatedNotesHandler={this.props.fetchPaginatedTimeline}
                            >

         </PaginatedTimelineView>
      </div>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  timeline: makeSelectTimeline(),
});

function mapDispatchToProps(dispatch, ownProps) {
  return {
    fetchPaginatedTimeline: (next_link, isInitial = false) => {
      if(next_link === null || next_link === undefined && isInitial === false) return;
      return dispatch({
        type: PAGINATED_TIMELINE_FETCH_PROCESS,
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

const withReducer = injectReducer({ key: 'timeline', reducer });
const withSaga = injectSaga({ key: 'timeline', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Timeline);
