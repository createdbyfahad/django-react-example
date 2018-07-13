/**
 *
 * NotesPage
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
import makeSelectNotesPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import NoteForm from 'components/NoteForm';
import {NOTE_ADD_PROCESS, NOTES_FETCH_PROCESS} from "./constants";
import {withAuth} from 'containers/AuthProvider/selectors';
import NotesView from "components/NotesView";

/* eslint-disable react/prefer-stateless-function */
export class NotesPage extends React.Component {

  componentDidMount(){
  //  fetch notes
    if(this.props.notespage.notes === undefined || this.props.notespage.notes.length == 0){
      this.props.fetchNotes();
    }
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>NotesPage</title>
          <meta name="description" content="Description of NotesPage" />
        </Helmet>
        <NoteForm onSubmit={this.props.onSubmitNote} errors={this.props.notespage.errors}/>
        <hr />
        <NotesView notes={this.props.notespage.notes} />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  notespage: makeSelectNotesPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmitNote: (title, body, image) => {
      dispatch({
        type: NOTE_ADD_PROCESS,
        title: title,
        body: body,
        image: image,
      });
    },
    fetchNotes: () => dispatch({
      type: NOTES_FETCH_PROCESS,
    }),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'notesPage', reducer });
const withSaga = injectSaga({ key: 'notesPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(NotesPage);
