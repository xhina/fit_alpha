import React, {Component} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class AlertModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible:false
    };
    this.toggle = this.toggle.bind(this);
  }

  show(body, onConfirm) {
    this.body = body ? body : this.props.body;
    this.onConfirm = onConfirm;
    this.setState({visible: true});
  }

  toggle() {
    this.setState({visible: !this.state.visible});
    if (this.state.visible && this.onConfirm) {
      this.onConfirm();
    }
  }

  render() {
    return (
      <Modal id="alert-modal" isOpen={this.state.visible} toggle={this.toggle.bind(this)} style={{display:'flex', height:'90%', alignItems:'center', justifyContent:'center'}}>
        <ModalBody className="justify-content-center">
          <p>{this.body}</p>
        </ModalBody>
        <ModalFooter className="justify-content-center">
          <p onClick={this.toggle} style={{cursor:'pointer'}}>확인</p>
        </ModalFooter>
      </Modal>
    );
  }
}


export default AlertModal;
