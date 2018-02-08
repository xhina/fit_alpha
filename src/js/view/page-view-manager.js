import React from 'react';
import _ from 'lodash';
import BoutiqueMain from './page-view/page-boutique-main';
import ItemTypes from './page-view/page-item-types';
import ItemDetail from './page-view/page-item-detail';

export const PAGE_UID = {
  BOUTIQUE_MAIN : "boutique",
  ITEM_TYPES : "itemTypes",
  ITEM_DETAIL : "itemDetail",
}

function getPageView(pageUID, options) {
  switch(pageUID) {
    case PAGE_UID.BOUTIQUE_MAIN:
      return <BoutiqueMain {...options} topLocatedPage="true" />
    case PAGE_UID.ITEM_TYPES:
      return <ItemTypes {...options} topLocatedPage="true" />
    case PAGE_UID.ITEM_DETAIL:
      return <ItemDetail {...options} />
    default:
      break;
  }
  return null;
}

export function pageViewAdapter() {
  return getPageView;
}
