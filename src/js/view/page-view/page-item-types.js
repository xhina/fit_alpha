import React from 'react';
import BaseView from './base-view';
import topImage from "../../../res/img/featuredImg@2x.jpg";
import filter_icon from "../../../res/img/btnCategory@2x.png";
import { TweenLite, Power4 } from 'gsap';
import GetItemDB from '../../data/item-database';

let categoryTitles = [];
let itemList = [];
let navMenuRef = []

class View extends BaseView {

  constructor(props) {
    super(props);
    super.tweenMode = false;
    this.categoryGender = "woman";

    this.dataSet();
    super.pageRender(this.view());
    this.onCategorySelect(categoryTitles[0], 0);

    super.store.subscribe(()=> {
      this.categoryGender = super.store.getState().gender;
      this.dataSet();
      super.renderTick(this.view());
      this.onCategorySelect(categoryTitles[0], 0);
    });
  }

  dataSet() {
    this.db = GetItemDB();
    const gender = this.categoryGender;
    const data = this.db.getCategoryTypes(gender)
    this.categoryDB = data;

    categoryTitles.length = 0;
    for (let obj in data) {
      categoryTitles.push(obj);
    };
  }

  componentDidMount() {
    this.setItemSectionScrollBound();
  }

  setItemSectionScrollBound() {
    let offset = window.innerHeight - this.itemSectionContainer.offsetTop;
    this.itemSectionContainer.style.height = `${offset}px`
  }

  onSelectItem(itemData) {
    super.navigator.go(super.pageUID.ITEM_DETAIL);
  }

  onCategorySelect(category, idx) {
    for (let t in this.categoryDB) {
      if (t !== category) {
        continue;
      }
      itemList = this.categoryDB[t];
      break;
    }

    for (let i = 0;i < navMenuRef.length;i++) {
      if (i == idx) continue;
      if (navMenuRef[i] == null) continue;
      navMenuRef[i].unSelect();
    }
    super.renderTick(this.view());
  }

  view() {
    navMenuRef = [];

    return (
      <div className="page" id="item-types">
        {super.attachHeader('BOUTIQUE')}
        <img id="top-image" src={topImage} />

        <article>
          <header style={{marginTop:"8px"}}>
            <img src={filter_icon} />
            <p>ITEM TYPES</p>
          </header>

          <nav className="pre-scrollable">
            <ul>
              {
                categoryTitles.map((n, idx)=>{
                  return <NavMenu ref={e=>{
                    navMenuRef[idx] = e;
                  }} key={idx} index={idx} title={n} onSelect={this.onCategorySelect.bind(this)} />
                })
              }
            </ul>
          </nav>
          <div ref={e=>this.itemSectionContainer=e} id="item-section-container" className="pre-scrollable">
            <section id="item-section">
              {
                itemList.map((data, idx)=>{
                  return <Item onSelect={this.onSelectItem.bind(this)} key={idx} itemData={data} />
                })
              }
            </section>
          </div>
        </article>
      </div>
    );
  }
}

export default View;

class NavMenu extends React.Component {
  componentDidMount() {
    this.selector.style.opacity = 0;
  }

  select() {
    TweenLite.to(this.selector, .6, {opacity:1, ease:Power4.easeOut});
  }

  unSelect() {
    TweenLite.to(this.selector, .6, {opacity:0, ease:Power4.easeOut});
  }

  onSelect() {
    this.select();
    if (this.props.onSelect != null) {
      this.props.onSelect(this.props.title, this.props.index);
    }
  }

  render() {
    return(
      <div className="nav-menu" onClick={this.onSelect.bind(this)}>
        <li>
          {this.props.title}
        </li>
        <div ref={e=>this.selector=e} id="selector" />
      </div>
    );
  }
}

class Item extends React.Component {
  onSelectItem(e) {
    this.props.onSelect();
  }

  render() {
    const data = this.props.itemData;

    return(
      <figure className="item" onClick={this.onSelectItem.bind(this)}>
        <img id="item-thumbnail" src={process.env.PUBLIC_URL + "/res/img/Small/" + data.small_iamge} />
        <figcaption>
          <p>{this.props.title}</p>
          <p>COTTON POPLIN DRESS</p>
          <div>
            <img />
            <p>100$</p>
          </div>
        </figcaption>
      </figure>
    );
  }
}
