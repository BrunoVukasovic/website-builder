import React from 'react';
import cx from 'classnames';

import { Button, Popover, IconButton, PopoverProps } from '@material-ui/core';

import { useTranslation } from 'react-i18next';

import Flex from '../Flex';

import styles from './toggle.module.scss';
import { useToggle } from 'react-use';

export interface ToggleProps {
  firstOptionText: string;
  secondOptionText: string;
  className?: string;
  secondOptionSelected?: boolean;
}

const Toggle: React.FC<ToggleProps> = ({ firstOptionText, secondOptionText, secondOptionSelected, className }) => {
  const [firstOptionSelected, toggleFirstOptionSelected] = useToggle(!secondOptionSelected);
  const { t } = useTranslation();

  return (
    <Flex className={cx(styles.toggle, className)}>
      <Button
        color="primary"
        variant={firstOptionSelected ? 'contained' : 'outlined'}
        onClick={toggleFirstOptionSelected}
        className={styles.option}
      >
        {t(firstOptionText)}
      </Button>
      <Button
        color="primary"
        variant={firstOptionSelected ? 'outlined' : 'contained'}
        onClick={toggleFirstOptionSelected}
        className={styles.option}
      >
        {t(secondOptionText)}
      </Button>
    </Flex>
  );
};

export default Toggle;
