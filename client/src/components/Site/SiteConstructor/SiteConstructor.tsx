import React, { useEffect, useState } from 'react';

import { useSnackbar } from 'notistack';
import { useParams, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import SiteService from '../../../services/SiteService';
import Flex from '../../Flex';
import NotFound from '../../../views/NotFound';
import SiteContainer from '../../SiteContainer';
import Footer from '../../Footer';
import MainMenu from '../partials/MainMenu';
import Auth from '../../Auth/Auth';
import PageConstructor from '../../Page/PageConstructor';
import Modal from '../../Modal/Modal';
import SaveChanges from '../../SaveChanges';
import CreateSite from '../../CreateSite';

import { setSite, setCurrentPageToCurrentSite } from '../../../redux/actions/site';
import { selectCurrentSite } from '../../../redux/selectors/site';
import { defaultSite, emptyPage } from '../Site.helpers';
import { NavbarConstructor } from '../../Navbar';
import { useAuth } from '../../../utils/AuthContext';
import { selectUserReducerValues } from '../../../redux/selectors/user';

const SiteConstructor: React.FC = () => {
  const [saveChangesModalOpen, setSaveChangesModalOpen] = useState<boolean>(false);
  const [mainMenuOpen, setMainMenuOpen] = useState<boolean>(false);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [deleteSiteModalOpen, setDeleteSiteModalOpen] = useState<boolean>(false);
  const currentSite = useSelector(selectCurrentSite);
  const user = useSelector(selectUserReducerValues);
  const params = useParams<{ site: string; page: string }>();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { initUserData, isAuth } = useAuth();

  useEffect(() => {
    if (!isAuth) {
      initUserData();
    }

    if (params.site) {
      if (params.site !== currentSite.slug) {
        if (params.site === 'new-website') {
          dispatch(setSite(defaultSite));
        } else {
          const callApi = async () => {
            try {
              const site = await SiteService.getSite(params.site);

              dispatch(setSite({ ...site, currentPage: emptyPage }));
            } catch (err) {
              // @TODO Site not found, ponudi da kreira novi (/new-webisite) ili da vidi svoje posotojece (login)
              return <NotFound />;
            }
          };

          callApi();
        }
      }
    } else {
      dispatch(setSite(defaultSite));
    }
  }, [params.site, currentSite.slug, dispatch, initUserData, isAuth]);

  const pagesData = React.useMemo(
    () =>
      currentSite.pages.map((page) => {
        return {
          slug: page.slug,
          name: page.name,
          id: page._id,
        };
      }),
    [currentSite.pages]
  );

  const currentPage = React.useMemo(() => {
    const wantedPage = currentSite.pages.find((page) => page.slug === params.page);

    if (!wantedPage) {
      return currentSite.pages[0];
    }

    return wantedPage;
  }, [currentSite.pages, params.page]);

  const handleDeleteSite = () => {
    const callApi = async () => {
      try {
        const otherSites = user.allSites.filter((site) => site.slug !== currentSite.slug);

        await SiteService.deleteSite(currentSite.slug);
        enqueueSnackbar('Website deleted successfully.', { variant: 'success' });

        if (otherSites.length > 0) {
          window.open(`${window.location.origin}/edit/${otherSites[0].slug}`, '_self');
        } else {
          window.open(`${window.location.origin}/edit/new-website`, '_self');
        }
      } catch (error) {
        if (error.response || error.request) {
          enqueueSnackbar('Something went wrong. Please, try again.', { variant: 'error' });
        } else {
          enqueueSnackbar('Something went wrong. Please, check your internet connection and try again.', {
            variant: 'error',
          });
        }
      }
    };

    callApi();
  };

  const handleLoginClick = () => {
    toggleAuthModalOpen();
    toggleMainMenuOpen();
  };

  const toggleAuthModalOpen = () => {
    setAuthModalOpen(!authModalOpen);
  };

  const toggleDeleteSiteModalOpen = () => {
    setDeleteSiteModalOpen(!deleteSiteModalOpen);
  };

  const toggleMainMenuOpen = () => {
    setMainMenuOpen(!mainMenuOpen);
  };

  const toggleSaveChangesModalOpen = () => {
    setSaveChangesModalOpen(!saveChangesModalOpen);
  };

  const handleSaveChangesClick = () => {
    dispatch(setCurrentPageToCurrentSite());
    toggleSaveChangesModalOpen();
  };

  if (currentPage && currentSite.shouldAllowEditing) {
    return (
      <Flex direction="column" alignItems="center" maxHeight>
        <SiteContainer>
          <NavbarConstructor
            pagesData={pagesData}
            activePageSlug={currentPage.slug}
            siteSlug={params.site}
            navbarData={currentSite.navbar}
          />
          <PageConstructor page={currentPage} siteBackgroundColor={currentSite.backgroundColor} />
        </SiteContainer>
        <Footer onMenuClick={toggleMainMenuOpen} onPrimaryBtnClick={handleSaveChangesClick} />
        {/* {saveChangesModalOpen && (
          <Modal onClose={handleSaveChangesClose}>
            {currentSite.slug === 'new-website' && (
              <CreateSite closeModal={toggleSaveChangesModalOpen} onCancelClick={toggleSaveChangesModalOpen} />
            )}
            {currentSite.slug !== 'new-website' && (
              <SaveChanges currentSite={currentSite} onCloseClick={toggleSaveChangesModalOpen} />
            )}
          </Modal>
        )} */}
        {saveChangesModalOpen &&
          (currentSite.slug === 'new-website' ? (
            <Redirect to="/create" />
          ) : (
            <Modal onClose={toggleSaveChangesModalOpen}>
              <SaveChanges currentSite={currentSite} onCloseClick={toggleSaveChangesModalOpen} />
            </Modal>
          ))}
        {mainMenuOpen && (
          <MainMenu
            onLoginClick={handleLoginClick}
            onClose={toggleMainMenuOpen}
            onDeleteSiteClick={toggleDeleteSiteModalOpen}
          />
        )}
        {authModalOpen && (
          <Modal onClose={toggleAuthModalOpen}>
            <Auth closeModal={toggleAuthModalOpen} />
          </Modal>
        )}
        {deleteSiteModalOpen && (
          <Modal
            onClose={toggleDeleteSiteModalOpen}
            headerText="Delete whole website?"
            showFooter
            primaryButtonText="Delete"
            secondaryButtonText="Close"
            onSecondaryButtonClick={toggleDeleteSiteModalOpen}
            onPrimaryButtonClick={handleDeleteSite}
          >
            <h2>This action cannot be undone!</h2>
          </Modal>
        )}
      </Flex>
    );
  }

  return <NotFound />;
};

export default SiteConstructor;
