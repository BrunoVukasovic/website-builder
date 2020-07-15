import React from 'react';

import NotFound from '../NotFound';

import { Auth, Flex, SaveChanges, SiteTitleForm } from '../../components';

import styles from './action_container.module.scss';
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
        <SaveChanges currentSite={currentSite} onCloseClick={redirectToSiteConstructor} />
      ) : (
        <SiteTitleForm
          onCancelClick={redirectToSiteConstructor}
          action="create"
          currentSlug="new-website"
          submitButtonText="Create site"
        />
      );
    case 'rename':
      return (
        <SiteTitleForm
          onCancelClick={redirectToSiteConstructor}
          action="create"
          currentSlug={currentSite.slug}
          submitButtonText="Rename site"
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
