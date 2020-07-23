import React from 'react';

import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Auth from '../../components/Auth';
import Flex from '../../components/Flex';
import SiteContainer from '../../components/SiteContainer';
import Footer from '../../components/Footer';

import { useAuth } from '../../utils/AuthContext';
import { selectCurrentSite } from '../../redux/selectors/site';

import styles from './action_container.module.scss';
import { Action } from './ActionContainer.helpers';

const ActionContainer: React.FC = () => {
  const currentSite = useSelector(selectCurrentSite);
  const params = useParams<{ action: string }>();
  // const dispatch = useDispatch();
  const { isAuth } = useAuth();
  // const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  // const origin = React.useMemo(() => window.location.origin, []);

  const redirectToSiteConstructor = () => history.push(`/edit/${currentSite.slug}`);

  if (!isAuth) {
    return (
      <Flex direction="column" alignItems="center" maxHeight>
        <SiteContainer className={styles.siteContainer}>
          <Flex direction="column" className={styles.actionWrapper}>
            <Auth />
          </Flex>
        </SiteContainer>
        <Footer primaryBtnText="Back to editing" onPrimaryBtnClick={redirectToSiteConstructor} isOutlined />
      </Flex>
    );
  }

  return (
    <Flex direction="column" alignItems="center" maxHeight>
      <SiteContainer className={styles.siteContainer}>
        <Flex direction="column" className={styles.actionWrapper}>
          <Action
            type={params.action}
            currentSite={currentSite}
            redirectToSiteConstructor={redirectToSiteConstructor}
          />
        </Flex>
      </SiteContainer>
      <Footer primaryBtnText="Back to editing" onPrimaryBtnClick={redirectToSiteConstructor} isOutlined />
    </Flex>
  );
};

export default ActionContainer;
