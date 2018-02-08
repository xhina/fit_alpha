import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

class AdbButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lock:true
    }
  }

  isLock() {
    return this.state.lock;
  }

  lock() {
    this.setState({lock:true});
  }

  unlock() {
    this.setState({lock:false});
  }

  render() {
    const classes = this.state.lock ? "button_lock" : "";

    return (
      <Button id="adb_btn" className={classes}>
        {this.props.children}
      </Button>
    );
  }
}

export default AdbButton;
