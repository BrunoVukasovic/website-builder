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
  // const [errorMessage, setErrorMessage] = useState<string>('');
  const [autoHeight, setAutoHeight] = useState<boolean | undefined>(!segment.height) || segment.height == 'auto';
  const dispatch = useDispatch();

  const handleHeightCheckboxChange = () => {
    if (autoHeight) {
      const heightInRem = (parseInt(lastNonAutoHeight, 10) / 100) * 68;

      dispatch(updateImageHeight({ height: `${heightInRem}rem`, position: segment.position }));
    } else {
      dispatch(updateImageHeight({ height: 'auto', position: segment.position }));
    }
    setAutoHeight(!autoHeight);
  };

  const handleWidthCheckboxChange = () => {
    if (autoWidth) {
      dispatch(updateImageWidth({ width: `${lastNonAutoWidth}%`, position: segment.position }));
    } else {
      dispatch(updateImageWidth({ width: 'auto', position: segment.position }));
    }
    setAutoWidth(!autoWidth);
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //@NOTE % of maxContentWidht = 68rem
    const heightInRem = (parseInt(e.currentTarget.value, 10) / 100) * 68;
    dispatch(updateImageHeight({ height: `${heightInRem}rem`, position: segment.position }));
    setLastNonAutoHeight(e.currentTarget.value);
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const currentValue = parseInt(e.currentTarget.value, 10);
    // if (currentValue < 101 || currentValue > 0) {
    dispatch(updateImageWidth({ width: `${e.currentTarget.value}%`, position: segment.position }));
    setLastNonAutoWidth(e.currentTarget.value);
    // } else {
    // setErrorMessage('Value must be between 1 and 100');
    // }
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
              onChange={handleWidthChange}
              variant={autoWidth ? 'filled' : 'outlined'}
              readOnly={autoWidth}
              size="small"
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                type: 'number',
              }}
              defaultValue={!autoWidth ? parseInt(lastNonAutoWidth, 10) : undefined}
              // error={errorMessage.length > 0}
              // helperText={errorMessage}
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
              onChange={handleHeightChange}
              variant={autoHeight ? 'filled' : 'outlined'}
              readOnly={autoHeight}
              size="small"
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                type: 'number',
              }}
              defaultValue={!autoHeight ? parseInt(lastNonAutoHeight, 10) : undefined}
            />
          </Flex>
          <Flex direction="column" alignItems="center" className={styles.autoWrapper}>
            <Switch checked={autoHeight} onChange={handleHeightCheckboxChange} color="primary" />
            <p>Automatic</p>
          </Flex>
        </Flex>
        <Flex alignItems="flex-end" className={styles.buttonWrapper} fluid>
          <Button color="primary" variant="contained" onClick={onClose}>
            Close
          </Button>
        </Flex>
      </Flex>
    </Popover>
  );
};

export default ImageSizePopover;
