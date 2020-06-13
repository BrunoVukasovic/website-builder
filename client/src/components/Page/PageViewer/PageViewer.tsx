import React from 'react';

import Flex from '../../Flex';

import { PageSegment } from '../../../models';

import styles from './page_viewer.module.scss';
import ReactQuill from 'react-quill';

export interface PageViewerProps {
  pageContainer: PageSegment[];
}

const PageViewer: React.FC<PageViewerProps> = ({ pageContainer }) => (
  <Flex direction="column" className={styles.pageContainer}>
    {pageContainer.map((segment) => {
      const { content, type } = segment;

      switch (type) {
        case 'text':
          return (
            <Flex className={styles.textSegmentWrapper} flexOut>
              <ReactQuill value={segment.content} readOnly={true} theme={'bubble'} />
            </Flex>
          );
        case 'image':
          return (
            <Flex className={styles.imageSegmentWrapper} flexOut>
              <img className={styles.imageSegment} src={segment.content} />
            </Flex>
          );
        default:
          return undefined;
      }
    })}
  </Flex>
);

export default PageViewer;
