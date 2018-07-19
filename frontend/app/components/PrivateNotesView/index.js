/**
 *
 * NotesView
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import SingleNote from 'components/SingleNote';
import { FormGroup, Label, Input } from 'reactstrap';

const HandleNoteStatus = (props) =>
  (<div>
    <FormGroup check>
      <Label check>
        <Input type="checkbox" checked={props.current} onChange={props.handler}/>{' '}
        Public <small>(can be seen by anyone)</small>
      </Label>
    </FormGroup>
  </div>)


/* eslint-disable react/prefer-stateless-function */
class NotesView extends React.PureComponent {

  render() {
    const notes = this.props.notes.map(
      note => {
        const handler = note.public? this.props.onNoteMakePrivate(note.id) : this.props.onNoteMakePublic(note.id);
        return (<SingleNote key={note.id} id={note.id}
                    title={note.title} body={note.body} image={note.image} when={note.humanize_created_at}
                    sideComponent={<HandleNoteStatus current={note.public} handler={handler}/>}/>)
      }
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
