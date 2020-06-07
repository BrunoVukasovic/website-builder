import React from 'react';

import Flex from '../../Flex';

import { PageSegment } from '../../../models';

import styles from './page_viewer.module.scss';

export interface PageViewerProps {
  pageContainer: PageSegment[];
}

const PageViewer: React.FC<PageViewerProps> = ({ pageContainer }) => (
  <Flex direction="column" className={styles.pageContainer}>
    {pageContainer.map((segment) => {
      const { content, type } = segment;

      switch (type) {
        case 'text':
          return <Flex key={segment.content} dangerouslySetInnerHTML={{ __html: content }} />;
        default:
          return undefined;
      }
    })}
  </Flex>
);

export default PageViewer;
