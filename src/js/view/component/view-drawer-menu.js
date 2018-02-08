import React from 'react';
import { TweenLite, Expo } from 'gsap';
import { go } from '../../route/page-navigator';
import { PAGE_UID } from '../page-view-manager';
import { connect } from 'react-redux';
import { selectGender } from '../../redux/actions';
import { getStore } from '../../redux/store';

const GenderType = {
  man : "man",
  woman : "woman"
}

export default class View extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      category:GenderType.woman
    }
  }

  componentDidMount() {
    this.drawer.style.display = "none";
    this.closeDrawerMenu();
  }

  openDrawerMenu() {
    if (this.tween1) {
      this.tween1.kill();
      this.tween2.kill();
    }
    this.drawer.style.display = "";
    this.drawer.style.opacity = 1;
    TweenLite.to(this.drawer_panel, 0.7, {x:0, ease:Expo.easeOut});
  }

  closeDrawerMenu() {
    this.tween1 = TweenLite.to(this.drawer, .5, {opacity:0, delay:.1, ease:Expo.easeOut, onComplete:()=>this.drawer.style.display="none"});
    this.tween2 = TweenLite.to(this.drawer_panel, .7, {x:-window.innerWidth, ease:Expo.easeOut});
  }

  selectCategory(gender) {
    this.setState({category:gender});
    getStore().dispatch(selectGender(gender));
  }

  gotoFeatured() {
    this.closeDrawerMenu();
    go(PAGE_UID.BOUTIQUE_MAIN);
  }

  gotoItemTypes() {
    this.closeDrawerMenu();
    go(PAGE_UID.ITEM_TYPES);
  }

  render() {
    const womanCategory = this.state.category;
    const womanMenuStyle = womanCategory == "woman" ? {color:"white"} : {color:"rgb(74,74,74)"};
    const manMenuStyle = womanCategory == "man" ? {color:"white"} : {color:"rgb(74,74,74)"};

    return (
      <div ref={e=>this.drawer=e} id="drawer-menu">
        <div id="background-dim" onClick={this.closeDrawerMenu.bind(this)} />
        <div ref={e=>this.drawer_panel=e} id="menu-panel">
          <div id="panel-bg" />
          <div id="category-menu" style={{marginTop:"36px", marginLeft:"15px"}}>
            <h2 onClick={this.selectCategory.bind(this, GenderType.woman)} style={womanMenuStyle}>WOMAN</h2>
            <h2 onClick={this.selectCategory.bind(this, GenderType.man)} style={manMenuStyle}>MAN</h2>
          </div>
          <ul>
            <li onClick={this.gotoFeatured.bind(this)}>FEATURED<div /></li>
            <li>NEW IN</li>
            <li onClick={this.gotoItemTypes.bind(this)}>ITEM TYPES<div /></li>
            <li>HAIR / MAKEUP</li>
            <li>DRESSROOM</li>
            <li>BRAND SHOP</li>
            <li>MAVEN PICK'S</li>
            <li>STYLE MAGAZINE</li>
            <li>SALE</li>
          </ul>
        </div>
      </div>
    );
  }
}
