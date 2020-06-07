import React from 'react';

import { useSnackbar } from 'notistack';
import { Button } from '@material-ui/core';
import { reduxForm, Form, Field, InjectedFormProps, SubmissionError } from 'redux-form';

import Flex from '../../Flex';
import Input from '../../Input/Input';
import Validator from '../../../utils/validation';
import UserService from '../../../services/UserService';

import { LoginFormValues } from '../../../redux/models';
import { useAuth } from '../../../utils/AuthContext';

import styles from './login.module.scss';

export interface LoginProps {
  onRegisterClick: () => void;
  closeModal?: () => void;
}
type WithInjectedFormProps = InjectedFormProps<LoginFormValues, LoginProps> & LoginProps;

const Login: React.FC<WithInjectedFormProps> = ({ handleSubmit, error, onRegisterClick, closeModal }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { logIn } = useAuth();

  const onSubmit = React.useCallback(
    async ({ email, password }: LoginFormValues) => {
      try {
        const payload = {
          email,
          password,
        };
        const user = await UserService.login(payload);
        logIn(user);
        enqueueSnackbar('Authentication successful!', { variant: 'success' });

        if (closeModal) {
          closeModal();
        }
      } catch (error) {
        if (error.response) {
          throw new SubmissionError({ _error: `Wrong email or password` });
        } else {
          enqueueSnackbar('Something went wrong. Please, try again.', { variant: 'error' });
        }
      }
    },
    [enqueueSnackbar, closeModal]
  );

  return (
    <Flex direction="column">
      <Form<LoginFormValues> onSubmit={handleSubmit(onSubmit)} className={styles.editFormWrapper}>
        <Flex direction="column" alignItems="flex-start">
          <Field
            name="email"
            type="text"
            component={Input}
            label="Email address"
            validate={[Validator.required, Validator.validEmail]}
            error={error}
            className={styles.input}
          />
          <Field
            name="password"
            type="text"
            component={Input}
            label="Password"
            validate={[Validator.required]}
            error={error}
            className={styles.input}
          />
          {error && <p className={styles.errorMessage}>{error}</p>}
          <Flex className={styles.buttonContainer} fluid>
            <Button type="submit" variant="contained" color="primary" size="large" className={styles.submitBtn}>
              Login
            </Button>
          </Flex>
        </Flex>
      </Form>
      <Flex direction="column" className={styles.registerWrapper}>
        <h2>First time here?</h2>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          classes={{ root: styles.registerBtn }}
          onClick={onRegisterClick}
        >
          Register
        </Button>
      </Flex>
    </Flex>
  );
};

export default reduxForm<LoginFormValues, LoginProps>({ form: 'loginForm' })(Login) as React.ComponentType<LoginProps>;
