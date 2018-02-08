import React from 'react';
import PropTypes from 'prop-types';

import {
  Row,
  Col,
  Label,
  Input,
  FormGroup
} from 'reactstrap';

class AdbInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      resetVisible:false,
      warning:false,
    }
  }

  resetValue() {
    if (this.target == null) return;
    this.target.value = "";
    this.onChange();
  }

  onChange(e) {
    if (e != null) {
      this.target = e.target;
    }
    if (this.props.onChange != null) {
      this.props.onChange(e ? e : null);
    }
    this.setState({resetVisible: e != null && e.target.value.length>0});
  }

  onBlur(e) {
    if (this.props.onBlur != null) {
      this.props.onBlur();
    }
  }

  warning(flag) {
    if (this.target == null) {
      return;
    }
    this.setState({warning:flag});
  }

  componentDidMount() {
    this.resetEl = document.querySelector("#reset_btn");
  }

  get value() {
    return this.target != null ? this.target.value : "";
  }

  render() {
    const inputType = this.props.type;
    let inputLength = 50;
    if (inputType == "password") inputLength = 12;
    else if (inputType == "name") inputLength = 16;

    const visibleResetBtn = this.state.resetVisible ? "visible" : "hidden";
    const warningStyle = this.state.warning ? {color:"red"} : {};

    return (
      <FormGroup id="adb_input_formgroup">
        <Row>
          <Col id="col_label">
            <Label for={this.props.type}>{this.props.label_title}</Label>
          </Col>
          <Col id="col_input">
            <Input style={warningStyle} type={this.props.type} id={this.props.type} onChange={this.onChange.bind(this)} onBlur={this.onBlur.bind(this)} placeholder={this.props.email_placeholder} maxLength={inputLength} required />
          </Col>
          <Col id="col_reset" onClick={this.resetValue.bind(this)}>
            <div id="reset_btn" style={{visibility:visibleResetBtn}} />
          </Col>
        </Row>
      </FormGroup>
    );
  }
}

export default AdbInput;

AdbInput.propTypes = {
  type: PropTypes.string,
  email_placeholder: PropTypes.string,
  label_title:PropTypes.string,
  maxLength:PropTypes.number,
}
