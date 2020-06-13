import React, { useState, useEffect } from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

import { useSnackbar } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';

import Flex from '../../Flex';
import EditText from '../../EditText';
import AddSegmentDropdownMenu from './partials/AddSegmentDropdownMenu';
import EditSegmentDropdownMenu from './partials/EditSegmentDropdownMenu';

import { selectCurrentPage } from '../../../redux/selectors/site';
import { setCurrentPageToCurrentSite, addPageSegment } from '../../../redux/actions/site';
import { setCurrentPage } from '../../../redux/actions/site';
import { CurrentPage } from '../../../models';
import { initialCurrentSegment, CurrentSegment, DisplaySegment } from './PageConstructor.helpers';
import { fileToBase64String } from '../../../utils/shared';

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
  const { enqueueSnackbar } = useSnackbar();
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

  const handleNotSupportedClick = () => {
    enqueueSnackbar('This feature is not implemented yet.', { variant: 'error' });
  };

  const handleAddImageClick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files) {
      try {
        const image = await fileToBase64String(files[0]);
        console.log(image);
        dispatch(addPageSegment({ content: image, type: 'image' }));
        toggleAddSegmentMenuOpen();
      } catch {
        enqueueSnackbar('Something went wrong while processing image. Please, try again.', { variant: 'error' });
      }
    }
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
      <Flex direction="column" className={styles.pageContainer}>
        <Flex direction="column">
          {currentPage.container.map((item) => (
            <Flex key={item.content} alignSelf="flex-start" alignItems="center" className={styles.editableItem} fluid>
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
              <DisplaySegment segment={item} />
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
              onNotSupportedClick={handleNotSupportedClick}
              onImageInputChange={handleAddImageClick}
            />
          )}
          {currentSegment.anchorElement && !currentSegment.shouldEdit && (
            <EditSegmentDropdownMenu
              anchorEl={currentSegment.anchorElement}
              onClose={removeCurrentSegment}
              onEditClick={handleEditClick}
              onNotSupportedClick={handleNotSupportedClick}
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
