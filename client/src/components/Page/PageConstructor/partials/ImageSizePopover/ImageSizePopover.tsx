import React, { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Switch from '@material-ui/core/Switch';

import { Button, Popover, IconButton, InputAdornment } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import Flex from '../../../../Flex';
import Input from '../../../../Input';

import { updateImageWidth, updateImageHeight } from '../../../../../redux/actions/site';

import styles from './image_size_popover.module.scss';

export interface ImageSizePopoverProps {
  onClose: () => void;
  segment: {
    position: number;
    width?: string;
    height?: string;
  };
  anchorElement?: HTMLElement;
  headerText?: string;
}

const ImageSizePopover: React.FC<ImageSizePopoverProps> = ({ segment, anchorElement, headerText, onClose }) => {
  const [autoWidth, setAutoWidth] = useState<boolean | undefined>(!segment.width || segment.width === 'auto');
  const [lastNonAutoWidth, setLastNonAutoWidth] = useState<string>(segment.width || '50');
  const [lastNonAutoHeight, setLastNonAutoHeight] = useState<string>(segment.width || '50');
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [autoHeight, setAutoHeight] = useState<boolean | undefined>(!segment.height) || segment.height == 'auto';
  const dispatch = useDispatch();

  const handleHeightCheckboxChange = () => {
    if (autoHeight) {
      const heightInRem = (parseInt(lastNonAutoHeight, 10) / 100) * 68;

      dispatch(updateImageHeight({ height: `${heightInRem}rem`, position: segment.position }));
    } else {
      dispatch(updateImageHeight({ height: 'auto', position: segment.position }));

      if (showErrorMessage) {
        setShowErrorMessage(false);
      }
    }
    setAutoHeight(!autoHeight);
  };

  const handleWidthCheckboxChange = () => {
    if (autoWidth) {
      dispatch(updateImageWidth({ width: `${lastNonAutoWidth}%`, position: segment.position }));
    } else {
      dispatch(updateImageWidth({ width: 'auto', position: segment.position }));

      if (showErrorMessage) {
        setShowErrorMessage(false);
      }
    }
    setAutoWidth(!autoWidth);
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const currentValue = parseInt(e.currentTarget.value, 10);

    if (currentValue < 101 && currentValue > 0) {
      //@NOTE % of maxContentWidht = 68rem
      const heightInRem = (currentValue / 100) * 68;
      dispatch(updateImageHeight({ height: `${heightInRem}rem`, position: segment.position }));
      setLastNonAutoHeight(e.currentTarget.value);

      if (showErrorMessage) {
        const widthInput = document.getElementById('widthInput') as HTMLInputElement | null;
        if (widthInput) {
          const currentWidth = parseInt(widthInput.value, 10);

          if (currentWidth > 0 && currentWidth < 101) {
            setShowErrorMessage(false);
          }
        }
      }
    } else {
      setShowErrorMessage(true);
    }
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const currentValue = parseInt(e.currentTarget.value, 10);

    if (currentValue < 101 && currentValue > 0) {
      dispatch(updateImageWidth({ width: `${currentValue}%`, position: segment.position }));
      setLastNonAutoWidth(e.currentTarget.value);

      if (showErrorMessage) {
        const heightInput = document.getElementById('heightInput') as HTMLInputElement | null;
        if (heightInput) {
          const currentHeight = parseInt(heightInput.value, 10);

          if (currentHeight > 0 && currentHeight < 101) {
            setShowErrorMessage(false);
          }
        }
      }
    } else {
      setShowErrorMessage(true);
    }
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
        <Flex alignItems="center">
          <Flex alignItems="center" className={styles.rowTitleWrapper} flexOut>
            <p>Width</p>
          </Flex>
          <Flex className={styles.inputWrapper}>
            <Input
              id="widthInput"
              onChange={handleWidthChange}
              variant={autoWidth ? 'filled' : 'outlined'}
              readOnly={autoWidth}
              size="small"
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                type: 'number',
              }}
              defaultValue={!autoWidth ? parseInt(lastNonAutoWidth, 10) : undefined}
              error={showErrorMessage}
            />
          </Flex>
          <Flex direction="column" alignItems="center" className={styles.autoWrapper}>
            <Switch
              // checked={!segment.width || segment.width === 'auto'}
              checked={autoWidth}
              onChange={handleWidthCheckboxChange}
              color="primary"
            />
            <p>Automatic</p>
          </Flex>
        </Flex>
        <Flex alignItems="center">
          <Flex alignItems="center" className={styles.rowTitleWrapper}>
            <p>Height</p>
          </Flex>
          <Flex className={styles.inputWrapper}>
            <Input
              id="heightInput"
              onChange={handleHeightChange}
              variant={autoHeight ? 'filled' : 'outlined'}
              readOnly={autoHeight}
              size="small"
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                type: 'number',
              }}
              defaultValue={!autoHeight ? parseInt(lastNonAutoHeight, 10) : undefined}
              error={showErrorMessage}
            />
          </Flex>
          <Flex direction="column" alignItems="center" className={styles.autoWrapper}>
            <Switch checked={autoHeight} onChange={handleHeightCheckboxChange} color="primary" />
            <p>Automatic</p>
          </Flex>
        </Flex>
        {showErrorMessage && <p className={styles.errorMessage}>Width and height value must be between 1 and 100</p>}
        <Flex justifyContent="flex-end" className={styles.buttonWrapper} fluid>
          <Button color="primary" variant="contained" onClick={onClose}>
            Close
          </Button>
        </Flex>
      </Flex>
    </Popover>
  );
};

export default ImageSizePopover;
