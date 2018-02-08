import { RenderComponent } from './js/app-renderer';
import GetItemDB from './js/data/item-database';
import { bindPageViewAdapter } from './js/route/page-component-factory';
import { Go } from './js/route/page-route-controller';
import { init as initGlobalUI } from './js/view/global-ui';
import { pageViewAdapter, PAGE_UID } from './js/view/page-view-manager';
import React, {Component} from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { getStore } from './js/redux/store'

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    GetItemDB().init(() => this.initAPP());
  }

  initAPP() {
    bindPageViewAdapter(pageViewAdapter());
    initGlobalUI();
    this.setDefaultPage();
  }

  setDefaultPage() {
    // Go(PAGE_UID.BOUTIQUE_MAIN);
    Go(PAGE_UID.ITEM_TYPES);
    // Go(PAGE_UID.ITEM_DETAIL);
  }

  render() {
    return (
      <Provider store={getStore()}>
        <div>
          {RenderComponent()}
        </div>
      </Provider>
    );
  }
}

export default App;
