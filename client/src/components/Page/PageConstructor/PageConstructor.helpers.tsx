import React from 'react';
import ReactQuill from 'react-quill';

import Flex from '../../Flex';

import { PageSegment } from '../../../models';

import 'react-quill/dist/quill.bubble.css';
import styles from './page_constructor.module.scss';

export interface CurrentSegment extends PageSegment {
  position: number;
  content: string;
  type: 'text' | 'image';
  // shouldEdit?: boolean;
  // shouldMoveUp?: boolean;
  // shouldMoveDown?: boolean;
  // shouldDelete?: boolean;k
  // anchorElement?: HTMLElement;
}

export const initialCurrentSegment: CurrentSegment = {
  position: 0,
  content: '',
  type: 'text',
  // anchorElement: undefined,
};

export interface DisplaySegmentProps {
  segment: PageSegment;
}

export const DisplaySegment: React.FC<DisplaySegmentProps> = ({ segment }) => {
  console.log(segment.position);
  console.log(segment.style?.content);
  switch (segment.type) {
    case 'text':
      return (
        <Flex className={styles.textSegmentWrapper} flexOut>
          <ReactQuill value={segment.content} readOnly={true} theme={'bubble'} />
        </Flex>
      );
    case 'image':
      return <img style={segment.style?.content} className={styles.imageSegment} src={segment.content} />;
    default:
      return <p>Content not supported!</p>;
  }
};
