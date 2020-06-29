// @deprecated

import React, { useState, useCallback } from 'react';
import CloudDoneIcon from '@material-ui/icons/CloudDone';

import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { reduxForm, Form, Field, InjectedFormProps, change, SubmissionError } from 'redux-form';

import Auth from '../Auth';
import Flex from '../Flex';
import Input from '../Input/Input';
import Validator from '../../utils/validation';
import SiteService from '../../services/SiteService';

import { SiteTitleFormValues } from '../../redux/models';
import { updateTitleAndSlug } from '../../redux/actions/site';
import { useAuth } from '../../utils/AuthContext';

import styles from './create_site.module.scss';
import { selectCurrentSite } from '../../redux/selectors/site';
import { Redirect } from 'react-router-dom';

export interface CreateSiteProps {
  changeCurrentSlug: (slug: string) => void;
  onCancelClick: () => void;
  closeModal?: () => void;
}

type WithInjectedFormProps = InjectedFormProps<SiteTitleFormValues, CreateSiteProps> & CreateSiteProps;

const CreateSite: React.FC<WithInjectedFormProps> = ({
  handleSubmit,
  onCancelClick,
  closeModal,
  changeCurrentSlug,
}) => {
  const currentSite = useSelector(selectCurrentSite);
  const [isSiteCreated, setIsSiteCreated] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { isAuth } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const origin = React.useMemo(() => window.location.origin, []);

  const handleCopyToClipboardClick = useCallback(() => {
    const siteURLInput = document.getElementById('siteURL') as HTMLInputElement;
    siteURLInput.select();
    document.execCommand('copy');
    enqueueSnackbar('URL copied to clipboard!', { variant: 'success' });
  }, [enqueueSnackbar]);

  const handleTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const slug = e.currentTarget.value.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    dispatch(change('createSiteForm', 'url', `${origin}/${slug}`));
  };

  const onSubmit = React.useCallback(
    async ({ title, url }: SiteTitleFormValues) => {
      try {
        const slug = url.slice(url.lastIndexOf('/') + 1);
        await SiteService.create(title, slug);
        enqueueSnackbar('Website created successfully.', { variant: 'success' });
        changeCurrentSlug(slug);

        // setIsSiteCreated(true);
        // dispatch(updateTitleAndSlug({ title, slug }));

        //@ts-ignore
        // window.wbbvWebsiteCreatedSuccessfully = 'Some message';
        // window.open(`${window.location.origin}/edit/${slug}`, '_self');
        // if (closeModal) closeModal();
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

  if (!isAuth) {
    return <Auth closeModal={closeModal} />;
  }

  // if (isSiteCreated) {
  //   return (
  //     <Flex direction="column">
  //       <CloudDoneIcon color="primary" className={styles.successIcon} />
  //       <h2>Congratulations! You created new website!</h2>
  //       <p>Anyone can view site by typing link bellow in the browser, but only you can make changes.</p>
  //       <Input id="siteURL" readOnly value={`${origin}/${currentSite.slug}`} />
  //       <Flex className={styles.buttonContainer}>
  //         <Button
  //           size="large"
  //           variant="outlined"
  //           color="primary"
  //           onClick={handleCopyToClipboardClick}
  //           classes={{ root: styles.cancelBtn }}
  //         >
  //           Copy Link
  //         </Button>
  //         <Button size="large" type="submit" variant="contained" color="primary" onClick={closeModal}>
  //           Close
  //         </Button>
  //       </Flex>
  //     </Flex>
  //   );
  // }

  return (
    <Flex direction="column">
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

export default reduxForm<SiteTitleFormValues, CreateSiteProps>({ form: 'createSiteForm' })(
  CreateSite
) as React.ComponentType<CreateSiteProps>;
