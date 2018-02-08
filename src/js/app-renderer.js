import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import _ from 'lodash';

let dynamicRender = [];
let staticRender = [];
let instanceRef;
let instance;

export function addRender(page) {
  if (page == null) return;
  dynamicRender.push(page);
}

export function removeAllRender() {
  dynamicRender.length = 0;
}

export function removeRenderPop() {
  dynamicRender = _.dropRight(dynamicRender);
}

export function addStaticRender(comp) {
  staticRender.push(comp);
}

export function getRenderElements() {
  return _.concat(staticRender, dynamicRender);
}

export function renderTrigger() {
  instanceRef.renderTrigger();
}

export function RenderComponent() {
  if (instance == null) {
    instance = React.createElement(AppRenderer, {ref : c=>instanceRef=c});
  }
  return instance;
}

class AppRenderer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      renderHash : "",
    };
  }

  renderTrigger() {
    this.setState({renderHash:_.random(Number.MAX_SAFE_INTEGER)});
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" render={() => getRenderElements()} />
          <Route exact path="/oauth_kakao" render={() => getRenderElements()} />
          <Route exact path="/oauth_fb" render={() => getRenderElements()} />
          <Route exact path="/oauth_cancel_fb" render={() => getRenderElements()} />
          <Route exact path="/pwchange" render={() => getRenderElements()} />
        </div>
      </Router>
    )
  }

}

export default AppRenderer;
