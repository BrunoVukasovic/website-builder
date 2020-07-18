import React, { useState, useCallback, useEffect } from 'react';
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import MoodBadIcon from '@material-ui/icons/MoodBad';

import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import SiteService from '../../services/SiteService';

import { Spinner, Flex, Input } from '..';
import { setCurrentSite } from '../../redux/actions/site';
import { UpdateSiteReq } from '../../models';
import { CurrentSiteState } from '../../redux/models';

import styles from './save_changes.module.scss';

export interface SaveChangesProps {
  currentSite: CurrentSiteState;
  onClose: () => void;
}

const SaveChanges: React.FC<SaveChangesProps> = ({ currentSite, onClose }) => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSiteUpdated, setIsSiteUpdated] = useState<boolean>(false);
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const origin = React.useMemo(() => window.location.origin, []);

  const handleCopyToClipboardClick = useCallback(() => {
    const siteURLInput = document.getElementById('siteURL') as HTMLInputElement;
    siteURLInput.select();
    document.execCommand('copy');
    enqueueSnackbar('URL copied to clipboard!', { variant: 'success' });
  }, [enqueueSnackbar]);

  useEffect(() => {
    const { deletedPages, pages, oldSlug, slug, title, navbar } = currentSite;
    let payload: UpdateSiteReq = {};

    const updatedPages = pages.filter((page) => page.updatedElements && page._id);
    const newPages = pages.filter((page) => !page._id);

    if (oldSlug !== slug) {
      payload.siteData = {
        title,
        slug,
      };
    }

    if (navbar.isUpdated) {
      const { logo, backgroundColor, menuIconColor } = navbar;

      payload.navbarData = {
        ...(logo && { logo }),
        ...(backgroundColor && { backgroundColor }),
        ...(menuIconColor && { menuIconColor }),
      };
    }

    if (updatedPages.length > 0 || deletedPages || newPages) {
      payload.pagesData = {
        updatedPages,
        deletedPages,
        newPages,
      };
    }

    const callApi = async () => {
      try {
        const updatedSite = await SiteService.updateSite(currentSite.oldSlug, payload);
        console.log(payload);
        if (errorMessage) {
          setErrorMessage('');
        }

        setIsSiteUpdated(true);
        dispatch(setCurrentSite(updatedSite));
      } catch (error) {
        if (error.response || error.request) {
          setErrorMessage('Error.Something went wrong');
        } else {
          setErrorMessage('Error.Check your internet connection');
        }
      }
    };

    callApi();
  }, [currentSite, dispatch, errorMessage]);

  if (isSiteUpdated) {
    return (
      <Flex direction="column">
        <CloudDoneIcon color="primary" className={styles.successIcon} />
        <h2>{`${t('Changes saved successfully!')}`}</h2>
        <p>{`${t('Anyone can view the website')}`}</p>
        <Input id="siteURL" readOnly value={`${origin}/${currentSite.slug}`} />
        <Flex className={styles.buttonContainer}>
          <Button
            size="large"
            variant="outlined"
            color="primary"
            onClick={handleCopyToClipboardClick}
            classes={{ root: styles.cancelBtn }}
          >
            {t('Copy link')}
          </Button>
          <Button size="large" type="submit" variant="contained" color="primary" onClick={onClose}>
            {t('Close')}
          </Button>
        </Flex>
      </Flex>
    );
  }

  if (errorMessage) {
    return (
      <Flex direction="column" alignItems="center">
        <MoodBadIcon color="primary" className={styles.successIcon} />
        <h2 className={styles.errorText}>{t(errorMessage)}</h2>
        <Button size="large" type="submit" variant="contained" color="primary" onClick={onClose}>
          {t('Close')}
        </Button>
      </Flex>
    );
  }

  return <Spinner />;
};

export default SaveChanges;
