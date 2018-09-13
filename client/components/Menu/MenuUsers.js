import React, { Component, PropTypes } from "react";
import Marquee from 'react-marquee';
import Container from 'client/style/Container';
import User from 'common/schemas/state/User';
import conf from 'common/conf';
import TwitterLi from 'client/components/Menu/TwitterLi';

export default class MenuUsers extends Component {

  renderFriendLiLabel( name, icon, connection ){
    const { style } = this.props.state;
    const href = `/${connection}`;
    const label = connection ?
      (<div style={ style.menu.namesAddConnection }>
          <Marquee
            text={name}
            loop={true}
            hoverToStop={false}
            trailing={0}
            leading={0}
          />
          <Marquee
            text={connection}
            loop={true}
            hoverToStop={false}
            trailing={0}
            leading={0}
          />
      </div>) :
      (<div style={ style.menu.names }><br />{ name }</div>) ;

    return(
      <a style={ style.menu.wrap } href={ href } >
        <div style={style.menu.imgWrap}>
          <img style={ style.menu.img } src={ icon } />
        </div>
        { label }
      </a>
    );
  }

 	render() {
    const { style } = this.props.state;
		return (
      <div style={ style.menuUsers.self}>
        <ol style={ style.menuUsers.columns }>
          <TwitterLi label={ this.renderFriendLiLabel( 'mirazle', 'https://pbs.twimg.com/profile_images/1725640801/baba_bigger.png', '/news.yahoo.co.jp' ) } isLast={ false } {...this.props.state} />
          <TwitterLi label={ this.renderFriendLiLabel( 'fukuty.sho', 'https://pbs.twimg.com/profile_images/927155774937186304/8I_6Wp0c_bigger.jpg', '/twitter.com/fukutys' ) } isLast={ false } {...this.props.state} />
          <TwitterLi label={ this.renderFriendLiLabel( '自由になりたいあなたへ', 'https://pbs.twimg.com/profile_images/890932897170898944/yIEPHR9C_bigger.jpg', '/zozo.jp/shop/zozo/goods/30242481/?did=53352188&rid=1004' ) } isLast={ false } {...this.props.state} />
          <TwitterLi label={ this.renderFriendLiLabel( '古谷 沙綾香', 'https://pbs.twimg.com/profile_images/946122762396999680/zOCsFkrw_bigger.jpg', '/www.microsoft.com/ja-jp/p/surface-pro/8nkt9wttrbjk/HXL2' ) } isLast={ false } {...this.props.state} />
          <TwitterLi label={ this.renderFriendLiLabel( 'ベンチャータイムス', 'https://pbs.twimg.com/profile_images/589975861878661121/yPshjOKb_bigger.jpg' ) } isLast={ false } {...this.props.state} />
          <TwitterLi label={ this.renderFriendLiLabel( 'ｎａｈｏ', 'https://pbs.twimg.com/profile_images/753595099590762497/u3y4bddq_bigger.jpg' ) } isLast={ false } {...this.props.state} />
          <TwitterLi label={ this.renderFriendLiLabel( 'takayukii', 'https://pbs.twimg.com/profile_images/815378347618205697/d9qS-g6z_bigger.jpg' ) } isLast={ false } {...this.props.state} />
          <TwitterLi label={ this.renderFriendLiLabel( '柳本　顕', 'https://pbs.twimg.com/profile_images/753735960316121088/8_Pf8eTu_bigger.jpg' ) } isLast={ false } {...this.props.state} />
          <TwitterLi label={ this.renderFriendLiLabel( 'yukki', 'https://pbs.twimg.com/profile_images/378800000561520910/39aa6d3e3e119c25136ed1de40705294_bigger.jpeg' ) } isLast={ false } {...this.props.state} />
          <TwitterLi label={ this.renderFriendLiLabel( 'さくら剛', 'https://pbs.twimg.com/profile_images/913411791287345152/BWboXDW2_bigger.jpg' ) } isLast={ false } {...this.props.state} />
          <TwitterLi label={ this.renderFriendLiLabel( '南野真太郎(MTRo)', 'https://pbs.twimg.com/profile_images/1519836653/EAAD6F43-D430-476B-916A-2EBF05114616_bigger' ) } isLast={ false } {...this.props.state} />
          <TwitterLi label={ this.renderFriendLiLabel( 'sk', 'https://pbs.twimg.com/profile_images/27767372/e__-1_bigger.png' ) } isLast={ false } {...this.props.state} />
          <TwitterLi label={ '⇨ LOGIN FACEBOOK' }  isLast={ false } onClick={this.handleOnClickLoginFacebook}  {...this.props.state} />
          <TwitterLi label={ '⇨ LOGIN TWITTER' }  isLast={ true } onClick={ ()=>{location.href = "https://session.talkn.io/twitter/auth"}}  {...this.props.state} />
        </ol>
      </div>
		);
 	}
}
