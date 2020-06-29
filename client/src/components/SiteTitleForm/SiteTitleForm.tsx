import React, { useCallback } from 'react';

import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { reduxForm, Form, Field, InjectedFormProps, change, SubmissionError } from 'redux-form';

import Flex from '../../components/Flex';
import Input from '../../components/Input/Input';
import Validator from '../../utils/validation';
import SiteService from '../../services/SiteService';

import { SiteTitleFormValues } from '../../redux/models';
import { updateTitleAndSlug } from '../../redux/actions/site';

import styles from './site_title_form.module.scss';

export interface SiteTitleFormProps {
  onCancelClick: () => void;
  action: 'create' | 'rename';
  currentSlug: string;
  submitButtonText: string;
  initialValues?: { title: string; url: string };
}

type WithInjectedFormProps = InjectedFormProps<SiteTitleFormValues, SiteTitleFormProps> & SiteTitleFormProps;

const SiteTitleForm: React.FC<WithInjectedFormProps> = ({
  handleSubmit,
  onCancelClick,
  action,
  currentSlug,
  submitButtonText,
}) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const origin = React.useMemo(() => window.location.origin, []);

  const handleTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const slug = e.currentTarget.value.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    dispatch(change('createSiteForm', 'url', `${origin}/${slug}`));
  };

  const onSubmit = React.useCallback(
    async ({ title, url }: SiteTitleFormValues) => {
      try {
        const slug = url.slice(url.lastIndexOf('/') + 1);

        if (currentSlug === 'new-website') {
          await SiteService.create(title, slug);
          dispatch(updateTitleAndSlug({ title, slug }));
        } else {
          await SiteService.renameSite(currentSlug, { title, slug });
          dispatch(updateTitleAndSlug({ title, slug }));
          enqueueSnackbar('Website renamed successfully!', { variant: 'success' });
          history.push(`/edit/${slug}`);
        }
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

  return (
    <Flex direction="column" className={styles.siteTitleFormWrapper}>
      <h2 className={styles.heading}>Choose a title for your site</h2>
      <p>Link will be generated based on the title</p>
      <Form<SiteTitleFormValues> onSubmit={handleSubmit(onSubmit)} className={styles.editFormWrapper}>
        <Flex direction="column" alignItems="flex-start">
          <Field
            name="title"
            type="text"
            component={Input}
            onChange={handleTitleChange}
            label="Title"
            validate={[Validator.required]}
            className={styles.input}
          />
          <Field name="url" type="text" component={Input} label="Link" className={styles.input} readOnly />
          <Flex className={styles.buttonContainer}>
            <Button variant="outlined" color="primary" classes={{ root: styles.cancelBtn }} onClick={onCancelClick}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              {submitButtonText}
            </Button>
          </Flex>
        </Flex>
      </Form>
    </Flex>
  );
};

export default reduxForm<SiteTitleFormValues, SiteTitleFormProps>({ form: 'createSiteForm' })(
  SiteTitleForm
) as React.ComponentType<SiteTitleFormProps>;
