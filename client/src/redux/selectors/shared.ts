import isEqual from 'lodash/isEqual';
import { createSelectorCreator, defaultMemoize } from 'reselect';

export const createDeepEqualitySelector = createSelectorCreator(defaultMemoize, isEqual);
