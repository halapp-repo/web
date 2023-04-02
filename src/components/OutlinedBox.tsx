import { styled, TextField } from '@mui/material';
import React, { ReactElement, ReactNode } from 'react';

interface Props {
  label: string;
  children: ReactNode;
  className?: string;
}

const InputComponent = ({ ...other }) => <div {...other} />;

export default function OutlinedBox({ label, children }: Props): ReactElement {
  const StyledTextField = styled(TextField)(() => ({
    '& label': {
      color: '#bfbfbf'
    },
    '& label.Mui-focused': {
      cursor: 'default',
      color: '#bfbfbf'
    },
    '& .MuiInput-underline:after': {
      borderColor: '#bfbfbf'
    },
    '& .MuiOutlinedInput-root': {
      '&': {
        cursor: 'default',
        borderColor: '#bfbfbf'
      },
      '& fieldset': {
        borderColor: '#bfbfbf'
      },
      '&:hover fieldset': {
        borderColor: '#bfbfbf'
      },
      '&.Mui-focused fieldset': {
        borderColor: '#bfbfbf'
      }
    }
  }));

  return (
    <StyledTextField
      variant="outlined"
      label={label}
      multiline
      InputLabelProps={{ shrink: true }}
      InputProps={{
        inputComponent: InputComponent
      }}
      inputProps={{ children: children }}
    />
  );
}
