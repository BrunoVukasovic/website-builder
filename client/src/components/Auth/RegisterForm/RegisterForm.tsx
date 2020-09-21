import React from 'react';

import { useSnackbar } from 'notistack';
import { Button } from '@material-ui/core';
import { reduxForm, Form, Field, InjectedFormProps, SubmissionError } from 'redux-form';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Flex from '../../Flex';
import Input from '../../Input/Input';
import Validator from '../../../utils/validation';
import UserService from '../../../services/UserService';

import { RegisterFormValues } from '../../../redux/models';
import { useAuth } from '../../../utils/AuthContext';

import styles from './register.module.scss';

export interface RegisterProps {
  onGoBackClick: () => void;
  shouldRedirect?: boolean;
  className?: string;
}

type WithInjectedFormProps = InjectedFormProps<RegisterFormValues, RegisterProps> & RegisterProps;

const RegisterForm: React.FC<WithInjectedFormProps> = ({ handleSubmit, onGoBackClick, shouldRedirect, className }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { logIn } = useAuth();
  const { t } = useTranslation();
  const history = useHistory();

  const onSubmit = React.useCallback(
    async ({ name, email, password }: RegisterFormValues) => {
      try {
        const payload = {
          name,
          email,
          password,
        };
        const user = await UserService.register(payload);

        logIn(user);
        enqueueSnackbar('Registration successful!', { variant: 'success' });

        if (shouldRedirect) {
          history.push(user.allSites.length > 0 ? `/edit/${user.allSites[0].slug}` : '/edit/new-website');
        }
      } catch (error) {
        if (error.response && error.response.status === 409) {
          throw new SubmissionError({ email: `${error.response.data}` });
        } else {
          enqueueSnackbar('Something went wrong. Please, try again.', { variant: 'error' });
        }
      }
    },
    [enqueueSnackbar, logIn, history, shouldRedirect]
  );

  return (
    <Flex direction="column" className={className}>
      <h2>{`${t('Register')}:`}</h2>
      <Form<RegisterFormValues> onSubmit={handleSubmit(onSubmit)} className={styles.editFormWrapper}>
        <Flex direction="column" alignItems="flex-start">
          <Field
            name="name"
            type="text"
            component={Input}
            label={t('Your name')}
            validate={[Validator.required]}
            className={styles.input}
          />
          <Field
            name="email"
            type="text"
            component={Input}
            label={t('Email address')}
            validate={[Validator.required, Validator.validEmail]}
            className={styles.input}
          />
          <Field
            name="password"
            type="password"
            component={Input}
            label={t('Password')}
            validate={[Validator.required]}
            className={styles.input}
          />
          <Flex className={styles.buttonContainer} justifyContent="space-between" fluid>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              classes={{ root: styles.cancelBtn }}
              onClick={onGoBackClick}
            >
              {t('Go back')}
            </Button>
            <Button type="submit" variant="contained" color="primary" size="large">
              {t('Submit')}
            </Button>
          </Flex>
        </Flex>
      </Form>
    </Flex>
  );
};

export default reduxForm<RegisterFormValues, RegisterProps>({ form: 'registerForm' })(
  RegisterForm
) as React.ComponentType<RegisterProps>;
