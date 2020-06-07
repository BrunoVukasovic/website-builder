import React from 'react';
import cx from 'classnames';

import Flex from '../Flex';

import styles from './site_container.module.scss';

export type SiteContainerProps = {
  className?: string;
};

const SiteContainer: React.FC<SiteContainerProps> = ({ children, className, ...props }) => (
  <Flex direction="column" fluid flexOut className={cx(styles.siteContainer, className)} {...props}>
    {children}
  </Flex>
);

export default SiteContainer;
