import React from 'react';
import ReactQuill from 'react-quill';

import Flex from '../../components/Flex';

import { PageSegment } from '../../models';

import 'react-quill/dist/quill.bubble.css';
import styles from './page_constructor.module.scss';

export interface CurrentSegment extends PageSegment {
  position: number;
  content: string;
  type: 'text' | 'image';
}

export const initialCurrentSegment: CurrentSegment = {
  position: 0,
  content: '',
  type: 'text',
};

export interface DisplaySegmentProps {
  segment: PageSegment;
}

export const DisplaySegment: React.FC<DisplaySegmentProps> = ({ segment }) => {
  switch (segment.type) {
    case 'text':
      return (
        <Flex className={styles.textSegmentWrapper} flexOut>
          <ReactQuill value={segment.content} readOnly={true} theme={'bubble'} />
        </Flex>
      );
    case 'image':
      return (
        <Flex justifyContent={segment.style?.wrapper?.position} flexOut>
          <img style={segment.style?.content} className={styles.imageSegment} src={segment.content} />
        </Flex>
      );
    default:
      return <p>Content not supported!</p>;
  }
};
