import React from 'react';
import cx from 'classnames';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
// import EditText from '../../EditText';
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

import styles from './created_menu.module.scss';
import { Navbar } from '../../../../models';
import { NavLink } from 'react-router-dom';

export interface CreatedMenuProps {
  slugsAndNames: { slug: string; name: string }[];
  activePageName: string;
  siteSlug: string;
  //   style?: Navbar;
  allowEditing?: boolean;
  onClose: () => void;
  onAddPageBtnClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const CreatedMenu: React.FC<CreatedMenuProps> = ({
  slugsAndNames,
  activePageName,
  siteSlug,
  allowEditing,
  onClose,
  onAddPageBtnClick,
}) => {
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
      HeaderClassName={styles.header}
      BodyClassName={styles.modalBody}
    >
      <Flex direction="column" className={styles.navbar}>
        {slugsAndNames.map((item) => (
          <NavLink
            key={item.slug}
            to={`${allowEditing ? '/edit' : ''}/${siteSlug}/${item.slug}`}
            className={styles.link}
            activeClassName={styles.activeNavLink}
            onClick={onClose}
          >
            <Button className={styles.navbarButton}>
              <Flex
                className={item.name === activePageName ? cx(styles.textWrapper, styles.active) : styles.textWrapper}
                dangerouslySetInnerHTML={{ __html: item.name }}
              />
            </Button>
          </NavLink>
        ))}
        {allowEditing && (
          <Flex className={styles.addPageWrapper}>
            <IconButton aria-label="add-page" onClick={onAddPageBtnClick}>
              <AddCircleIcon color="primary" className={styles.addIcon} />
            </IconButton>
          </Flex>
        )}
      </Flex>
    </Modal>
  );
};

export default CreatedMenu;
