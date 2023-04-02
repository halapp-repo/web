import { TextField, TextFieldProps } from '@mui/material';
import { FieldProps, getIn } from 'formik';
import React from 'react';

export const AppTextField: React.FC<FieldProps & TextFieldProps> = (props) => {
  const isTouched = getIn(props.form.touched, props.field.name);
  const errorMessage = getIn(props.form.errors, props.field.name);

  const { error, helperText, field, ...rest } = props;

  return (
    <TextField
      error={error ?? Boolean(isTouched && errorMessage)}
      helperText={helperText ?? (isTouched && errorMessage ? errorMessage : undefined)}
      {...rest} // includes any Material-UI specific props
      {...field} // includes all props contributed by the Formik Field/FastField
    />
  );
};
