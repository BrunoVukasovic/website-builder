import React from 'react';

import { useSnackbar } from 'notistack';
import { Button } from '@material-ui/core';
import { reduxForm, Form, Field, InjectedFormProps, SubmissionError } from 'redux-form';
import { useTranslation } from 'react-i18next';

import Flex from '../../Flex';
import Input from '../../Input/Input';
import Validator from '../../../utils/validation';
import UserService from '../../../services/UserService';

import { LoginFormValues } from '../../../redux/models';
import { useAuth } from '../../../utils/AuthContext';

import styles from './login.module.scss';

export interface LoginFormProps {
  onRegisterClick: () => void;
}

type WithInjectedFormProps = InjectedFormProps<LoginFormValues, LoginFormProps> & LoginFormProps;

const LoginForm: React.FC<WithInjectedFormProps> = ({ handleSubmit, error, onRegisterClick }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { logIn } = useAuth();
  const { t } = useTranslation();

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
      } catch (error) {
        if (error.response) {
          throw new SubmissionError({ _error: `Wrong email or password` });
        } else {
          enqueueSnackbar('Something went wrong. Please, try again.', { variant: 'error' });
        }
      }
    },
    [enqueueSnackbar]
  );

  return (
    <Flex direction="column">
      <h2>{`${t('Login')}:`}</h2>
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

export default reduxForm<LoginFormValues, LoginFormProps>({ form: 'loginForm' })(LoginForm) as React.ComponentType<
  LoginFormProps
>;
