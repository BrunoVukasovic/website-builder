import React, { useEffect } from 'react';

import { useParams, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import SiteService from '../../services/SiteService';
import Flex from '../../components/Flex';
import NotFound from '../NotFound';
import SiteContainer from '../../components/SiteContainer';
import Footer from '../../components/Footer';
import NavbarViewer from '../NavbarViewer';
import PageViewer from '../PageViewer';

import { setSite } from '../../redux/actions/site';
import { selectCurrentSite } from '../../redux/selectors/site';
import { defaultSite, emptyPage } from '../SiteConstructor/Site.helpers';
import { useAuth } from '../../utils/AuthContext';

const SiteConstructor: React.FC = () => {
  const params = useParams<{ site: string; page: string }>();
  const currentSite = useSelector(selectCurrentSite);
  const dispatch = useDispatch();
  const { initUserData, isAuth } = useAuth();

  useEffect(() => {
    if (params.site) {
      if (params.site !== currentSite.slug) {
        if (params.site === 'new-website') {
          dispatch(setSite(defaultSite));
        } else {
          const callApi = async () => {
            try {
              if (!isAuth) {
                initUserData();
              }

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
  }, [params.site, dispatch, initUserData, isAuth]);

  const slugsAndNames = React.useMemo(() => {
    return currentSite.pages.map((page) => {
      return {
        slug: page.slug,
        name: page.name,
      };
    });
  }, [currentSite.pages]);

  const currentPage = React.useMemo(() => {
    const activePage = currentSite.pages.find((page) => page.slug === params.page);

    if (!activePage) {
      return currentSite.pages[0];
    }

    return activePage;
  }, [currentSite.pages, params.page]);

  const handleEditClick = () => {
    const url = `${window.location.origin}/edit/${params.site}/${params.page ? params.page : ''}`;
    window.open(url, '_blank');
  };

  currentPage && console.log(currentPage.container);
  if (currentSite && currentPage) {
    return (
      <Flex direction="column" alignItems="center" maxHeight>
        <SiteContainer>
          <NavbarViewer
            slugsAndNames={slugsAndNames}
            activePageSlug={currentPage.slug}
            siteSlug={params.site}
            navbarData={currentSite.navbar}
          />
          <PageViewer pageContainer={currentPage.container} backgroundColor={currentPage.backgroundColor} />
        </SiteContainer>
        {currentSite.shouldAllowEditing && <Footer primaryBtnText="Edit" onPrimaryBtnClick={handleEditClick} />}
      </Flex>
    );
  }

  return <NotFound />;
};

export default SiteConstructor;
