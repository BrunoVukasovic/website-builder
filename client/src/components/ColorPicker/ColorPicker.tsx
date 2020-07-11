import React, { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';

import { useToggle } from 'react-use';

import { SketchPicker, ColorResult } from 'react-color';
import { Button, Popover, IconButton, Switch } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import Flex from '../Flex';

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
  coloredArea: 'navbar' | 'page';
  onClose: () => void;
  initialValue?: string;
  anchorElement?: HTMLElement;
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
    <Popover open anchorEl={anchorElement} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
      <Flex direction="column" alignItems="flex-start" paper className={styles.editorWrapper}>
        <Flex fluid>
          {headerText && <h3>{`${headerText}`}</h3>}
          <IconButton aria-label="close" onClick={handleClose} className={styles.closeButton}>
            <CloseIcon />
          </IconButton>
        </Flex>
        {coloredArea === 'page' && (
          <Flex alignItems="center" justifyContent="center" className={styles.switchWrapper}>
            <p>Apply to all pages</p>
            <Switch checked={shouldColorAllPages} onChange={toggleShouldColorAllPages} color="primary" />
          </Flex>
        )}
        <SketchPicker color={color} onChange={handleChange} disableAlpha />
        <Flex justifyContent="space-between" className={styles.buttonWrapper} fluid>
          <Button color="primary" variant="outlined" onClick={handleClose}>
            Close
          </Button>
          <Button color="primary" variant="contained" onClick={handleSaveClick}>
            Save
          </Button>
        </Flex>
      </Flex>
    </Popover>
  );
};

export default ColorPicker;
