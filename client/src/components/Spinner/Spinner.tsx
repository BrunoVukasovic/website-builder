import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import Flex from '../Flex';

import styles from './spinner.module.scss';

const Spinner: React.FC = () => (
  <Flex direction="column" justifyContent="center" alignItems="center" fluid maxHeight>
    <CircularProgress className={styles.progress} />
    <h4 className={styles.loading}>Loading</h4>
  </Flex>
);

export default Spinner;
