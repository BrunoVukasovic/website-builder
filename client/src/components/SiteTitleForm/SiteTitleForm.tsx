import React from 'react';
import cx from 'classnames';

import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { reduxForm, Form, Field, InjectedFormProps, change, SubmissionError } from 'redux-form';
import { useTranslation } from 'react-i18next';

import Flex from '../../components/Flex';
import Input from '../../components/Input/Input';
import Validator from '../../utils/validation';
import SiteService from '../../services/SiteService';

import { SiteTitleFormValues } from '../../redux/models';
import { updateTitleAndSlug } from '../../redux/actions/site';

import styles from './site_title_form.module.scss';

export interface SiteTitleFormProps {
  onCancelClick: () => void;
  currentSlug: string;
  submitButtonText: string;
  initialValues?: { title: string; url: string };
  className?: string;
}

type WithInjectedFormProps = InjectedFormProps<SiteTitleFormValues, SiteTitleFormProps> & SiteTitleFormProps;

const SiteTitleForm: React.FC<WithInjectedFormProps> = ({
  handleSubmit,
  onCancelClick,
  currentSlug,
  submitButtonText,
  className,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
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

        if (slug === 'new-website' || slug === 'edit') {
          throw new Error('keyword');
        }

        if (currentSlug === 'new-website') {
          await SiteService.create(title, slug);
          dispatch(updateTitleAndSlug({ title, slug }));
        } else {
          await SiteService.renameSite(currentSlug, { title, slug });
          dispatch(updateTitleAndSlug({ title, slug }));
          enqueueSnackbar(t('Website renamed successfully'), { variant: 'success' });
          history.push(`/edit/${slug}`);
        }
      } catch (error) {
        if ((error.response && error.response.status === 409) || error.message === 'keyword') {
          throw new SubmissionError({ title: t('Error.Title already exist') });
        } else {
          enqueueSnackbar(t('Error.Something went wrong'), { variant: 'error' });
        }
      }
    },
    [dispatch, enqueueSnackbar, currentSlug, history, t]
  );

  return (
    <Flex direction="column" className={cx(styles.siteTitleFormWrapper, className)}>
      <h2 className={styles.heading}>{t('Choose a title for your site')}</h2>
      <p>{t('Link will be generated based on the title')}</p>
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
              {t('Cancel')}
            </Button>
            <Button type="submit" variant="contained" color="primary">
              {t(submitButtonText)}
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
