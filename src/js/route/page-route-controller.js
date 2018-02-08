import BrowserHistory from './browser-history';
import Page from './page';
import {getUserData} from '../user-data';
import { createPageComponent, getReactRef } from './page-component-factory';
import RenderQueue, { addRender, removeRenderPop, getRenderElements, renderTrigger, removeAllRender } from '../app-renderer';

const ROUTE_routeBlockING_TIME = 750;
const HISTORY = new BrowserHistory();
let routeBlock = false;

export const RoutePage = (pageUID) => {
  HISTORY.go(pageUID);
  Route(createPageComponent(pageUID, {onFinishPageBack:RouteBack}));
};

const throttleRoute = ()=> {
  if (!getUserData().appEnv.transitionMode) {
    return;
  }
  routeBlock = true;
  setTimeout(()=>routeBlock = false, ROUTE_routeBlockING_TIME);
};

const Route = (page)=> {
  addRender(page);
  renderTrigger();
};

const RouteBack = ()=> {
  removeRenderPop();
  renderTrigger();
};

export const Go = (pageUID)=> {
  if (routeBlock) return;

  const page = createPageComponent(pageUID,
    { onFinishGo:()=> {
      const prev = HISTORY.prev();
      if (prev != null) {
        const prevRef = getReactRef(prev);
        prevRef.pageOut();
      }
  }, onFinishBack:RouteBack});

  if (page.props.topLocatedPage) {
    removeAllRender();
    HISTORY.reset();
  }

  HISTORY.go(pageUID)
  Route(page);
  throttleRoute();
};

export const GoBack = ()=> {
  if (routeBlock) return;
  if (!GoBackEnable()) return;

  const goBackRef = getReactRef(HISTORY.current());
  const pageIn = HISTORY.goBack();
  const pageInRef = pageIn ? getReactRef(pageIn) : null;

  if (goBackRef.isPageRenderMode()) {
    throttleRoute();
    goBackRef.pageBack();
    if (pageInRef) pageInRef.pageIn();
  }
  else {
    RouteBack();
  }
};

export const GoBackEnable = () => HISTORY.goBackEnable();
