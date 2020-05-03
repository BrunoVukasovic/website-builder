import React, { useState } from "react";

import ReactQuill from "react-quill";

import { reduxForm, change, InjectedFormProps } from "redux-form";
import { useDispatch } from "react-redux";

import { PageFormValues } from "../../redux/models";

import "react-quill/dist/quill.snow.css";

type EditTextFormProps = InjectedFormProps<PageFormValues>;

const EditText: React.FC<EditTextFormProps> = ({ handleSubmit }) => {
  const [text, setText] = useState<string>("");
  const dispatch = useDispatch();

  const updateText = (value: string) => {
    setText(value);
    dispatch(change("pageForm", "richTextHTML", value));
  };

  return <ReactQuill value={text} onChange={updateText} />;
};

export default reduxForm<PageFormValues>({ form: "pageForm" })(EditText);
