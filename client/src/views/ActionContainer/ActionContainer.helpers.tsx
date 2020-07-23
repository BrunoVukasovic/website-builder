import React from 'react';

import NotFound from '../NotFound';

import { Auth, SaveChanges, SiteTitleForm } from '../../components';
import { CurrentSiteState } from '../../redux/models';

export interface ActionProps {
  type: string;
  currentSite: CurrentSiteState;
  redirectToSiteConstructor: () => void;
}

export const Action: React.FC<ActionProps> = ({ type, currentSite, redirectToSiteConstructor }) => {
  switch (type) {
    case 'auth':
      return <Auth shouldRedirect />;
    case 'create':
      return currentSite.slug !== 'new-website' ? (
        <SaveChanges currentSite={currentSite} onClose={redirectToSiteConstructor} />
      ) : (
        <SiteTitleForm
          onCancelClick={redirectToSiteConstructor}
          currentSlug="new-website"
          submitButtonText="Create website"
        />
      );
    case 'rename':
      return (
        <SiteTitleForm
          onCancelClick={redirectToSiteConstructor}
          currentSlug={currentSite.slug}
          submitButtonText="Rename"
          initialValues={{
            title: currentSite.title,
            url: `${origin}/${currentSite.slug}`,
          }}
        />
      );
    default:
      return <NotFound />;
  }
};
