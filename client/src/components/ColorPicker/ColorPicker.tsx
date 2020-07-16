import React, { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';

import { useToggle } from 'react-use';

import { SketchPicker, ColorResult } from 'react-color';
import { Button, Popover, IconButton, Switch } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { Flex, Plate } from '../';

import {
  changeNavbarColor,
  undoNavbarColorChange,
  updateInitialNavbarColor,
  changePageColor,
  undoPageColorChange,
  updateInitialPageColor,
  updateAllPagesColor,
} from '../../redux/actions/site';

import styles from './color_picker.module.scss';

export interface ColorPickerProps {
  anchorElement: HTMLElement;
  coloredArea: 'navbar' | 'page';
  onClose: () => void;
  initialValue?: string;
  headerText?: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ coloredArea, onClose, initialValue, anchorElement, headerText }) => {
  const [shouldColorAllPages, toggleShouldColorAllPages] = useToggle(false);
  const [color, setColor] = useState<string | undefined>(initialValue);
  const dispatch = useDispatch();

  const handleChange = (color: ColorResult) => {
    setColor(color.hex);

    switch (coloredArea) {
      case 'navbar':
        dispatch(changeNavbarColor(color.hex));
        break;
      case 'page':
        dispatch(changePageColor(color.hex));
        break;
      default:
      // @TODO show notistack error, couldn't save
    }
  };

  const handleClose = () => {
    switch (coloredArea) {
      case 'navbar':
        dispatch(undoNavbarColorChange());
        break;
      case 'page':
        dispatch(undoPageColorChange());
        break;
      default:
      // @TODO show notistack error, couldn't save
    }

    onClose();
  };

  const handleSaveClick = () => {
    switch (coloredArea) {
      case 'navbar':
        dispatch(updateInitialNavbarColor());
        break;
      case 'page':
        shouldColorAllPages ? dispatch(updateAllPagesColor()) : dispatch(updateInitialPageColor());
        break;
      default:
      // @TODO show notistack error, couldn't save
    }

    onClose();
  };

  return (
    <Plate
      anchorElement={anchorElement}
      headerText={headerText}
      onClose={handleClose}
      showFooter
      showSecondaryCloseButton
      onPrimaryButtonClick={handleSaveClick}
    >
      <Flex direction="column" className={styles.colorPickerWrapper}>
        {coloredArea === 'page' && (
          <Flex alignItems="center" justifyContent="center" className={styles.switchWrapper}>
            <p>Apply to all pages</p>
            <Switch checked={shouldColorAllPages} onChange={toggleShouldColorAllPages} color="primary" />
          </Flex>
        )}
        <SketchPicker color={color} onChange={handleChange} disableAlpha />
      </Flex>
    </Plate>
  );
};

export default ColorPicker;
