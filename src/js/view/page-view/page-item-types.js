import filter_icon from "../../../res/img/btnCategory@2x.png";
import topImage from "../../../res/img/featuredImg@2x.jpg";
import GetItemDB from '../../data/item-database';
import { selectItem } from '../../redux/actions';
import BaseView from './base-view';
import { Power4, TweenLite } from 'gsap';
import React from 'react';

class View extends BaseView {

  constructor(props) {
    super(props);
    super.tweenMode = false;
    this.state.itemList = [];
    this.itemList = [];
    this.navMenuRef = [];
    this.itemRef = [];
    this.categoryTitles = [];
    this.db = GetItemDB();
    this.dataSet(super.store.getState().gender);

    this.unsubscribe = super.store.subscribe(()=> {
      let state = super.store.getState();
      if (state.type != "change_gender") {
        return;
      }
      this.dataSet(state.gender);
      super.renderTick();
      this.selectDefaultMenu();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
    super.eventController.removeUnityToolbarEvent();
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
    super.eventController.addUnityToolbarEvent(this.itemSectionContainer);
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

    this.itemSectionContainer.scrollTop = 0;
  }

  render() {
    return super.render(this.view());
  }

  view() {
    this.navMenuRef = [];
    this.itemRef = [];

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
                  return <Item onSelect={this.onSelectItem.bind(this)} key={idx} itemData={data} ref={e=>this.itemRef.push(e)} />
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

  componentDidMount() {
    this.thumbnail.style.opacity = 0;
  }

  shouldComponentUpdate() {
    this.thumbnail.style.opacity = 0;
    return true;
  }

  onSelectItem(e) {
    this.props.onSelect(this.props.itemData);
  }

  dispose() {
    this.thumbnail.style.visibility = "hidden";
  }

  render() {
    const data = this.props.itemData;
    let src;
    let img = new Image();
    img.onload = (e) => {
      this.thumbnail.src = e.target.src;
      TweenLite.to(this.thumbnail, .4, {delay:.1, opacity:1});
    }
    img.src = process.env.PUBLIC_URL + "/res/img/Large/" + data.large_iamge;

    return(
      <figure className="item" onClick={this.onSelectItem.bind(this)}>
        <div id="thumbnailContainer">
          <img ref={e=>this.thumbnail=e} id="item-thumbnail" src={img} />
        </div>
        <figcaption>
          <p id="text0">{this.props.itemData.brand}</p>
          <p id="text1">{this.props.itemData.name}</p>
          <div>
            <img id="cash_icon" />
            <p>100$</p>
          </div>
        </figcaption>
      </figure>
    );
  }
}
