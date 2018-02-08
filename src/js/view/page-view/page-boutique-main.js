import React from 'react';
import BaseView from './base-view';
import img1 from "../../../res/img/img00@2x.jpg";

class View extends BaseView {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    super.tweenMode = false;
    super.pageRender(this.view());
  }

  view() {
    return (
      <div className="page" id="boutique-main">
        {super.attachHeader('BOUTIQUE')}

        <div className="pre-scrollable">
          <div id="main-bg">
            <img src={img1} style={{width:"100vw"}} />
          </div>
        </div>
      </div>
    );
  }
}

export default View;