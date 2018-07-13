import React from 'react';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';

export default ({ name, label, error, type, ...rest }) => {
  const id = `id_${name}`,
    input_type = type || 'text';
  return (
    <FormGroup color={error ? 'danger' : ''}>
      {label ? <Label htmlFor={id}>{label}</Label> : ''}
      <Input
        type={input_type}
        name={name}
        id={id}
        className={error ? 'is-invalid' : ''}
        {...rest}
      />
      {error ? (
        <FormFeedback className="invalid-feedback">{error}</FormFeedback>
      ) : (
        ''
      )}
    </FormGroup>
  );
};
