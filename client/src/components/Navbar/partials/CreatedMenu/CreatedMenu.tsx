import React from 'react';
import cx from 'classnames';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';

import { NavLink } from 'react-router-dom';
import { Navbar } from '../../../../models';

import Flex from '../../../Flex';
import Modal from '../../../Modal';

import styles from './created_menu.module.scss';

export interface CreatedMenuProps {
  pagesData: { slug: string; name: string; id?: string }[];
  activePageSlug: string;
  siteSlug: string;
  navbarData: Navbar;
  allowEditing?: boolean;
  onClose: () => void;
  onAddPageBtnClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const CreatedMenu: React.FC<CreatedMenuProps> = ({
  pagesData,
  activePageSlug,
  siteSlug,
  navbarData,
  allowEditing,
  onClose,
  onAddPageBtnClick,
}) => {
  return (
    <Modal
      onClose={onClose}
      classes={{ root: styles.root }}
      className={styles.container}
      BodyClassName={styles.modalBody}
      inlineStyle={{ backgroundColor: navbarData.backgroundColor ? navbarData.backgroundColor : '#cfd2e4' }}
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
