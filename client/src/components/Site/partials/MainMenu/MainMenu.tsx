import React from 'react';
import Button from '@material-ui/core/Button';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

import Flex from '../../../Flex';
import Modal from '../../../Modal';

import { useAuth } from '../../../../utils/AuthContext';
import { useSelector } from 'react-redux';
import { selectUserReducerValues } from '../../../../redux/selectors/user';
import { selectCurrentSite } from '../../../../redux/selectors/site';

import styles from './main_menu.module.scss';

export interface MainMenuProps {
  onClose: () => void;
  onLoginClick: () => void;
  className?: string;
}

const MainMenu: React.FC<MainMenuProps> = ({ children, className, onClose, onLoginClick }) => {
  const user = useSelector(selectUserReducerValues);
  const currentSite = useSelector(selectCurrentSite);
  const { isAuth, logOut } = useAuth();

  const handleCreateNewSiteClick = () => {
    window.open(`${window.location.origin}`, '_self');
  };

  const handleSiteSelectClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { id } = e.currentTarget;
    window.open(`${window.location.origin}/edit/${id}`, '_self');
  };

  const handleLogoutClick = () => {
    logOut();
    window.open(`${window.location.origin}/${currentSite.slug}`, '_self');
  };

  return (
    <Modal
      onClose={onClose}
      classes={{ root: styles.root }}
      className={styles.container}
      headerText={user.name && `Welcome ${user.name}`}
      HeaderClassName={styles.header}
      BodyClassName={styles.modalBody}
    >
      {isAuth ? (
        <Flex direction="column">
          <Flex className={styles.menuItem}>
            <Button color="primary" startIcon={<SpellcheckIcon />} className={styles.menuButton}>
              <p className={styles.menuItemText}>{`Rename ${currentSite.title}`}</p>
            </Button>
          </Flex>
          <Flex className={styles.expansionPanelWrapper}>
            <ExpansionPanel className={styles.mySitesPanel}>
              <ExpansionPanelSummary expandIcon={<ExpandMore color="primary" />} className={styles.summary}>
                <p className={styles.summaryText}>My websites</p>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={styles.panelDetails}>
                <Flex direction="column" className={styles.namesWrapper}>
                  {user.allSites.map((site) => {
                    return (
                      <Button
                        color="primary"
                        size="small"
                        id={`${site.slug}`}
                        onClick={handleSiteSelectClick}
                        className={styles.siteNameBtn}
                      >
                        <p>{site.title}</p>
                      </Button>
                    );
                  })}
                  <Button
                    color="primary"
                    size="small"
                    onClick={handleCreateNewSiteClick}
                    className={styles.siteNameBtn}
                  >
                    <p>Create new website...</p>
                  </Button>
                </Flex>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Flex>
          <Flex className={styles.menuItem}>
            <Button
              color="primary"
              startIcon={<AccountCircleIcon />}
              className={styles.menuButton}
              onClick={handleLogoutClick}
            >
              <p className={styles.menuItemText}>Logout</p>
            </Button>
          </Flex>
        </Flex>
      ) : (
        <Flex className={styles.menuItem}>
          <Button
            color="primary"
            size="large"
            startIcon={<AccountCircleIcon />}
            className={styles.menuButton}
            onClick={onLoginClick}
          >
            <p className={styles.menuItemText}>Login</p>
          </Button>
        </Flex>
      )}
    </Modal>
  );
};

export default MainMenu;
