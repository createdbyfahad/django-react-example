/**
 *
 * NotesView
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import SingleNote from 'components/SingleNote';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */

const ByUser = (props) => <span>By: {props.name}</span>

class NotesView extends React.PureComponent {

  render() {
    const notes = this.props.notes.map(
      note =>
        <SingleNote key={note.id} id={note.id}
                    title={note.title} body={note.body} image={note.image} when={note.when_created}
                    sideComponent={<ByUser name={note.owner}/>} />
    )
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
