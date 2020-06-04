import React, { useState, useEffect } from 'react';

import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Button from '@material-ui/core/Button';

import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentPage } from '../../../redux/selectors/site';
import Flex from '../../Flex';
import EditText from '../../EditText';

import styles from './page_constructor.module.scss';
// import { PageReducerState } from "../../../redux/reducers/page";
import { setCurrentPageToCurrentSite } from '../../../redux/actions/site';
import { setCurrentPage } from '../../../redux/actions/site';
import { CurrentPage } from '../../../models';
import { initialCurrentSegment, CurrentSegment } from './PageConstructor.helpers';

export interface PageConstructorProps {
  page: CurrentPage;
}

const PageConstructor: React.FC<PageConstructorProps> = ({ page }) => {
  const [currentSegment, setCurrentSegment] = useState<CurrentSegment>(initialCurrentSegment);
  const currentPage = useSelector(selectCurrentPage);
  const dispatch = useDispatch();

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

  const onOpenMenuClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { id } = event.currentTarget;
    const clickedSegmentPosition = parseInt(id, 10);
    const clickedSegment = currentPage.container.find((segment) => segment.position === clickedSegmentPosition);

    if (clickedSegment) {
      setCurrentSegment({
        ...clickedSegment,
      });
    }
  };

  const onEditClick = () => {
    setCurrentSegment({
      ...currentSegment,
      shouldEdit: true,
    });
  };

  const removeCurrentSegment = () => {
    setCurrentSegment(initialCurrentSegment);
  };

  if (currentPage) {
    return (
      <Flex direction="column">
        <Flex direction="column">
          <button
            onClick={() => {
              console.log(currentSegment);
            }}
          >
            Click me
          </button>
          {currentPage.container.map((item) => (
            <Flex key={item.content} alignSelf="flex-start" alignItems="center" className={styles.editableItem}>
              {(item.position !== currentSegment.position || !currentSegment.shouldEdit) && (
                <Flex className={styles.content} dangerouslySetInnerHTML={{ __html: item.content }} />
              )}
              {item.position === currentSegment.position && currentSegment.shouldEdit && (
                <EditText
                  action="updateSegment"
                  initialValue={item.content}
                  itemPosition={item.position}
                  closeEditor={removeCurrentSegment}
                />
              )}

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

                {item.position === currentSegment.position && !currentSegment.shouldEdit && (
                  <Flex alignItems="flex-start" direction="column">
                    <Button onClick={onEditClick} color="primary" size="small" startIcon={<MoreHorizIcon />}>
                      Edit
                    </Button>
                    <Button color="primary" size="small" startIcon={<ExpandLessIcon />}>
                      Move up
                    </Button>
                    <Button color="primary" size="small" startIcon={<ExpandMoreIcon />}>
                      Move down
                    </Button>
                    <Button id="delete" color="secondary" size="small" startIcon={<DeleteForeverIcon />}>
                      Delete
                    </Button>
                  </Flex>
                )}
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Flex>
    );
  }

  return <p>Loading</p>;
};

export default PageConstructor;
