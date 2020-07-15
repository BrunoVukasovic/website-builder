//@NOTE deprecated, use ActionContainer instead
import React, { useCallback } from 'react';

import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Auth from '../../components/Auth';
import Flex from '../../components/Flex';
import SiteContainer from '../../components/SiteContainer';
import Footer from '../../components/Footer';
import SiteTitleForm from '../../components/SiteTitleForm';

import { SiteTitleFormValues } from '../../redux/models';
import { useAuth } from '../../utils/AuthContext';
import { selectCurrentSite } from '../../redux/selectors/site';

import styles from './rename_website.module.scss';

//@NOTE deprecated, use ActionContainer instead

const RenameWebsite: React.FC = () => {
  const currentSite = useSelector(selectCurrentSite);
  // const dispatch = useDispatch();
  const { isAuth } = useAuth();
  // const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const origin = React.useMemo(() => window.location.origin, []);

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

  return (
    <Flex direction="column" alignItems="center" maxHeight>
      <SiteContainer className={styles.siteContainer}>
        <Flex direction="column" className={styles.renameSiteWrapper}>
          <SiteTitleForm
            onCancelClick={redirectToSiteConstructor}
            action="create"
            currentSlug={currentSite.slug}
            submitButtonText="Rename site"
            initialValues={{
              title: currentSite.title,
              url: `${origin}/${currentSite.slug}`,
            }}
          />
        </Flex>
      </SiteContainer>
      <Footer primaryBtnText="Back to editing" onPrimaryBtnClick={redirectToSiteConstructor} />
    </Flex>
  );
};

export default RenameWebsite;
