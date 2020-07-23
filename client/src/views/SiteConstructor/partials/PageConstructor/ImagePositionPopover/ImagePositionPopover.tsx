import React from 'react';

import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { Flex, Plate } from '../../../../../components';
import { updateSegmentHorizontalPosition } from '../../../../../redux/actions/site';

import styles from './image_position_popover.module.scss';

export interface ImagePositionPopoverProps {
  onClose: () => void;
  segment: {
    position: number;
    horizontalPosition?: string;
  };
  anchorElement: HTMLElement;
  headerText?: string;
}

const ImagePositionPopover: React.FC<ImagePositionPopoverProps> = ({ segment, anchorElement, headerText, onClose }) => {
  const dispatch = useDispatch();

  const onChangePositionClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    dispatch(updateSegmentHorizontalPosition({ horizontalPosition: e.currentTarget.id, position: segment.position }));
  };

  return (
    <Plate
      anchorElement={anchorElement}
      headerText={headerText}
      onClose={onClose}
      showFooter
      primaryButtonText="Close"
      onPrimaryButtonClick={onClose}
    >
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
    </Plate>
  );
};

export default ImagePositionPopover;
