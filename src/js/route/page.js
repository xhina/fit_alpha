import {getUserData} from '../user-data';
import * as Navigator from './page-navigator';
import {Expo, TweenLite} from 'gsap';
import PropTypes from 'prop-types';
import React from 'react';

function screenSize() {
  return window.innerWidth;
}

let inputLock = false;
window.addEventListener('touchmove', (e)=>{
  if (inputLock == true) {
    e.preventDefault();
  }
});

export default class Page extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      transitionType : "",
      renderToggle:false
    };
    this.transitionType = "";
    this.tweenMode = this.props.topLocatedPage ? false : true;
    this.onTransitionFinish = this.onTransitionFinish.bind(this);
  }

  componentDidMount() {
    this.pageGo();
  }

  set tweenMode(value) {
    this.tweenEnable = value;
  }

  get navigator() {
    return Navigator;
  }

  renderTick() {
    this.setState({renderToggle:!this.state.renderToggle});
  }

  pageGo() {
    this.transitionType = "go";
    this.setState({transitionType:"go"});
    this.tween({x:screenSize() + 15}, {x:0});
  }

  pageBack() {
    this.transitionType = "back";
    this.setState({transitionType:"back"});
    this.tween({x:0}, {x:screenSize() + 15});
  }

  pageIn() {
    this.transitionType = "in";
    this.setState({transitionType:"in"});
  }

  pageOut() {
    this.transitionType = "out";
    this.setState({transitionType:"out"});
  }

  tween(fromArg, toArg) {
    if (this.container == null || !this.tweenEnable || !getUserData().appEnv.transitionMode) {
      this.onTransitionFinish();
      return;
    }
    TweenLite.from(this.container, 0.7, {...fromArg, onStart:this.onTransitionStart});
    TweenLite.to(this.container, 0.7, {...toArg, ease:Expo.easeOut, onComplete:this.onTransitionFinish});
  }

  onTransitionStart() {
    inputLock = true;
  }

  onTransitionFinish() {
    inputLock = false;
    const type = this.transitionType;
    
    if (type === "back" && this.props.onFinishBack != null) {
      this.props.onFinishBack();
    }
    else if (type === "go" && this.props.onFinishGo != null) {
      this.props.onFinishGo();
    }
  }

  render(view) {
    let visible = this.state.transitionType === "out" ? "hidden" : "visible";

    return (
      <div className="page-container" ref={e=>this.container=e} style={{visibility:visible}}>
        {view}
      </div>
    );
  }
}

Page.propTypes = {
    onFinishBack:PropTypes.func,
    onFinishGo:PropTypes.func
}
