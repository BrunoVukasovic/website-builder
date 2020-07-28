import React from 'react';

import { NavLink } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Flex, SiteContainer } from '../../components';
import { useAuth } from '../../utils/AuthContext';
import { selectUserReducerValues } from '../../redux/selectors/user';

import styles from './not_found.module.scss';

const NotFound: React.FC = () => {
  const user = useSelector(selectUserReducerValues);
  const { isAuth } = useAuth();
  const { t } = useTranslation();

  return (
    <Flex direction="column" alignItems="center" maxHeight>
      <SiteContainer>
        <Flex direction="column" alignItems="center">
          <h2>{t('Error.This webpage does not exist')}</h2>
          <Flex className={styles.actionsWrapper}>
            <Flex direction="column" alignItems="center" className={styles.singleActionWrapper}>
              <h4>{t('Want to create a new website')}</h4>
              <NavLink to="/edit/new-website" className={styles.link}>
                <Button variant="contained" color="primary" size="large">
                  {t('Create new website')}
                </Button>
              </NavLink>
            </Flex>
            {isAuth ? (
              user.allSites.length > 0 && (
                <Flex direction="column" alignItems="center" className={styles.singleActionWrapper}>
                  <h4>{t('Edit your website')}</h4>
                  <NavLink to={`/edit/${user.allSites[0].slug}`} className={styles.link}>
                    <Button variant="contained" color="primary" size="large">
                      {`${t('Edit')} ${user.allSites[0].title}`}
                    </Button>
                  </NavLink>
                </Flex>
              )
            ) : (
              <Flex direction="column" alignItems="center" className={styles.singleActionWrapper}>
                <h4>{t('Already have a website')}</h4>
                <NavLink to="/action/auth" className={styles.link}>
                  <Button variant="contained" color="primary" size="large">
                    {t('Login')}
                  </Button>
                </NavLink>
              </Flex>
            )}
          </Flex>
        </Flex>
      </SiteContainer>
    </Flex>
  );
};

export default NotFound;
