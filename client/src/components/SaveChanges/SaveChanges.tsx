import React, { useState, useCallback, useEffect } from 'react';
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import MoodBadIcon from '@material-ui/icons/MoodBad';

import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Button } from '@material-ui/core';

import Flex from '../Flex';
import SiteService from '../../services/SiteService';
import Input from '../Input';

import { UpdateSiteReq } from '../../models';
import { CurrentSiteState } from '../../redux/models';

import styles from './save_changes.module.scss';
import { setSite, setCurrentSite } from '../../redux/actions/site';

export interface SaveChangesProps {
  currentSite: CurrentSiteState;
  onCloseClick: () => void;
}

const SaveChanges: React.FC<SaveChangesProps> = ({ currentSite, onCloseClick }) => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSiteUpdated, setIsSiteUpdated] = useState<boolean>(false);
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
    let payload: UpdateSiteReq = {};
    const deletedPages = currentSite.deletedPages && currentSite.deletedPages.filter((page) => page);
    const updatedPages = currentSite.pages.filter((page) => page.updatedElements && page._id);
    const newPages = currentSite.pages.filter((page) => !page._id);

    if (currentSite.oldSlug !== currentSite.slug) {
      payload.siteData = {
        title: currentSite.title,
        slug: currentSite.slug,
      };
    }

    if (currentSite.navbar.isUpdated) {
      payload.navbarData = {
        logo: currentSite.navbar.logo,
        backgroundColor: currentSite.navbar.backgroundColor,
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
        console.log(payload);
        const updatedSite = await SiteService.updateSite(currentSite.oldSlug, payload);

        if (errorMessage) {
          setErrorMessage('');
        }

        setIsSiteUpdated(true);
        dispatch(setCurrentSite(updatedSite));
      } catch (error) {
        if (error.response || error.request) {
          setErrorMessage('Something went wrong. Please, try again.');
        } else {
          setErrorMessage('Something went wrong. Please, check your internet connection and try again.');
        }
      }
    };

    callApi();
  }, []);

  if (!errorMessage && !isSiteUpdated) {
    return <Flex>Loading...</Flex>;
  }

  if (isSiteUpdated) {
    return (
      <Flex direction="column">
        <CloudDoneIcon color="primary" className={styles.successIcon} />
        <h2>Changes saved successfully!</h2>
        <p>Anyone can view site by typing link bellow in the browser, but only you can make changes.</p>
        <Input id="siteURL" readOnly value={`${origin}/${currentSite.slug}`} />
        <Flex className={styles.buttonContainer}>
          <Button
            size="large"
            variant="outlined"
            color="primary"
            onClick={handleCopyToClipboardClick}
            classes={{ root: styles.cancelBtn }}
          >
            Copy Link
          </Button>
          <Button size="large" type="submit" variant="contained" color="primary" onClick={onCloseClick}>
            Close
          </Button>
        </Flex>
      </Flex>
    );
  }

  if (errorMessage) {
    return (
      <Flex direction="column" alignItems="center">
        <MoodBadIcon color="primary" className={styles.successIcon} />
        <h2 className={styles.errorText}>{errorMessage}</h2>
        <Button size="large" type="submit" variant="contained" color="primary" onClick={onCloseClick}>
          Close
        </Button>
      </Flex>
    );
  }

  return <Flex>Loading...</Flex>;
};

export default SaveChanges;
