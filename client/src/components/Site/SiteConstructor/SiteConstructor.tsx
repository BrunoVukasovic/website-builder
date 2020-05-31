import React, { useEffect } from "react";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import SiteService from "../../../services/SiteService";
import Flex from "../../Flex";
import NotFound from "../../../views/NotFound";
import SiteContainer from "../../SiteContainer";
import Footer from "../../Footer";

import { setSite } from "../../../redux/actions/site";
import { selectCurrentSite } from "../../../redux/selectors/site";
import { defaultSite, emptyPage } from "../Site.helpers";
import PageConstructor from "../../Page/PageConstructor";
import { NavbarConstructor } from "../../Navbar";

const SiteConstructor: React.FC = () => {
  const params = useParams<{ site: string; page: string }>();
  const currentSite = useSelector(selectCurrentSite);
  const dispatch = useDispatch();

  useEffect(() => {
    if (params.site) {
      if (params.site !== currentSite.slug) {
        if (params.site === "new-website") {
          dispatch(setSite(defaultSite));
        } else {
          const callApi = async () => {
            try {
              const site = await SiteService.getSite(params.site);
              console.log(site);
              dispatch(setSite({ ...site, currentPage: emptyPage }));
            } catch (err) {
              //@TODO Site not found, ponudi da kreira novi (/new-webisite) ili da vidi svoje posotojece (login)
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
  console.log(slugsAndNames);

  const currentPage = React.useMemo(() => {
    const wantedPage = currentSite.pages.find(
      (page) => page.slug === params.page
    );

    if (!wantedPage) {
      return currentSite.pages[0];
    }

    return wantedPage;
  }, [currentSite.pages, params.page]);
  console.log("const currentPage = React.useMemo");
  console.log(currentPage);

  if (currentPage && currentSite.shouldAllowEditing) {
    return (
      <Flex direction="column" alignItems="center">
        <SiteContainer>
          <NavbarConstructor
            slugsAndNames={slugsAndNames}
            activePageName={currentPage.name}
            siteSlug={params.site}
          />
          <PageConstructor page={currentPage} />
        </SiteContainer>
        <Footer />
      </Flex>
    );
  }

  return <NotFound />;
};

export default SiteConstructor;
