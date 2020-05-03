import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "lodash/isEqual";

export const createDeepEqualitySelector = createSelectorCreator(
  defaultMemoize,
  isEqual
);
