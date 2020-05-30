import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import SiteService from "../../../services/SiteService";
import Flex from "../../Flex";
import NotFound from "../../../views/NotFound";
import SiteContainer from "../../SiteContainer";
import Footer from "../../Footer";
import NavbarViewer from "../../Navbar/NavbarViewer";

import { setSite } from "../../../redux/actions/site";
import { selectCurrentSite } from "../../../redux/selectors/site";
import { PageViewer } from "../../Page";
import { defaultSite } from "../Site.helpers";

const SiteConstructor: React.FC = () => {
  const params = useParams<{ site: string; page: string }>();
  const currentSite = useSelector(selectCurrentSite);
  const [shouldAllowEditing, setShouldAllowEditing] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("UseEffect params.site");
    if (params.site) {
      if (params.site === "new-website") {
        setShouldAllowEditing(true);
        dispatch(setSite(defaultSite));
      } else {
        const callApi = async () => {
          try {
            const site = await SiteService.getSite(params.site);
            console.log(site);
            dispatch(setSite(site));

            if (site.shouldAllowEditing) {
              setShouldAllowEditing(true);
            }
          } catch (err) {
            //@TODO Site not found, ponudi da kreira novi (/new-webisite) ili da vidi svoje posotojece (login)
            return <NotFound />;
          }
        };

        callApi();
      }
    } else {
      setShouldAllowEditing(true);
      dispatch(setSite(defaultSite));
    }
  }, [params.site]);

  const slugsAndNames = React.useMemo(() => {
    // const { pages } = currentSite;
    return currentSite.pages.map((page) => {
      return {
        slug: page.slug,
        name: page.name,
      };
    });
  }, [currentSite.pages]);
  console.log(slugsAndNames);

  const currentPage = React.useMemo(() => {
    const activePage = currentSite.pages.find(
      (page) => page.slug === params.page
    );

    if (!activePage) {
      return currentSite.pages[0];
    }

    return activePage;
  }, [currentSite.pages, params.page]);
  console.log(currentPage);

  if (currentPage) {
    return (
      <Flex direction="column" alignItems="center">
        <SiteContainer>
          <NavbarViewer
            slugsAndNames={slugsAndNames}
            activePageName={currentPage.name}
            siteSlug={params.site}
          />
          <PageViewer pageContainer={currentPage.container} />
        </SiteContainer>
        {shouldAllowEditing && <Footer buttonText="Edit" />}
      </Flex>
    );
  }

  return <NotFound />;
};

export default SiteConstructor;
