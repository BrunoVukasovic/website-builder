import React, { useState } from 'react';

import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { reduxForm, Form, Field, InjectedFormProps, change, SubmissionError } from 'redux-form';

import Flex from '../Flex';
import Input from '../Input/Input';
import Validator from '../../utils/validation';
import SiteService from '../../services/SiteService';
import Login from '../Auth/Login/Login';
import Register from '../Auth/Register/Register';

import { CreateSiteFormValues } from '../../redux/models';
import { updateTitleAndSlug } from '../../redux/actions/site';
import { useAuth } from '../../utils/AuthContext';

import styles from './create_site.module.scss';

export interface CreateSiteProps {
  onCancelClick: () => void;
}

type WithInjectedFormProps = InjectedFormProps<CreateSiteFormValues, CreateSiteProps> & CreateSiteProps;

const CreateSite: React.FC<WithInjectedFormProps> = ({ handleSubmit, onCancelClick }) => {
  const dispatch = useDispatch();
  const { isAuth } = useAuth();
  const [authModal, setAuthModal] = useState<'Login' | 'Register' | undefined>(undefined);
  const { enqueueSnackbar } = useSnackbar();
  // @TODO if !auth return <Login />
  const origin = React.useMemo(() => window.location.origin, []);

  const handleTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const slug = e.currentTarget.value.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    dispatch(change('createSiteForm', 'url', `${origin}/${slug}`));
  };

  const onSubmit = React.useCallback(
    async ({ title, url }: CreateSiteFormValues) => {
      try {
        const slug = url.slice(url.lastIndexOf('/') + 1);
        await SiteService.create(title, slug);
        dispatch(updateTitleAndSlug({ title, slug }));
      } catch (error) {
        if (error.response && error.response.status === 400) {
          throw new SubmissionError({ title: `${error.response.data}` });
        } else {
          enqueueSnackbar('Something went wrong. Please, try again.', { variant: 'error' });
        }
      }
    },
    [dispatch, enqueueSnackbar]
  );

  const openLoginForm = () => {
    setAuthModal('Login');
  };

  const openRegisterForm = () => {
    setAuthModal('Register');
  };

  if (!isAuth) {
    if (authModal === 'Register') {
      return <Register onGoBackClick={openLoginForm} />;
    }
    return <Login onRegisterClick={openRegisterForm} />;
  }

  return (
    <Flex direction="column">
      <h2 className={styles.heading}>Choose a title for your site</h2>
      <p>Link will be generated based on the title</p>
      <Form<CreateSiteFormValues> onSubmit={handleSubmit(onSubmit)} className={styles.editFormWrapper}>
        <Flex direction="column" alignItems="flex-start">
          <Field
            name="title"
            type="text"
            component={Input}
            onChange={handleTitleChange}
            label="Title"
            validate={[Validator.required]}
            autoFocus
            className={styles.input}
          />
          <Field name="url" type="text" component={Input} label="Link" className={styles.input} readOnly />
          <Flex className={styles.buttonContainer}>
            <Button variant="outlined" color="primary" classes={{ root: styles.cancelBtn }} onClick={onCancelClick}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Create site
            </Button>
          </Flex>
        </Flex>
      </Form>
    </Flex>
  );
};

export default reduxForm<CreateSiteFormValues, CreateSiteProps>({ form: 'createSiteForm' })(
  CreateSite
) as React.ComponentType<CreateSiteProps>;
