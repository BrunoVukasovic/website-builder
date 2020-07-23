import React, { useState } from 'react';
import ReactQuill from 'react-quill';

import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';

import { Plate } from '../';
import { PageData } from '../../views/SiteConstructor/partials/NavbarConstructor';
import { updateCurrentPageSegment, addNewPage, addPageSegment, updatePageName } from '../../redux/actions/site';
import { modules, formats } from './TextEditor.helpers';

import 'react-quill/dist/quill.snow.css';
import styles from './text_editor.module.scss';

export interface TextEditorProps {
  onClose: () => void;
  objective: 'updateSegment' | 'addSegment' | 'updatePageName' | 'addPage';
  anchorElement: HTMLElement;
  itemPosition?: number;
  initialValue?: string;
  headerText?: string;
  oldSlug?: string;
  pages?: PageData[];
}

const TextEditor: React.FC<TextEditorProps> = ({
  initialValue,
  itemPosition,
  onClose,
  objective,
  anchorElement,
  headerText,
  oldSlug,
  pages,
}) => {
  const [text, setText] = useState<string>(initialValue || '');
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const onTextValueChange = (value: string) => {
    setText(value);
  };

  const handleSave = () => {
    switch (objective) {
      case 'addPage':
        if (pages && pages.find((page) => page.name === text)) {
          enqueueSnackbar('Page with the same name already exist.', { variant: 'error' });
        } else {
          dispatch(
            addNewPage({
              title: text,
              slug: text
                .replace(/(<([^>]+)>)/gi, '')
                .replace(/[^a-zA-Z0-9]/g, '-')
                .toLowerCase(),
            })
          );
        }
        break;
      case 'updatePageName':
        if (pages && text !== initialValue && pages.find((page) => page.name === text)) {
          enqueueSnackbar('Page with the same name already exist.', { variant: 'error' });
        } else {
          dispatch(
            updatePageName({
              name: text,
              slug: text
                .replace(/(<([^>]+)>)/gi, '')
                .replace(/[^a-zA-Z0-9]/g, '-')
                .toLowerCase(),
              //@ts-ignore
              oldSlug,
            })
          );
        }
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
        break;
    }

    onClose();
  };

  return (
    <Plate
      anchorElement={anchorElement}
      headerText={headerText}
      onClose={onClose}
      showFooter
      showSecondaryCloseButton
      onPrimaryButtonClick={handleSave}
    >
      <ReactQuill
        value={text}
        onChange={onTextValueChange}
        modules={modules}
        formats={formats}
        className={styles.quill}
      />
    </Plate>
  );
};

export default TextEditor;
