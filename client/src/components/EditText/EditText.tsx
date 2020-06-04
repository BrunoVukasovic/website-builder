import React, { useState } from 'react';

import ReactQuill from 'react-quill';

import { useDispatch } from 'react-redux';

import Flex from '../Flex';

import { updateCurrentPageSegment } from '../../redux/actions/site';

import 'react-quill/dist/quill.snow.css';

export interface EditTextProps {
  itemPosition: number;
  closeEditor: () => void;
  action: 'updateSegment' | 'addSegment' | 'updateNavbar' | 'addNavbar';
  initialValue?: string;
}

const EditText: React.FC<EditTextProps> = ({ initialValue, itemPosition, closeEditor, action }) => {
  const [text, setText] = useState<string>(initialValue || '');
  const dispatch = useDispatch();

  const updateText = (value: string) => {
    setText(value);
  };

  // @TODO slat ko prop, da se zna ocemo zvat updateCurrentPageSegment ili addNewSegment
  const onSaveChangesClick = () => {
    switch (action) {
      case 'updateSegment':
        dispatch(
          updateCurrentPageSegment({
            position: itemPosition,
            content: text,
            type: 'text',
          })
        );
        break;
      default:
      // @TODO show notistack error, couldn't save
    }

    closeEditor();
  };

  return (
    <Flex alignItems="flex-start">
      <button onClick={onSaveChangesClick}>Save</button>
      <ReactQuill value={text} onChange={updateText} />
    </Flex>
  );
};

export default EditText;
