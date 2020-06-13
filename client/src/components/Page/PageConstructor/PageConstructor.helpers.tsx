import React from 'react';
import { Menu, Switch } from '@material-ui/core';
import { MenuProps as MUIMenuProps } from '@material-ui/core/Menu';

import { PageSegment } from '../../../models';
import Flex from '../../Flex';

import styles from './page_constructor.module.scss';

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

export interface SegmentContentProps {
  segment: PageSegment;
}

export const SegmentContent: React.FC<SegmentContentProps> = ({ segment }) => {
  switch (segment.type) {
    case 'text':
      return <Flex className={styles.content} dangerouslySetInnerHTML={{ __html: segment.content }} />;
    case 'image':
      return <img className={styles.content} src={segment.content} />;
    default:
      return <p>Content not supported!</p>;
  }
};
