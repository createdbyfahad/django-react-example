import React from 'react';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';

import TagsSelector from 'components/TagsSelector';


export default ({ tags, handleSelectedTags, error, ...rest }) => {
  return (
    <FormGroup color={error ? 'danger' : ''}>
      <Label>Tags</Label>
      <TagsSelector tags={tags} handleSelectedTags={handleSelectedTags} />
      {error ? (
        <b color={'red'}>{error}</b>
      ) : (
        ''
      )}
    </FormGroup>
  );
};
