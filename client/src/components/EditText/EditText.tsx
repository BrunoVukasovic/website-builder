import React, { useState } from "react";

import ReactQuill from "react-quill";

import { useDispatch } from "react-redux";

import Flex from "../Flex";

import { setItemContent } from "../../redux/actions/page";

import "react-quill/dist/quill.snow.css";

export interface EditTextProps {
  initialValue?: string;
  itemPosition?: number;
  closeEditMenu?: () => void;
}

const EditText: React.FC<EditTextProps> = ({
  initialValue,
  itemPosition,
  closeEditMenu,
}) => {
  const [text, setText] = useState<string | undefined>(initialValue);
  const dispatch = useDispatch();

  const updateText = (value: string) => {
    setText(value);
  };

  const onSaveChangesClick = () => {
    //@TODO itemPosition i closeEditMenu bi triba bit obavezan ako neces ovu komponentu nigdi drugo kotisiti
    if (itemPosition && text && closeEditMenu) {
      dispatch(setItemContent({ position: itemPosition, content: text }));
      closeEditMenu();
    }
  };

  return (
    <Flex alignItems="flex-start">
      <button onClick={onSaveChangesClick}>Save</button>
      <ReactQuill value={text} onChange={updateText} />
    </Flex>
  );
};

export default EditText;
