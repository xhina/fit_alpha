import {ImageRes, TextRes} from '../../res-link';
import Page from '../../route/page';
import StringResource from '../../string-resource';
import AlertModal from '../component/alert-modal';
import { getLoadingIndicator } from '../global-ui';
import Header from '../header/header';
import { PAGE_UID } from '../page-view-manager';
import React from 'react';
import { getStore } from '../../redux/store';

export default class BaseView extends Page {
  constructor(props) {
    super(props);
  }

  get pageUID () {
    return PAGE_UID;
  }

  get store() {
    return getStore();
  }

  attachHeader(title, props) {
    return <Header title={title} {...props} />;
  }

  alert(message, onConfirm) {
    if (this.alertModal == null) {
      return;
    }
    this.alertModal.show(message, onConfirm);
  }

  errorAlert(errorCode) {
    const value = StringResource.hasString(`error${errorCode}`);
    const str = value ? value : this.getString("error_account_api");
    this.alert(str);
  }

  visibleIndicator(visible) {
    getLoadingIndicator().visible(visible);
  }

  attachAlertModal() {
    return React.createElement(AlertModal, {ref:(a) => this.alertModal = a});
  }

  getString(id) {
    return StringResource.get(id);
  }

  get img() {
    return ImageRes;
  }

}
