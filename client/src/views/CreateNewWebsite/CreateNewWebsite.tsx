import React, { useCallback } from 'react';

import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { reduxForm, Form, Field, InjectedFormProps, change, SubmissionError } from 'redux-form';

import Auth from '../../components/Auth';
import Flex from '../../components/Flex';
import Input from '../../components/Input/Input';
import Validator from '../../utils/validation';
import SiteService from '../../services/SiteService';
import SiteContainer from '../../components/SiteContainer';
import Footer from '../../components/Footer';
import SaveChanges from '../../components/SaveChanges';

import { CreateSiteFormValues } from '../../redux/models';
import { updateTitleAndSlug } from '../../redux/actions/site';
import { useAuth } from '../../utils/AuthContext';
import { selectCurrentSite } from '../../redux/selectors/site';

import styles from './create_new_website.module.scss';

//@TODO doesn't need props, remove
export interface CreateSiteProps {
  // changeCurrentSlug?: (slug: string) => void;
  // onCancelClick?: () => void;
  // closeModal?: () => void;
}

type WithInjectedFormProps = InjectedFormProps<CreateSiteFormValues, CreateSiteProps> & CreateSiteProps;

const CreateNewWebsite: React.FC<WithInjectedFormProps> = ({ handleSubmit }) => {
  const currentSite = useSelector(selectCurrentSite);
  const dispatch = useDispatch();
  const { isAuth } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

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
        enqueueSnackbar('Website created successfully.', { variant: 'success' });

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

  const redirectToSiteConstructor = () => history.push(`/edit/${currentSite.slug}`);

  if (!isAuth) {
    return (
      <Flex direction="column" alignItems="center" maxHeight>
        <SiteContainer className={styles.siteContainer}>
          <Flex direction="column" className={styles.createSiteWrapper}>
            <Auth />
          </Flex>
        </SiteContainer>
        <Footer primaryBtnText="Back to editing" onPrimaryBtnClick={redirectToSiteConstructor} />
      </Flex>
    );
  }

  if (currentSite.slug !== 'new-website') {
    return (
      <Flex direction="column" alignItems="center" maxHeight>
        <SiteContainer className={styles.siteContainer}>
          <Flex direction="column" className={styles.createSiteWrapper}>
            <SaveChanges currentSite={currentSite} onCloseClick={redirectToSiteConstructor} />
          </Flex>
        </SiteContainer>
        <Footer primaryBtnText="Back to editing" onPrimaryBtnClick={redirectToSiteConstructor} />
      </Flex>
    );
  }

  return (
    <Flex direction="column" alignItems="center" maxHeight>
      <SiteContainer className={styles.siteContainer}>
        <Flex direction="column" className={styles.createSiteWrapper}>
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
                className={styles.input}
              />
              <Field name="url" type="text" component={Input} label="Link" className={styles.input} readOnly />
              <Flex className={styles.buttonContainer}>
                <Button
                  variant="outlined"
                  color="primary"
                  classes={{ root: styles.cancelBtn }}
                  onClick={redirectToSiteConstructor}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Create site
                </Button>
              </Flex>
            </Flex>
          </Form>
        </Flex>
      </SiteContainer>
      <Footer primaryBtnText="Back to editing" onPrimaryBtnClick={redirectToSiteConstructor} />
    </Flex>
  );
};

export default reduxForm<CreateSiteFormValues, CreateSiteProps>({ form: 'createSiteForm' })(
  CreateNewWebsite
) as React.ComponentType<CreateSiteProps>;
