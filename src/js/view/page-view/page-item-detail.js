import React from 'react';
import BaseView from './base-view';
import diamondIcon from "../../../res/img/icoDiamond@2x.png";
import likeIcon from "../../../res/img/icoSp@2x.png";
import likeFriendImg from "../../../res/img/img03@2x.png";
import pagination from "../../../res/img/imgPagination@2x.png";
import moneyIcon from "../../../res/img/icoMoney_b@2x.png";


import { TweenLite, Power4 } from 'gsap';
import { Container } from 'reactstrap';


class View extends BaseView {

  constructor(props) {
    super(props);
    this.buyBtn1, this.buyBtn2, this.ownedBtn = null;
    this.itemData = super.store.getState().itemData;
  }

  componentDidMount() {
    this.changePurchaseStatus();
    super.componentDidMount();
  }

  changePurchaseStatus() {
    if (this.checkOwnedItem()) {
      this.buyBtn1.style.display = "none";
      this.buyBtn2.style.display = "none";
      this.ownedBtn.style.display = "inline-block";
    }
    else {
      this.buyBtn1.style.display = "inline-block";
      this.buyBtn2.style.display = "inline-block";
      this.ownedBtn.style.display = "none";
    }
  }

  checkOwnedItem() {
    return false;
  }

  render() {
    return super.render(this.view());
  }

  view() {
    return (
      <div className="page" id="item-detail">
        {super.attachHeader(this.itemData.brand, {detailToolButton:true})}

        <article ref={e=>this.scroll = e} className="pre-scrollable">
          <figure id="img_container">
            <div id="item-img" style={{backgroundImage:`url(${process.env.PUBLIC_URL + "/res/img/Large/"+ this.itemData.large_iamge})`}} />
          </figure>
          <nav style={{textAlign:"center"}}>
            <img id="pagination" src={pagination} />
          </nav>

          <Container id="container1">
            <section id="info">
              <div><img src={diamondIcon} /><p>{this.itemData.pricegem}</p></div>
              <div><img src={likeIcon} /><p>+{Math.floor(Math.random() * 2001)}</p></div>
              <div><p>${this.itemData.pricemoney}</p></div>
            </section>
            <section id="item_desc">
              <h6 id="title">{this.itemData.name}</h6>
              <p id="desc">
                {this.itemData.description}
              </p>
              <p id="tag">#Jean #Calvin_Klein #Tops #Sale_item #Womans_wear</p>
            </section>
          </Container>

          <footer>
            <Container>
              <section  id="buy-btn-container">
                <button ref={e=>this.buyBtn1=e} className="buy-btn fit-btn"><img className="buy-btn-icon" src={diamondIcon} />BUY</button>
                <button ref={e=>this.buyBtn2=e} className="buy-btn fit-btn"><img className="buy-btn-icon" src={moneyIcon} />BUY</button>
                <button ref={e=>this.ownedBtn=e} className="owned-btn fit-btn"><img className="buy-btn-icon" src={moneyIcon} />OWNED</button>
              </section>

                <img id="like-it-friends" src={likeFriendImg} />
            </Container>
          </footer>

          <div id="fixed_footer">
            <button className="fit-btn" id="basket-btn">ADD TO SHOPPING BASKET</button>
          </div>
        </article>
      </div>
    );
  }
}

export default View;
