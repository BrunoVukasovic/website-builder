import React, { useEffect } from 'react';
import cx from 'classnames';
import CloseIcon from '@material-ui/icons/Close';

import { Dialog, DialogContent, Fade, IconButton, Button } from '@material-ui/core';
import { ModalProps as MUIModalProps } from '@material-ui/core/Modal';

import Flex from '../Flex';

import styles from './modal.module.scss';

export interface ModalProps extends Omit<MUIModalProps, 'open' | 'children'> {
  onClose: () => void;
  open?: boolean;
  className?: string;
  BodyClassName?: string;
  ContentClassName?: string;
  HeaderClassName?: string;
  headerText?: string;
  showFooter?: boolean;
  onPrimaryButtonClick?: () => void;
  onSecondaryButtonClick?: () => void;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  inlineStyle?: { backgroundColor?: string };
}

const Modal: React.FC<ModalProps> = ({
  children,
  className,
  onClose,
  BodyClassName,
  ContentClassName,
  HeaderClassName,
  headerText,
  showFooter,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
  primaryButtonText,
  secondaryButtonText,
  inlineStyle,
  open = true,
  ...props
}) => (
  <Dialog
    open={open}
    onClose={onClose}
    className={styles.main}
    TransitionComponent={Fade}
    PaperProps={{
      className: cx(styles.container, className),
    }}
    {...props}
  >
    <DialogContent>
      <Flex direction="column" fluid className={cx(styles.content, ContentClassName)}>
        <Flex
          direction="row-reverse"
          justifyContent="space-between"
          alignItems="center"
          className={cx(styles.headerWrapper, HeaderClassName)}
          style={inlineStyle}
        >
          <Flex className={styles.closeButtonWrapper} onClick={onClose}>
            <IconButton aria-label="close" className={styles.closeButton}>
              <CloseIcon />
            </IconButton>
          </Flex>
          {headerText && (
            <Flex>
              <h2 className={styles.text}>{headerText}</h2>
            </Flex>
          )}
        </Flex>

        <Flex direction="column" className={cx(styles.body, BodyClassName)} style={inlineStyle} flexOut>
          {children}
        </Flex>
      </Flex>
      {showFooter && (
        <Flex justifyContent="space-between" className={styles.footerWrapper}>
          <Button variant="outlined" color="primary" size="large" onClick={onSecondaryButtonClick}>
            {secondaryButtonText}
          </Button>
          <Button variant="contained" color="primary" size="large" onClick={onPrimaryButtonClick}>
            {primaryButtonText}
          </Button>
        </Flex>
      )}
    </DialogContent>
  </Dialog>
);

export default Modal;
