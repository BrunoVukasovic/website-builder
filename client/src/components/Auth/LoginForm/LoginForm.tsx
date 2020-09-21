import React from 'react';

import { useSnackbar } from 'notistack';
import { Button } from '@material-ui/core';
import { reduxForm, Form, Field, InjectedFormProps, SubmissionError } from 'redux-form';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import Flex from '../../Flex';
import Input from '../../Input/Input';
import Validator from '../../../utils/validation';
import UserService from '../../../services/UserService';

import { CurrentSiteState, LoginFormValues } from '../../../redux/models';
import { useAuth } from '../../../utils/AuthContext';

import styles from './login.module.scss';

export interface LoginFormProps {
  onRegisterClick: () => void;
  currentSite?: CurrentSiteState;
  shouldRedirect?: boolean;
  className?: string;
}

type WithInjectedFormProps = InjectedFormProps<LoginFormValues, LoginFormProps> & LoginFormProps;

const LoginForm: React.FC<WithInjectedFormProps> = ({
  handleSubmit,
  error,
  onRegisterClick,
  shouldRedirect,
  currentSite,
  className,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const { logIn } = useAuth();
  const { t } = useTranslation();
  const history = useHistory();

  const onSubmit = React.useCallback(
    async ({ email, password }: LoginFormValues) => {
      try {
        const payload = {
          email,
          password,
        };
        const user = await UserService.login(payload);
        logIn(user);
        enqueueSnackbar(t('Authentication successful'), { variant: 'success' });

        if (shouldRedirect) {
          history.push(currentSite ? `/edit/${currentSite.slug}` : '/edit/new-website');
        }
      } catch (error) {
        if (error.response) {
          throw new SubmissionError({ _error: t('Error.Wrong email or password') });
        } else {
          enqueueSnackbar(t('Error.Something went wrong'), { variant: 'error' });
        }
      }
    },
    [enqueueSnackbar, history, shouldRedirect, logIn, t, currentSite]
  );

  return (
    <Flex direction="column" className={className}>
      <h2>{`${t('Login')}:`}</h2>
      <Form<LoginFormValues> onSubmit={handleSubmit(onSubmit)} className={styles.editFormWrapper}>
        <Flex direction="column" alignItems="flex-start">
          <Field
            name="email"
            type="text"
            component={Input}
            label={t('Email address')}
            validate={[Validator.required, Validator.validEmail]}
            error={error}
            className={styles.input}
          />
          <Field
            name="password"
            type="password"
            component={Input}
            label={t('Password')}
            validate={[Validator.required]}
            error={error}
            className={styles.input}
          />
          {error && <p className={styles.errorMessage}>{error}</p>}
          <Flex className={styles.buttonContainer} fluid>
            <Button type="submit" variant="contained" color="primary" size="large" className={styles.submitBtn}>
              {t('Login')}
            </Button>
          </Flex>
        </Flex>
      </Form>
      <Flex direction="column" className={styles.registerWrapper}>
        <h2>{t('First time here')}</h2>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          classes={{ root: styles.registerBtn }}
          onClick={onRegisterClick}
        >
          {t('Register')}
        </Button>
      </Flex>
    </Flex>
  );
};

export default reduxForm<LoginFormValues, LoginFormProps>({ form: 'loginForm' })(LoginForm) as React.ComponentType<
  LoginFormProps
>;
