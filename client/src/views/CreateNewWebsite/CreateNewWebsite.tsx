//@NOTE deprecated, use ActionContainer instead

import React, { useCallback } from 'react';

import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Auth from '../../components/Auth';
import Flex from '../../components/Flex';
import SiteContainer from '../../components/SiteContainer';
import Footer from '../../components/Footer';
import SaveChanges from '../../components/SaveChanges';
import SiteTitleForm from '../../components/SiteTitleForm';

import { useAuth } from '../../utils/AuthContext';
import { selectCurrentSite } from '../../redux/selectors/site';

import styles from './create_new_website.module.scss';

//@NOTE deprecated, use ActionContainer instead

const CreateNewWebsite: React.FC = () => {
  const currentSite = useSelector(selectCurrentSite);
  const history = useHistory();
  const { isAuth } = useAuth();

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
            <SaveChanges currentSite={currentSite} onClose={redirectToSiteConstructor} />
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
          <SiteTitleForm
            onCancelClick={redirectToSiteConstructor}
            action="create"
            currentSlug="new-website"
            submitButtonText="Create site"
          />
        </Flex>
      </SiteContainer>
      <Footer primaryBtnText="Back to editing" onPrimaryBtnClick={redirectToSiteConstructor} />
    </Flex>
  );
};

export default CreateNewWebsite;
