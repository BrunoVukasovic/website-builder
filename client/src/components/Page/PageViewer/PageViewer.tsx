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
    <Flex direction="column">
      {pageContainer.map((segment) => {
        const { content, type, style } = segment;

        switch (type) {
          case 'text':
            return (
              <Flex key={content} className={styles.textSegmentWrapper} flexOut>
                <ReactQuill value={segment.content} readOnly={true} theme={'bubble'} />
              </Flex>
            );
          case 'image':
            return (
              <Flex
                key={content}
                justifyContent={style?.wrapper?.position}
                alignSelf="flex-start"
                alignItems="center"
                fluid
              >
                <img style={style ? style.content : {}} className={styles.imageSegment} src={content} />
              </Flex>
            );
          default:
            return undefined;
        }
      })}
    </Flex>
  </Flex>
);

export default PageViewer;
