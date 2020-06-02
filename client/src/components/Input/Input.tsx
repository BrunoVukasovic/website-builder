import React from 'react';
import cx from 'classnames';

import { TextField } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField';
import { WrappedFieldMetaProps, WrappedFieldInputProps } from 'redux-form';

import styles from './input.module.scss';

export interface InputProps extends Omit<TextFieldProps, 'label'> {
  input?: WrappedFieldInputProps;
  meta?: WrappedFieldMetaProps;
  label?: string;
  readOnly?: boolean;
}

const Input: React.FC<InputProps> = ({
  className,
  InputProps: MUIInputProps,
  label,
  FormHelperTextProps,
  error,
  helperText,
  variant = 'outlined',
  children,
  readOnly,
  input,
  meta,
  ...props
}) => {
  return (
    <TextField
      className={cx(styles.container, className)}
      label={label}
      margin="normal"
      variant={variant as 'outlined'}
      InputProps={{ ...MUIInputProps, ...input, readOnly }}
      error={Boolean(meta && meta.error && meta.touched) ? true : error}
      helperText={Boolean(meta && meta.error && meta.touched) ? meta && meta.error : helperText}
      FormHelperTextProps={{ ...FormHelperTextProps, className: styles.helperText }}
      {...props}
    >
      {children}
    </TextField>
  );
};

export default Input;
