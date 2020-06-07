import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import SiteService from '../../../services/SiteService';
import Flex from '../../Flex';
import NotFound from '../../../views/NotFound';
import SiteContainer from '../../SiteContainer';
import Footer from '../../Footer';

import { setSite, setCurrentPageToCurrentSite } from '../../../redux/actions/site';
import { selectCurrentSite } from '../../../redux/selectors/site';
import { defaultSite, emptyPage } from '../Site.helpers';
import PageConstructor from '../../Page/PageConstructor';
import { NavbarConstructor } from '../../Navbar';
import Modal from '../../Modal/Modal';
import SaveChanges from '../../SaveChanges';
import CreateSite from '../../CreateSite';
import { useAuth } from '../../../utils/AuthContext';

const SiteConstructor: React.FC = () => {
  const [saveChangesModalOpen, setSaveChangesModalOpen] = useState<boolean>(false);
  const currentSite = useSelector(selectCurrentSite);
  const params = useParams<{ site: string; page: string }>();
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
  }, [params.site]);

  const slugsAndNames = React.useMemo(
    () =>
      currentSite.pages.map((page) => {
        return {
          slug: page.slug,
          name: page.name,
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
          <NavbarConstructor slugsAndNames={slugsAndNames} activePageName={currentPage.name} siteSlug={params.site} />
          <PageConstructor page={currentPage} />
        </SiteContainer>
        {saveChangesModalOpen && (
          <Modal onClose={toggleSaveChangesModalOpen}>
            {currentSite.slug === 'new-website' && <CreateSite onCancelClick={toggleSaveChangesModalOpen} />}
            {currentSite.slug !== 'new-website' && <SaveChanges currentSite={currentSite} />}
          </Modal>
        )}
        <Footer onPrimaryBtnClick={handleSaveChangesClick} />
      </Flex>
    );
  }

  return <NotFound />;
};

export default SiteConstructor;
