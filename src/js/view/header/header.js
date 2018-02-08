import React from 'react';
import { Nav,NavItem,NavLink } from 'reactstrap';
import * as Navigator from '../../route/page-navigator';
import PropTypes from 'prop-types';
import {visibleDrawerMenu} from '../global-ui';

class HeaderView extends React.Component {

  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  changeLeftBarButton() {
    if (Navigator.goBackEnable()) {
      return <div id="back_button" />;
    }
    else {
      return <div id="drawer_menu" />;
    }
  }

  onClickLeftNavButton() {
    if (Navigator.goBackEnable()) {
      Navigator.goBack();
    }
    else {
      visibleDrawerMenu(true);
    }
  }

  render() {
    const mainToolbar = !this.props.detailToolButton;

    return (
      <Nav id="header" className={"justify-content-center",  "nav-fill"} style={{alignItems:"center"}}>
        <NavItem style={{width:'30%'}}>
          <NavLink href="#" className="text-left" onClick={this.onClickLeftNavButton}>
            {this.changeLeftBarButton()}
          </NavLink>
        </NavItem>
        <NavItem style={{width:'40%'}}>
          <NavLink><p>{this.props.title}</p></NavLink>
        </NavItem>
        <NavItem style={{width:'30%'}}>
          <NavLink href="#" style={{display:"flex", justifyContent:"flex-end"}}>
            {
              mainToolbar ?
                <React.Fragment>
                  <div id="search_menu" style={{marginRight:"10px"}}/><div id="cart_menu" />
                </React.Fragment> :
                <React.Fragment>
                  <div id="share_menu" style={{marginRight:"10px"}}/><div id="favorite_menu" style={{marginRight:"10px"}}/><div id="cart_menu" />
                </React.Fragment>
            }
          </NavLink>
        </NavItem>
      </Nav>
    );
  }
}

HeaderView.defaultProps = {
  title : '',
  left : '',
  right : ''
};

HeaderView.propTypes = {
  title : PropTypes.string,
  left : PropTypes.string,
  right : PropTypes.string,
};

export default HeaderView;
