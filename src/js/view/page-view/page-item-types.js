import React from 'react';
import BaseView from './base-view';
import topImage from "../../../res/img/featuredImg@2x.jpg";
import filter_icon from "../../../res/img/btnCategory@2x.png";
import { TweenLite, Power4 } from 'gsap';
import GetItemDB from '../../data/item-database';
import { selectItem } from '../../redux/actions';

class View extends BaseView {

  constructor(props) {
    super(props);
    super.tweenMode = false;
    this.state.itemList = [];
    this.itemList = [];
    this.navMenuRef = [];
    this.categoryTitles = [];
    this.db = GetItemDB();
    this.dataSet();

    super.store.subscribe(()=> {
      let state = super.store.getState();
      if (state.type != "change_gender") {
        return;
      }
      this.dataSet(state.gender);
      super.renderTick();
      this.selectDefaultMenu();
    });
  }

  dataSet(gender) {
    const data = this.db.getCategoryTypes(gender);
    this.categoryDB = data;

    this.categoryTitles.length = 0;
    for (let obj in data) {
      this.categoryTitles.push(obj);
    };
  }

  selectDefaultMenu() {
    this.onCategorySelect(this.categoryTitles[0], 0);
  }

  componentDidMount() {
    this.setItemSectionScrollBound();
    super.componentDidMount();
    this.selectDefaultMenu();
  }

  setItemSectionScrollBound() {
    let offset = window.innerHeight - this.itemSectionContainer.offsetTop;
    this.itemSectionContainer.style.height = `${offset}px`
  }

  onSelectItem(itemData) {
    super.store.dispatch(selectItem(itemData));
    super.navigator.go(super.pageUID.ITEM_DETAIL);
  }

  onCategorySelect(category, idx) {
    for (let t in this.categoryDB) {
      if (t !== category) {
        continue;
      }
      this.itemList = this.categoryDB[t];
      break;
    }

    this.navMenuRef[idx].selectedEffect();
    for (let i = 0;i < this.navMenuRef.length;i++) {
      if (i == idx) continue;
      if (this.navMenuRef[i] == null) continue;
      this.navMenuRef[i].unSelectedEffect();
    }
    super.renderTick();
  }

  render() {
    return super.render(this.view());
  }

  view() {
    this.navMenuRef = [];

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
                this.categoryTitles.map((n, idx)=>{
                  return <NavMenu ref={e=>{
                    this.navMenuRef[idx] = e;
                  }} key={idx} index={idx} title={n} onSelect={this.onCategorySelect.bind(this)} />
                })
              }
            </ul>
          </nav>
          <div ref={e=>this.itemSectionContainer=e} id="item-section-container" className="pre-scrollable">
            <section id="item-section">
              {
                this.itemList.map((data, idx)=>{
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

  selectedEffect() {
    TweenLite.to(this.selector, .6, {opacity:1, ease:Power4.easeOut});
  }

  unSelectedEffect() {
    TweenLite.to(this.selector, .6, {opacity:0, ease:Power4.easeOut});
  }

  onSelect() {
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
    this.props.onSelect(this.props.itemData);
  }

  render() {
    const data = this.props.itemData;

    return(
      <figure className="item" onClick={this.onSelectItem.bind(this)}>
        <img id="item-thumbnail" src={process.env.PUBLIC_URL + "/res/img/Small/" + data.small_iamge} />
        <figcaption>
          <p id="text0">{this.props.itemData.name}</p>
          <p id="text1">{this.props.itemData.brand}</p>
          <div>
            <img />
            <p>100$</p>
          </div>
        </figcaption>
      </figure>
    );
  }
}
