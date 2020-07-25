import React from 'react';

import { NavLink } from 'react-router-dom';
import { Button } from '@material-ui/core';

import { Flex, SiteContainer } from '../../components';
import { useAuth } from '../../utils/AuthContext';

import styles from './not_found.module.scss';

const NotFound: React.FC = () => {
  const { isAuth } = useAuth();

  return (
    <Flex direction="column" alignItems="center" maxHeight>
      <SiteContainer>
        <Flex direction="column" alignItems="center">
          <h2>This webpage does not exist</h2>
          <Flex className={styles.actionsWrapper}>
            <Flex direction="column" alignItems="center" className={styles.singleActionWrapper}>
              <h4>Want to create a new website?</h4>
              <NavLink to="/edit/new-website" className={styles.link}>
                <Button variant="contained" color="primary" size="large">
                  Create a website
                </Button>
              </NavLink>
            </Flex>
            {!isAuth && (
              <Flex direction="column" alignItems="center" className={styles.singleActionWrapper}>
                <h4>Already have a website?</h4>
                <NavLink to="/action/auth" className={styles.link}>
                  <Button variant="contained" color="primary" size="large">
                    Log in
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
