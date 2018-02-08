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

  componentDidMount() {
    super.pageRender(this.view());
  }

  view() {
    return (
      <div className="page" id="item-detail">
        {super.attachHeader('PRADA', {detailToolButton:true})}

        <article ref={e=>this.scroll = e} className="pre-scrollable">
          <figure id="img_container">
            <div id="item-img" style={{backgroundImage:`url(${process.env.PUBLIC_URL + "/res/img/item-sample.png"})`}} />
          </figure>
          <nav style={{textAlign:"center"}}>
            <img id="pagination" src={pagination} />
          </nav>

          <Container id="container1">
            <section id="info">
              <div><img src={diamondIcon} /><p>6,210</p></div>
              <div><img src={likeIcon} /><p>+112</p></div>
              <div><p>$32.96</p></div>
            </section>
            <section id="item_desc">
              <h6 id="title">TOP JEAN</h6>
              <p id="desc">
                In a dark blue wash,
                this CKJ denin shirt in slim fit features a
                button-down front with signiture CK metal buttons,
                tone-one-tone denim yokes and two chest pockets with contrastive white flaps.
                The hem is slightly rounded for a casual look.
              </p>
              <p id="tag">#Jean #Calvin_Klein #Tops #Sale_item #Womans_wear</p>
            </section>
          </Container>

          <footer>
            <Container>
              <section id="buy-btn-container">
                <button className="buy-btn fit-btn"><img className="buy-btn-icon" src={diamondIcon} />BUY</button>
                <button className="buy-btn fit-btn"><img className="buy-btn-icon" src={moneyIcon} />BUY</button>
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
