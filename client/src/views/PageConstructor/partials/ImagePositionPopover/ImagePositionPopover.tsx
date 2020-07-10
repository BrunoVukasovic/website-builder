import React from 'react';
import CloseIcon from '@material-ui/icons/Close';

import { Button, Popover, IconButton } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import Flex from '../../../../components/Flex';

import { updateSegmentHorizontalPosition } from '../../../../redux/actions/site';

import styles from './image_position_popover.module.scss';

export interface ImagePositionPopoverProps {
  onClose: () => void;
  segment: {
    position: number;
    horizontalPosition?: string;
  };
  anchorElement?: HTMLElement;
  headerText?: string;
}

const ImagePositionPopover: React.FC<ImagePositionPopoverProps> = ({ segment, anchorElement, headerText, onClose }) => {
  const dispatch = useDispatch();

  const onChangePositionClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    dispatch(updateSegmentHorizontalPosition({ horizontalPosition: e.currentTarget.id, position: segment.position }));
  };

  return (
    <Popover open anchorEl={anchorElement} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
      <Flex direction="column" alignItems="flex-start" paper className={styles.container}>
        <Flex fluid>
          {headerText && <h3>{`${headerText}`}</h3>}
          <IconButton aria-label="close" onClick={onClose} className={styles.closeButton}>
            <CloseIcon />
          </IconButton>
        </Flex>
        <Flex className={styles.positionButtonWrapper}>
          <Button id="flex-start" onClick={onChangePositionClick} color="primary" size="small">
            Left
          </Button>
          <Button
            id="center"
            onClick={onChangePositionClick}
            color="primary"
            size="small"
            className={styles.middleButton}
          >
            Center
          </Button>
          <Button id="flex-end" onClick={onChangePositionClick} color="primary" size="small">
            Right
          </Button>
        </Flex>
        <Flex justifyContent="flex-end" className={styles.footer} fluid>
          <Button color="primary" variant="contained" onClick={onClose}>
            Close
          </Button>
        </Flex>
      </Flex>
    </Popover>
  );
};

export default ImagePositionPopover;
