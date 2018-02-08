import {PureComponent} from 'react';
import {Go, GoBack, GoBackEnable} from './page-route-controller';

export function go(pageUID) {
  Go(pageUID);
}

export function goBack() {
  GoBack();
}

export function close() {
  // fuse-bridge : close web modal
}

export function goBackEnable() {
  return GoBackEnable();
}
