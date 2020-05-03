import { getFormValues } from "redux-form";

import { AppState } from "../reducers/rootReducer";
import { PageFormValues } from "../models";
import { createDeepEqualitySelector } from "./shared";

const getPageFormValues = (state: AppState) =>
  getFormValues("pageForm")(state) as PageFormValues;

export const selectPageFormValues = createDeepEqualitySelector(
  getPageFormValues,
  (formValues) => formValues
);
