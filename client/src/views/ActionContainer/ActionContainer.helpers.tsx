import React from 'react';

import { Redirect } from 'react-router-dom';

import NotFound from '../NotFound';

import { Auth, SaveChanges, SiteTitleForm } from '../../components';
import { CurrentSiteState } from '../../redux/models';

export interface ActionProps {
  type: string;
  currentSite: CurrentSiteState;
  redirectToSiteConstructor: () => void;
  isAuth: boolean;
  className?: string;
}

export const Action: React.FC<ActionProps> = ({ type, currentSite, redirectToSiteConstructor, isAuth, className }) => {
  switch (type) {
    case 'auth':
      return isAuth ? <Redirect to="/" /> : <Auth shouldRedirect className={className} />;
    case 'create':
      return currentSite.slug !== 'new-website' ? (
        <SaveChanges currentSite={currentSite} onClose={redirectToSiteConstructor} className={className} />
      ) : (
        <SiteTitleForm
          onCancelClick={redirectToSiteConstructor}
          currentSlug="new-website"
          submitButtonText="Create website"
          className={className}
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
          className={className}
        />
      );
    default:
      return <NotFound />;
  }
};
