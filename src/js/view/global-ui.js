import React from 'react';
import {addStaticRender} from '../app-renderer';
import LoadingIndicator from './component/loading_indicator';
import DrawerMenu from './component/view-drawer-menu';

let loadingIndicatorRef, drawerMenu;

export function init() {
  addStaticRender(<LoadingIndicator key="100" ref={c=>loadingIndicatorRef = c} />);
  addStaticRender(<DrawerMenu ref={c=>drawerMenu = c} key="101" />)
}

export function getLoadingIndicator() {
  return loadingIndicatorRef;
}

export function visibleDrawerMenu(visible) {
  visible ? drawerMenu.openDrawerMenu() : drawerMenu.closeDrawerMenu();
}
