import React, { useEffect, useState } from 'react';

import { useSnackbar } from 'notistack';
import { useParams, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useToggle } from 'react-use';

import PageConstructor from './partials/PageConstructor';
import SiteService from '../../services/SiteService';
import NavbarConstructor from './partials/NavbarConstructor';
import NotFound from '../NotFound';

import { Flex, SiteContainer, Footer, MainMenu, Modal, SaveChanges, Spinner } from '../../components';
import { setSite, setCurrentPageToCurrentSite } from '../../redux/actions/site';
import { selectCurrentSite } from '../../redux/selectors/site';
import { selectUserReducerValues } from '../../redux/selectors/user';
import { defaultSite, emptyPage } from './Site.helpers';
import { useAuth } from '../../utils/AuthContext';

const SiteConstructor: React.FC = () => {
  const [saveChangesModalOpen, toggleSaveChangesModal] = useToggle(false);
  const [mainMenuOpen, toggleMainMenu] = useToggle(false);
  const [authModalOpen, toggleAuthModal] = useToggle(false);
  const [deleteSiteModalOpen, toggleDeleteSiteModal] = useToggle(false);
  const [notFound, setNotFound] = useState<boolean>(false);

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

              if (site) {
                dispatch(setSite({ ...site, currentPage: emptyPage }));
              }
            } catch (err) {
              setNotFound(true);
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
    toggleAuthModal();
    toggleMainMenu();
  };

  // const toggleAuthModalOpen = () => {
  //   setAuthModalOpen(!authModalOpen);
  // };

  // const toggleDeleteSiteModalOpen = () => {
  //   setDeleteSiteModalOpen(!deleteSiteModalOpen);
  // };

  // const toggleMainMenuOpen = () => {
  //   setMainMenuOpen(!mainMenuOpen);
  // };

  // const toggleSaveChangesModalOpen = () => {
  //   setSaveChangesModalOpen(!saveChangesModalOpen);
  // };

  const handleSaveChangesClick = () => {
    dispatch(setCurrentPageToCurrentSite());
    toggleSaveChangesModal();
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
        <Footer onMenuClick={toggleMainMenu} onPrimaryBtnClick={handleSaveChangesClick} showMenu />
        {saveChangesModalOpen &&
          (currentSite.slug === 'new-website' ? (
            <Redirect to="/action/create" />
          ) : (
            <Modal onClose={toggleSaveChangesModal}>
              <SaveChanges currentSite={currentSite} onClose={toggleSaveChangesModal} />
            </Modal>
          ))}
        {mainMenuOpen && (
          <MainMenu
            onLoginClick={handleLoginClick}
            onClose={toggleMainMenu}
            onDeleteSiteClick={toggleDeleteSiteModal}
          />
        )}
        {authModalOpen && (
          // <Modal onClose={toggleAuthModal}>
          //   <Auth closeModal={toggleAuthModal} />
          // </Modal>
          <Redirect to="/action/auth" />
        )}
        {deleteSiteModalOpen && (
          <Modal
            onClose={toggleDeleteSiteModal}
            headerText="Delete whole website?"
            showFooter
            primaryButtonText="Delete"
            secondaryButtonText="Close"
            onSecondaryButtonClick={toggleDeleteSiteModal}
            onPrimaryButtonClick={handleDeleteSite}
          >
            <h2>This action cannot be undone!</h2>
          </Modal>
        )}
      </Flex>
    );
  }

  if (notFound) {
    // @TODO Site not found, ponudi da kreira novi (/new-webisite) ili da vidi svoje posotojece (login)
    return <NotFound />;
  }

  return <Spinner />;
};

export default SiteConstructor;
