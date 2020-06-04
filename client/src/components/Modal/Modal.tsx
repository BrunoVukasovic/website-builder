import React, { useEffect } from 'react';
import cx from 'classnames';
import CloseIcon from '@material-ui/icons/Close';

import { Dialog, DialogContent, Fade, IconButton } from '@material-ui/core';
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
}

const Modal: React.FC<ModalProps> = ({
  children,
  className,
  onClose,
  BodyClassName,
  ContentClassName,
  HeaderClassName,
  headerText,
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

        <Flex direction="column" className={cx(styles.body, BodyClassName)}>
          {children}
        </Flex>
      </Flex>
    </DialogContent>
  </Dialog>
);

export default Modal;
