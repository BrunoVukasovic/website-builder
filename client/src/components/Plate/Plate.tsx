import React from 'react';
import CloseIcon from '@material-ui/icons/Close';

import { Button, Popover, IconButton, PopoverProps } from '@material-ui/core';

import { useTranslation } from 'react-i18next';

import Flex from '../Flex';

import styles from './plate.module.scss';

export interface PlateProps extends Omit<PopoverProps, 'open'> {
  anchorElement: HTMLElement;
  onClose: () => void;
  anchorOrigin?: {
    horizontal: 'center' | 'left' | 'right';
    vertical: 'bottom' | 'center' | 'top';
  };
  headerText?: string;
  showSecondaryCloseButton?: boolean;
  primaryButtonText?: string;
  showFooter?: boolean;
  onPrimaryButtonClick?: () => void;
}

const Plate: React.FC<PlateProps> = ({
  anchorElement,
  anchorOrigin = { vertical: 'bottom', horizontal: 'left' },
  className,
  headerText,
  children,
  onClose,
  showFooter,
  showSecondaryCloseButton,
  primaryButtonText = 'Save',
  onPrimaryButtonClick,
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <Popover open anchorEl={anchorElement} anchorOrigin={anchorOrigin} className={className} {...props}>
      <Flex direction="column" alignItems="flex-start" paper className={styles.container}>
        <Flex fluid>
          {headerText && <h3>{t(headerText)}</h3>}
          <IconButton aria-label="close" onClick={onClose} className={styles.closeButton}>
            <CloseIcon />
          </IconButton>
        </Flex>
        {children}
        {showFooter && (
          <Flex justifyContent="space-between" className={styles.footer} fluid>
            {showSecondaryCloseButton && (
              <Button color="primary" variant="outlined" onClick={onClose}>
                {t('Close')}
              </Button>
            )}
            <Button color="primary" variant="contained" onClick={onPrimaryButtonClick} className={styles.primaryButton}>
              {t(primaryButtonText)}
            </Button>
          </Flex>
        )}
      </Flex>
    </Popover>
  );
};

export default Plate;
