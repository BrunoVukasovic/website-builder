import React, { useState, useEffect } from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

import { useSelector, useDispatch } from 'react-redux';

import Flex from '../../Flex';
import EditText from '../../EditText';
import AddSegmentDropdownMenu from './partials/AddSegmentDropdownMenu';
import EditSegmentDropdownMenu from './partials/EditSegmentDropdownMenu';

import { selectCurrentPage } from '../../../redux/selectors/site';
import { setCurrentPageToCurrentSite } from '../../../redux/actions/site';
import { setCurrentPage } from '../../../redux/actions/site';
import { CurrentPage } from '../../../models';
import { initialCurrentSegment, CurrentSegment } from './PageConstructor.helpers';

import styles from './page_constructor.module.scss';

export interface PageConstructorProps {
  page: CurrentPage;
}

const PageConstructor: React.FC<PageConstructorProps> = ({ page }) => {
  const [currentSegment, setCurrentSegment] = useState<CurrentSegment>(initialCurrentSegment);
  const [addSegmentMenuOpen, setAddSegmentMenuOpen] = useState<boolean>(false);
  const [addTextSegmentOpen, setAddTextSegmentOpen] = useState<boolean>(false);
  const currentPage = useSelector(selectCurrentPage);
  const dispatch = useDispatch();
  const addNewSegmentBtn = document.getElementById('addNewSegment') as HTMLElement | undefined;

  useEffect(() => {
    if (currentPage && currentPage.slug) {
      if (currentPage.slug !== page.slug) {
        dispatch(setCurrentPageToCurrentSite());
        dispatch(setCurrentPage(page));

        if (currentSegment.content) {
          setCurrentSegment(initialCurrentSegment);
        }
      }
    } else {
      dispatch(setCurrentPage(page));

      if (currentSegment.content) {
        setCurrentSegment(initialCurrentSegment);
      }
    }

    return () => {
      dispatch(setCurrentPageToCurrentSite());
    };
  }, [page, currentPage, dispatch]);

  const handleEditClick = () => {
    setCurrentSegment({
      ...currentSegment,
      shouldEdit: true,
    });
  };

  const onOpenMenuClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { currentTarget } = e;
    const clickedSegmentPosition = parseInt(currentTarget.id, 10);
    const clickedSegment = currentPage.container.find((segment) => segment.position === clickedSegmentPosition);

    if (clickedSegment) {
      setCurrentSegment({
        ...clickedSegment,
        anchorElement: currentTarget,
      });
    }
  };

  const removeCurrentSegment = () => {
    setCurrentSegment(initialCurrentSegment);
  };

  const toggleAddTextSegmentOpen = () => {
    setAddTextSegmentOpen(!addTextSegmentOpen);
  };

  const handleAddTextClick = () => {
    toggleAddTextSegmentOpen();
    setAddSegmentMenuOpen(false);
  };

  const toggleAddSegmentMenuOpen = () => {
    setAddSegmentMenuOpen(!addSegmentMenuOpen);
  };

  if (currentPage) {
    return (
      <Flex direction="column">
        <Flex direction="column">
          {currentPage.container.map((item) => (
            <Flex key={item.content} alignSelf="flex-start" alignItems="center" className={styles.editableItem}>
              <Flex className={styles.content} dangerouslySetInnerHTML={{ __html: item.content }} />
              <Flex className={styles.editBtnContainer}>
                <IconButton
                  id={`${item.position}`}
                  onClick={onOpenMenuClick}
                  color="primary"
                  aria-label="edit"
                  className={styles.expandEditMenuBtn}
                >
                  <EditIcon />
                </IconButton>
              </Flex>
            </Flex>
          ))}
          <Flex id="addNewSegment" className={styles.addPageSegmentWrapper}>
            <IconButton aria-label="add-page" onClick={toggleAddSegmentMenuOpen}>
              <AddCircleIcon color="primary" className={styles.addIcon} />
            </IconButton>
          </Flex>
          {addSegmentMenuOpen && (
            <AddSegmentDropdownMenu
              anchorEl={addNewSegmentBtn}
              onClose={toggleAddSegmentMenuOpen}
              onAddTextClick={handleAddTextClick}
            />
          )}
          {currentSegment.anchorElement && !currentSegment.shouldEdit && (
            <EditSegmentDropdownMenu
              anchorEl={currentSegment.anchorElement}
              onClose={removeCurrentSegment}
              onEditClick={handleEditClick}
            />
          )}
          {currentSegment.shouldEdit && (
            <EditText
              anchorElement={currentSegment.anchorElement}
              initialValue={currentSegment.content}
              itemPosition={currentSegment.position}
              action="updateSegment"
              onCloseEditor={removeCurrentSegment}
            />
          )}
          {addTextSegmentOpen && (
            <EditText anchorElement={addNewSegmentBtn} action="addSegment" onCloseEditor={toggleAddTextSegmentOpen} />
          )}
        </Flex>
      </Flex>
    );
  }

  return <p>Loading</p>;
};

export default PageConstructor;
