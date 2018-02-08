import React from 'react';
import {ImageRes} from '../../res-link';

class view extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible:false
    }
  }

  visible(flag) {
    this.setState({visible:flag});
  }

  render() {
    if (!this.state.visible) return null;

    return (
      <div id="indicator">
        <img src={ImageRes.loding_indicator} alt="" />
      </div>
    );
  }
}

export default view;
