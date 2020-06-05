import { Menu } from '@material-ui/core';
import { MenuProps as MUIMenuProps } from '@material-ui/core/Menu';

import { PageSegment } from '../../../models';
import Flex from '../../Flex';

export interface CurrentSegment extends PageSegment {
  position: number;
  content: string;
  type: 'text' | 'image';
  shouldEdit?: boolean;
  shouldMoveUp?: boolean;
  shouldMoveDown?: boolean;
  shouldDelete?: boolean;
  anchorElement?: HTMLElement;
}

export const initialCurrentSegment: CurrentSegment = {
  position: 0,
  content: '',
  type: 'text',
  anchorElement: undefined,
};
