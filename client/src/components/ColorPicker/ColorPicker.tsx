import React, { useState } from 'react';

import { useToggle } from 'react-use';
import { useSnackbar } from 'notistack';
import { SketchPicker, ColorResult } from 'react-color';
import { Checkbox } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Flex, Plate } from '../';

import {
  changeNavbarColor,
  undoNavbarColorChange,
  updateInitialNavbarColor,
  changePageColor,
  undoPageColorChange,
  updateInitialPageColor,
  updateAllPagesColor,
  changeMenuIconColor,
  undoMenuIconColorChange,
  updateInitialMenuIconColor,
} from '../../redux/actions/site';

import styles from './color_picker.module.scss';

export interface ColorPickerProps {
  anchorElement: HTMLElement;
  coloredArea: 'page' | 'navbar' | 'menuIcon';
  onClose: () => void;
  initialValue?: string;
  headerText?: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ coloredArea, onClose, initialValue, anchorElement, headerText }) => {
  const [shouldColorAllPages, toggleShouldColorAllPages] = useToggle(false);
  const [color, setColor] = useState<string | undefined>(initialValue);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const handleColorChange = (color: ColorResult) => {
    setColor(color.hex);

    switch (coloredArea) {
      case 'navbar':
        dispatch(changeNavbarColor(color.hex));
        break;
      case 'menuIcon':
        dispatch(changeMenuIconColor(color.hex));
        break;
      case 'page':
        dispatch(changePageColor(color.hex));
        break;
      default:
        enqueueSnackbar(t('Error.Something went wrong'), { variant: 'error' });
    }
  };

  const handleClose = () => {
    switch (coloredArea) {
      case 'navbar':
        dispatch(undoNavbarColorChange());
        break;
      case 'menuIcon':
        dispatch(undoMenuIconColorChange());
        break;
      case 'page':
        dispatch(undoPageColorChange());
        break;
      default:
        enqueueSnackbar(t('Error.Something went wrong'), { variant: 'error' });
    }

    onClose();
  };

  const handleSaveClick = () => {
    switch (coloredArea) {
      case 'navbar':
        dispatch(updateInitialNavbarColor());
        break;
      case 'menuIcon':
        dispatch(updateInitialMenuIconColor());
        break;
      case 'page':
        shouldColorAllPages ? dispatch(updateAllPagesColor()) : dispatch(updateInitialPageColor());
        break;
      default:
        enqueueSnackbar(t('Error.Something went wrong'), { variant: 'error' });
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
          <Flex
            alignItems="center"
            justifyContent="center"
            onClick={toggleShouldColorAllPages}
            className={styles.switchWrapper}
          >
            <p>Apply to all pages</p>
            <Checkbox checked={shouldColorAllPages} name="colorAllPages" color="primary" />
          </Flex>
        )}
        <SketchPicker color={color} onChange={handleColorChange} disableAlpha />
      </Flex>
    </Plate>
  );
};

export default ColorPicker;
