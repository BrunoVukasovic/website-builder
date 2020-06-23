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
import ImageSizePopover from './partials/ImageSizePopover';
import ImagePositionPopover from './partials/ImagePositionPopover';

import { selectCurrentPage } from '../../../redux/selectors/site';
import { setCurrentPageToCurrentSite, addPageSegment, deletePageSegment } from '../../../redux/actions/site';
import { setCurrentPage } from '../../../redux/actions/site';
import { CurrentPage, PageSegment } from '../../../models';
import { CurrentSegment, DisplaySegment } from './PageConstructor.helpers';
import { fileToBase64String } from '../../../utils/shared';

import styles from './page_constructor.module.scss';
import Modal from '../../Modal';

export interface PageConstructorProps {
  page: CurrentPage;
}

const PageConstructor: React.FC<PageConstructorProps> = ({ page }) => {
  const [currentSegment, setCurrentSegment] = useState<PageSegment | undefined>(undefined);
  const [anchorElement, setAnchorElement] = useState<HTMLElement | undefined>(undefined);
  const [addSegmentMenuOpen, setAddSegmentMenuOpen] = useState<boolean>(false);
  const [textEditorOpen, setTextEditorOpen] = useState<boolean>(false);
  const [imagePositionPopoverOpen, setImagePositionPopoverOpen] = useState<boolean>(false);
  const [imageSizePopoverOpen, setImageSizePopoverOpen] = useState<boolean>(false);
  const [deleteSegmentModalOpen, setDeleteSegmentModalOpen] = useState<boolean>(false);
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

  const deleteSegment = () => {
    if (currentSegment) {
      dispatch(deletePageSegment(currentSegment.position));
      setCurrentSegment(undefined);
    }
  };

  const handleNotSupportedClick = () => {
    enqueueSnackbar('This feature is not implemented yet.', { variant: 'error' });
  };

  const handleAddImageClick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files[0].size < 500000) {
      try {
        const image = await fileToBase64String(files[0]);
        dispatch(addPageSegment({ content: image, type: 'image' }));
        toggleAddSegmentMenuOpen();
      } catch {
        enqueueSnackbar('Something went wrong while processing image. Please, try again.', { variant: 'error' });
      }
    } else {
      enqueueSnackbar(
        `Maximum size per image is 500 KB. This image has ${files && Math.round(files[0].size / 100)} KB`,
        {
          variant: 'error',
        }
      );
    }
  };

  const handleAddSegmentMenuClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorElement(e.currentTarget);
    toggleAddSegmentMenuOpen();
  };

  const handleChangeImageSize = () => {
    toggleImageSizePopoverOpen();
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

  const toggleDeleteSegmentModal = () => {
    setDeleteSegmentModalOpen(!deleteSegmentModalOpen);
  };

  const toggleImagePositionPopoverOpen = () => {
    setImagePositionPopoverOpen(!imagePositionPopoverOpen);
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
              <Flex
                className={currentSegment && currentSegment.position === item.position ? styles.transparent : undefined}
              >
                <IconButton
                  id={`${item.position}`}
                  onClick={handleEditSegmentMenuClick}
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
              transparent={imageSizePopoverOpen || imagePositionPopoverOpen}
              onClose={removeCurrentSegment}
              onEditTextClick={toggleTextEditorOpen}
              onChangeImagePositionClick={toggleImagePositionPopoverOpen}
              onChangeImageSizeClick={toggleImageSizePopoverOpen}
              onNotSupportedClick={handleNotSupportedClick}
              onDeleteSegmentClick={toggleDeleteSegmentModal}
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
          {imageSizePopoverOpen && currentSegment && (
            <ImageSizePopover
              onClose={toggleImageSizePopoverOpen}
              anchorElement={anchorElement}
              segment={{
                position: currentSegment.position,
                width: currentSegment.style && currentSegment.style.content?.width,
                height: currentSegment.style && currentSegment.style.content?.height,
              }}
            />
          )}
          {imagePositionPopoverOpen && currentSegment && (
            <ImagePositionPopover
              onClose={toggleImagePositionPopoverOpen}
              anchorElement={anchorElement}
              segment={{
                position: currentSegment.position,
                horizontalPosition: currentSegment.style && currentSegment.style.wrapper?.position,
              }}
            />
          )}
          {deleteSegmentModalOpen && currentSegment && (
            <Modal
              onClose={toggleDeleteSegmentModal}
              headerText="Delete page segment?"
              showFooter
              primaryButtonText="Delete"
              secondaryButtonText="Close"
              onSecondaryButtonClick={toggleDeleteSegmentModal}
              onPrimaryButtonClick={deleteSegment}
            >
              <p>This action cannot be undone.</p>
            </Modal>
          )}
        </Flex>
      </Flex>
    );
  }

  return <p>Loading</p>;
};

export default PageConstructor;
