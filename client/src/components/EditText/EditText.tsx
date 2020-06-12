import React, { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import ReactQuill from 'react-quill';

import { Button, Popover, IconButton } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import Flex from '../Flex';

import { updateCurrentPageSegment, addNewPage, addPageSegment } from '../../redux/actions/site';
import { modules, formats } from './EditText.helpers';

import 'react-quill/dist/quill.snow.css';
import styles from './edit_text.module.scss';

export interface EditTextProps {
  onCloseEditor: () => void;
  action: 'updateSegment' | 'addSegment' | 'updateNavbar' | 'addPage';
  anchorElement?: HTMLElement;
  itemPosition?: number;
  initialValue?: string;
  headerText?: string;
}

const EditText: React.FC<EditTextProps> = ({
  initialValue,
  itemPosition,
  onCloseEditor,
  action,
  anchorElement,
  headerText,
}) => {
  const [text, setText] = useState<string>(initialValue || '');
  const dispatch = useDispatch();

  const onTextValueChange = (value: string) => {
    setText(value);
  };

  const onSaveChangesClick = () => {
    switch (action) {
      case 'addPage':
        dispatch(
          addNewPage({
            title: text,
            slug: text
              .replace(/(<([^>]+)>)/gi, '')
              .replace(/[^a-zA-Z0-9]/g, '-')
              .toLowerCase(),
          })
        );
        break;
      case 'addSegment':
        dispatch(
          addPageSegment({
            content: text,
            type: 'text',
          })
        );
        break;
      case 'updateSegment':
        dispatch(
          updateCurrentPageSegment({
            //@ts-ignore
            position: itemPosition,
            content: text,
            type: 'text',
          })
        );
        break;
      default:
      // @TODO show notistack error, couldn't save
    }

    onCloseEditor();
  };

  return (
    <Popover open anchorEl={anchorElement} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
      <Flex direction="column" alignItems="flex-start" paper className={styles.editorWrapper}>
        <Flex fluid>
          {headerText && <h3>{`${headerText}`}</h3>}
          <IconButton aria-label="close" onClick={onCloseEditor} className={styles.closeButton}>
            <CloseIcon />
          </IconButton>
        </Flex>
        <ReactQuill
          value={text}
          onChange={onTextValueChange}
          modules={modules}
          formats={formats}
          className={styles.quill}
        />
        <Flex justifyContent="space-between" className={styles.buttonWrapper} fluid>
          <Button color="primary" variant="outlined" onClick={onCloseEditor}>
            Close
          </Button>
          <Button color="primary" variant="contained" onClick={onSaveChangesClick}>
            Save
          </Button>
        </Flex>
      </Flex>
    </Popover>
  );
};

export default EditText;
