import React, { useState, useEffect } from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { useSnackbar } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';

import Flex from '../../Flex';
import EditText from '../../EditText';
import AddSegmentDropdownMenu from './partials/AddSegmentDropdownMenu';
import EditSegmentDropdownMenu from './partials/EditSegmentDropdownMenu';
import ImageSizePopover from './partials/ImageSizePopover';

import { selectCurrentPage } from '../../../redux/selectors/site';
import { setCurrentPageToCurrentSite, addPageSegment } from '../../../redux/actions/site';
import { setCurrentPage } from '../../../redux/actions/site';
import { CurrentPage, PageSegment } from '../../../models';
import { CurrentSegment, DisplaySegment } from './PageConstructor.helpers';
import { fileToBase64String } from '../../../utils/shared';

import styles from './page_constructor.module.scss';

export interface PageConstructorProps {
  page: CurrentPage;
}

const PageConstructor: React.FC<PageConstructorProps> = ({ page }) => {
  const [currentSegment, setCurrentSegment] = useState<PageSegment | undefined>(undefined);
  const [anchorElement, setAnchorElement] = useState<HTMLElement | undefined>(undefined);
  const [addSegmentMenuOpen, setAddSegmentMenuOpen] = useState<boolean>(false);
  const [textEditorOpen, setTextEditorOpen] = useState<boolean>(false);
  const [imageSizePopoverOpen, setImageSizePopoverOpen] = useState<boolean>(false);
  const currentPage = useSelector(selectCurrentPage);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (currentPage && currentPage.slug) {
      if (currentPage.slug !== page.slug) {
        dispatch(setCurrentPageToCurrentSite());
        dispatch(setCurrentPage(page));
      }
    } else {
      dispatch(setCurrentPage(page));
    }

    return () => {
      dispatch(setCurrentPageToCurrentSite());
    };
  }, [page, currentPage, dispatch]);

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

  const handleAddSegmentMenuClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorElement(e.currentTarget);
    toggleAddSegmentMenuOpen();
  };

  const handleEditSegmentMenuClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { currentTarget } = e;
    const clickedSegmentPosition = parseInt(currentTarget.id, 10);
    const clickedSegment = currentPage.container.find((segment) => segment.position === clickedSegmentPosition);

    if (clickedSegment) {
      setCurrentSegment({
        ...clickedSegment,
      });
      setAnchorElement(currentTarget);
    }
  };

  const handleTextEditorClose = () => {
    if (currentSegment) {
      removeCurrentSegment();
    }

    toggleTextEditorOpen();
  };

  const removeCurrentSegment = () => {
    setCurrentSegment(undefined);
  };

  const toggleAddSegmentMenuOpen = () => {
    setAddSegmentMenuOpen(!addSegmentMenuOpen);
  };

  const toggleImageSizePopoverOpen = () => {
    setImageSizePopoverOpen(!imageSizePopoverOpen);
  };

  const toggleTextEditorOpen = () => {
    setTextEditorOpen(!textEditorOpen);
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
                  onClick={handleEditSegmentMenuClick}
                  color="primary"
                  aria-label="edit"
                  className={styles.expandEditMenuBtn}
                >
                  <CloseIcon />
                </IconButton>
              </Flex>
              <DisplaySegment segment={item} />
            </Flex>
          ))}
          <Flex id="addNewSegment" className={styles.addPageSegmentWrapper}>
            <IconButton aria-label="add-page" onClick={handleAddSegmentMenuClick}>
              <AddCircleIcon color="primary" className={styles.addIcon} />
            </IconButton>
          </Flex>
          {addSegmentMenuOpen && (
            <AddSegmentDropdownMenu
              anchorEl={anchorElement}
              onClose={toggleAddSegmentMenuOpen}
              onAddTextClick={toggleTextEditorOpen}
              onNotSupportedClick={handleNotSupportedClick}
              onImageInputChange={handleAddImageClick}
            />
          )}
          {currentSegment && (
            <EditSegmentDropdownMenu
              segmentType={currentSegment.type}
              anchorEl={anchorElement}
              onClose={removeCurrentSegment}
              onEditTextClick={toggleTextEditorOpen}
              onChangeImageSizeClick={toggleImageSizePopoverOpen}
              onNotSupportedClick={handleNotSupportedClick}
            />
          )}
          {textEditorOpen && (
            <EditText
              anchorElement={anchorElement}
              initialValue={currentSegment && currentSegment.content}
              itemPosition={currentSegment && currentSegment.position}
              action={currentSegment ? 'updateSegment' : 'addSegment'}
              onCloseEditor={handleTextEditorClose}
            />
          )}
        </Flex>
      </Flex>
    );
  }

  return <p>Loading</p>;
};

export default PageConstructor;
