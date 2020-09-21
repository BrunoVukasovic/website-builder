import React, { useEffect } from 'react';

import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useToggle } from 'react-use';

import SiteService from '../../services/SiteService';
import Flex from '../../components/Flex';
import NotFound from '../NotFound';
import SiteContainer from '../../components/SiteContainer';
import Footer from '../../components/Footer';
import NavbarViewer from './partials/NavbarViewer';
import PageViewer from './partials/PageViewer';

import { setSite } from '../../redux/actions/site';
import { selectCurrentSite } from '../../redux/selectors/site';
import { defaultSite, emptyPage } from '../SiteConstructor/Site.helpers';
import { useAuth } from '../../utils/AuthContext';
import { Spinner, MainMenu } from '../../components';

const SiteConstructor: React.FC = () => {
  const [mainMenuOpen, toggleMainMenu] = useToggle(false);
  const [notFound, toggleNotFound] = useToggle(false);
  const params = useParams<{ site: string; page: string }>();
  const currentSite = useSelector(selectCurrentSite);
  const dispatch = useDispatch();
  const history = useHistory();
  const { initUserData, isAuth } = useAuth();

  useEffect(() => {
    if (!isAuth) {
      initUserData();
    }

    if (params.site) {
      if (params.site !== currentSite.slug) {
        if (params.site === 'new-website') {
          dispatch(setSite(defaultSite));
          history.push('/edit/new-website');
        } else {
          const callApi = async () => {
            try {
              const site = await SiteService.getSite(params.site);

              dispatch(setSite({ ...site, currentPage: emptyPage }));
            } catch (err) {
              toggleNotFound(true);
            }
          };

          callApi();
        }
      }
    } else {
      dispatch(setSite(defaultSite));
    }
  }, [params.site, dispatch, initUserData, isAuth, currentSite.slug, toggleNotFound, history]);

  const slugsAndNames = React.useMemo(() => {
    return currentSite.pages.map((page) => {
      return {
        slug: page.slug,
        name: page.name,
      };
    });
  }, [currentSite.pages]);

  const activePage = React.useMemo(() => {
    if (params.page) {
      const wantedPage = currentSite.pages.find((page) => page.slug === params.page);

      if (wantedPage) {
        return wantedPage;
      }
    }

    return currentSite.pages[0];
  }, [currentSite.pages, params.page]);

  const handleEditClick = () => {
    const url = `${window.location.origin}/edit/${params.site}/${params.page ? params.page : ''}`;
    window.open(url, '_blank');
  };

  const handleLoginClick = () => history.push('/action/auth');

  if (currentSite && activePage) {
    return (
      <Flex direction="column" alignItems="center" maxHeight>
        <SiteContainer>
          <NavbarViewer
            slugsAndNames={slugsAndNames}
            activePageSlug={activePage.slug}
            siteSlug={params.site}
            navbarData={currentSite.navbar}
          />
          <PageViewer pageContainer={activePage.container} backgroundColor={activePage.backgroundColor} />
        </SiteContainer>
        {currentSite.shouldAllowEditing && (
          <Footer showMenu onMenuClick={toggleMainMenu} primaryBtnText="Edit" onPrimaryBtnClick={handleEditClick} />
        )}
        {mainMenuOpen && <MainMenu onLoginClick={handleLoginClick} onClose={toggleMainMenu} />}
      </Flex>
    );
  }

  if (notFound) {
    return <NotFound />;
  }

  return <Spinner />;
};

export default SiteConstructor;
