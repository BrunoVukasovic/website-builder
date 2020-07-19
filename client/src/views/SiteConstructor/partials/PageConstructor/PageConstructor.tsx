import React, { useState, useEffect } from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import PaletteIcon from '@material-ui/icons/Palette';

import { useSnackbar } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import AddSegmentMenu from './AddSegmentMenu';
import EditSegmentMenu from './EditSegmentMenu';
import ImageSizePopover from './ImageSizePopover';
import ImagePositionPopover from './ImagePositionPopover';

import { Spinner, Flex, TextEditor, Modal, ColorPicker } from '../../../../components';
import { selectCurrentPage } from '../../../../redux/selectors/site';
import {
  setCurrentPageToCurrentSite,
  addPageSegment,
  deletePageSegment,
  setCurrentPage,
  movePageSegmentForward,
  movePageSegmentBackwards,
} from '../../../../redux/actions/site';
import { CurrentPage, PageSegment } from '../../../../models';
import { DisplaySegment } from './PageConstructor.helpers';
import { fileToBase64String } from '../../../../utils/shared';
import { useToggle } from 'react-use';

import styles from './page_constructor.module.scss';

export interface PageConstructorProps {
  page: CurrentPage;
}

const PageConstructor: React.FC<PageConstructorProps> = ({ page }) => {
  const [currentSegment, setCurrentSegment] = useState<PageSegment | undefined>(undefined);
  const [anchorElement, setAnchorElement] = useState<HTMLElement | undefined>(undefined);
  const [addSegmentMenuOpen, toggleAddSegmentMenu] = useToggle(false);
  const [textEditorOpen, toggleTextEditor] = useToggle(false);
  const [imagePositionPopoverOpen, toggleImagePositionPopover] = useToggle(false);
  const [imageSizePopoverOpen, toggleImageSizePopover] = useToggle(false);
  const [deleteSegmentModalOpen, toggleDeleteSegmentModal] = useToggle(false);
  const [colorPickerPopoverOpen, toggleColorPickerPopover] = useToggle(false);

  const currentPage = useSelector(selectCurrentPage);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const sortedSegments = React.useMemo(() => currentPage.container.sort((a, b) => a.position - b.position), [
    currentPage.container,
  ]);

  useEffect(() => {
    if (currentPage && currentPage.slug) {
      if (currentPage.slug !== page.slug) {
        dispatch(setCurrentPageToCurrentSite());
        dispatch(setCurrentPage(page));
      }
    } else {
      dispatch(setCurrentPage(page));
    }
    //@NOTE vidi je li ovo potribno
    // return () => {
    //   dispatch(setCurrentPageToCurrentSite());
    // };
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
    let segmentPosition: number | undefined;

    if (currentSegment) {
      segmentPosition = currentSegment.position;

      removeCurrentSegment();
      dispatch(deletePageSegment(currentSegment.position));
    }

    if (files && files[0].size < 500000) {
      try {
        const image = await fileToBase64String(files[0]);
        dispatch(addPageSegment({ content: image, type: 'image', position: segmentPosition }));

        if (!segmentPosition) {
          toggleAddSegmentMenu();
        }
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
    toggleAddSegmentMenu();
  };

  const handleColorPickerClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorElement(e.currentTarget);
    toggleColorPickerPopover();
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

  const handleMoveSegmentClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { currentTarget } = e;

    if (currentSegment) {
      if (currentTarget.id === 'pageSegmentForward' && currentSegment.position < sortedSegments.length) {
        dispatch(movePageSegmentForward(currentSegment.position));
      } else if (currentTarget.id === 'pageSegmentBackwards' && currentSegment.position > 1) {
        dispatch(movePageSegmentBackwards(currentSegment.position));
      }
    }

    removeCurrentSegment();
  };

  const handleTextEditorClose = () => {
    if (currentSegment) {
      removeCurrentSegment();
    }

    toggleTextEditor();
  };

  const removeCurrentSegment = () => {
    setCurrentSegment(undefined);
  };

  if (currentPage) {
    return (
      <Flex
        direction="column"
        style={{ backgroundColor: currentPage.backgroundColor }}
        className={styles.pageContainer}
        flexOut
      >
        <Flex direction="column">
          {sortedSegments.map((item) => (
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
          <Flex>
            <Flex id="addNewSegment" className={styles.addPageSegmentWrapper}>
              <IconButton aria-label="add-page" onClick={handleAddSegmentMenuClick}>
                <AddCircleIcon color="primary" className={styles.addIcon} />
              </IconButton>
            </Flex>
            <Flex className={styles.addPageSegmentWrapper}>
              <IconButton aria-label="color-picker" onClick={handleColorPickerClick}>
                <PaletteIcon color="primary" className={styles.addIcon} />
              </IconButton>
            </Flex>
          </Flex>
          {addSegmentMenuOpen && (
            <AddSegmentMenu
              anchorEl={anchorElement}
              onClose={toggleAddSegmentMenu}
              onAddTextClick={toggleTextEditor}
              onNotSupportedClick={handleNotSupportedClick}
              onImageInputChange={handleAddImageClick}
            />
          )}
          {currentSegment && (
            <EditSegmentMenu
              segmentType={currentSegment.type}
              anchorEl={anchorElement}
              transparent={imageSizePopoverOpen || imagePositionPopoverOpen}
              onClose={removeCurrentSegment}
              onEditTextClick={toggleTextEditor}
              onMoveSegmentClick={handleMoveSegmentClick}
              onImageChange={handleAddImageClick}
              onChangeImagePositionClick={toggleImagePositionPopover}
              onChangeImageSizeClick={toggleImageSizePopover}
              onNotSupportedClick={handleNotSupportedClick}
              onDeleteSegmentClick={toggleDeleteSegmentModal}
            />
          )}
          {textEditorOpen && anchorElement && (
            <TextEditor
              anchorElement={anchorElement}
              initialValue={currentSegment && currentSegment.content}
              itemPosition={currentSegment && currentSegment.position}
              objective={currentSegment ? 'updateSegment' : 'addSegment'}
              onClose={handleTextEditorClose}
            />
          )}
          {imageSizePopoverOpen && currentSegment && anchorElement && (
            <ImageSizePopover
              onClose={toggleImageSizePopover}
              anchorElement={anchorElement}
              segment={{
                position: currentSegment.position,
                width: currentSegment.style && currentSegment.style.content?.width,
                height: currentSegment.style && currentSegment.style.content?.height,
              }}
            />
          )}
          {imagePositionPopoverOpen && currentSegment && anchorElement && (
            <ImagePositionPopover
              onClose={toggleImagePositionPopover}
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
              <p>{t('This action cannot be undone')}</p>
            </Modal>
          )}
          {colorPickerPopoverOpen && anchorElement && (
            <ColorPicker
              onClose={toggleColorPickerPopover}
              coloredArea="page"
              initialValue={currentPage.backgroundColor}
              anchorElement={anchorElement}
            />
          )}
        </Flex>
      </Flex>
    );
  }

  return <Spinner />;
};

export default PageConstructor;
