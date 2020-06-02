import React, { useState } from 'react';

import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { reduxForm, Form, Field, InjectedFormProps, change } from 'redux-form';

import Flex from '../Flex';
import Input from '../Input/Input';
import Validator from '../../utils/validation';
import SiteService from '../../services/SiteService';

import { CreateSiteFormValues } from '../../redux/models';
import { updateTitleAndSlug } from '../../redux/actions/site';

import styles from './create_site.module.scss';

type CreateSiteFormProps = InjectedFormProps<CreateSiteFormValues>;

const CreateSite: React.FC<CreateSiteFormProps> = ({ handleSubmit }) => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const origin = React.useMemo(() => window.location.origin, []);

  const handleTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const slug = e.currentTarget.value.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    dispatch(change('createSiteForm', 'url', `${origin}/${slug}`));

    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const onSubmit = React.useCallback(
    ({ title, url }: CreateSiteFormValues) => {
      const callApi = async () => {
        try {
          const slug = url.slice(url.lastIndexOf('/') + 1);
          await SiteService.create(title, slug);
          dispatch(updateTitleAndSlug({ title, slug }));
        } catch (error) {
          if (error.response && error.response.status === 400) {
            setErrorMessage(error.response.data);
          } else {
            enqueueSnackbar('Something went wrong. Please, try again.', { variant: 'error' });
          }
        }
      };

      callApi();
    },
    [dispatch, enqueueSnackbar]
  );

  return (
    <Flex direction="column">
      <h2 className={styles.heading}>Choose a title for your site</h2>
      <p>Link will be generated based on the title</p>
      <Form<CreateSiteFormValues> onSubmit={handleSubmit(onSubmit)} className={styles.editFormWrapper}>
        <Flex direction="column" alignItems="flex-start" className={styles.email}>
          <Field
            name="title"
            type="text"
            component={Input}
            onChange={handleTitleChange}
            label="Title"
            validate={[Validator.required]}
            error={errorMessage !== ''}
            helperText={errorMessage}
            className={styles.input}
          />
          <Field name="url" type="text" component={Input} label="Link" className={styles.input} readOnly />
          <Flex className={styles.buttonContainer}>
            <Button variant="outlined" color="primary" classes={{ root: styles.cancelBtn }}>
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

export default reduxForm<CreateSiteFormValues>({ form: 'createSiteForm' })(CreateSite);
