import React from 'react';
import cx from 'classnames';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';

import { NavLink } from 'react-router-dom';
import { Navbar } from '../../../../../models';

import Flex from '../../../../../components/Flex';
import Modal from '../../../../../components/Modal';

import styles from './flyout_navbar.module.scss';

export interface FlyoutNavbarProps {
  pagesData: { slug: string; name: string; id?: string }[];
  activePageSlug: string;
  siteSlug: string;
  navbarData: Navbar;
  allowEditing?: boolean;
  onClose: () => void;
  onAddItemClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onColorPaletteButtonClick?: () => void;
}

const FlyoutNavbar: React.FC<FlyoutNavbarProps> = ({
  pagesData,
  activePageSlug,
  siteSlug,
  navbarData,
  allowEditing,
  onClose,
  onAddItemClick,
  onColorPaletteButtonClick,
}) => {
  return (
    <Modal
      onClose={onClose}
      classes={{ root: styles.root }}
      className={styles.container}
      BodyClassName={styles.modalBody}
      inlineStyle={{ backgroundColor: navbarData.backgroundColor ? navbarData.backgroundColor : '#FFFFFF' }}
    >
      <Flex direction="column" className={styles.navbar}>
        {pagesData.map((item) => (
          <NavLink
            key={item.slug}
            to={`${allowEditing ? '/edit' : ''}/${siteSlug}/${item.slug}`}
            className={styles.link}
            activeClassName={styles.activeNavLink}
            onClick={onClose}
          >
            <Button className={styles.navbarButton}>
              <Flex
                className={item.slug === activePageSlug ? cx(styles.textWrapper, styles.active) : styles.textWrapper}
                dangerouslySetInnerHTML={{ __html: item.name }}
              />
            </Button>
          </NavLink>
        ))}
        {allowEditing && (
          <Flex className={styles.addPageWrapper}>
            <IconButton aria-label="add-page" onClick={onAddItemClick}>
              <AddCircleIcon color="primary" className={styles.addIcon} />
            </IconButton>
          </Flex>
        )}
      </Flex>
    </Modal>
  );
};

export default FlyoutNavbar;
