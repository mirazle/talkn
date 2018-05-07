import conf from 'client/conf';
import React, { Component, PropTypes } from "react"
import User from 'common/schemas/state/User';
import MenuLi from 'client/components/MenuLi';
import Icon from './Icon';

export default class Menu extends Component {

  constructor(props) {
    super(props);
    this.handleOnClickchildrenThreadView = this.handleOnClickchildrenThreadView.bind(this);
    this.handleOnClickLoginTwitter = this.handleOnClickLoginTwitter.bind(this);
    this.handleOnClickLoginFacebook = this.handleOnClickLoginFacebook.bind(this);
  }

  getDecolationProps(){
    return {
      onMouseOver: () => {
        this.setState(
          { style:
            {...this.state.style,
              self: { ...this.state.style.self,
                transition: '200ms',
                transform: 'scale( 1.05 )',
                cursor: 'pointer',
              }
            }
          }
        );
      },
      onMouseLeave: () => {
        this.setState( {style:
          {...this.state.style,
            self: { ...this.state.style.self,
              transition: '600ms',
              transform: 'scale( 1 )',
              cursor: 'default',
            }
          }
        });
      },
      onMouseDown: () => {
        this.setState( {style:
          {...this.state.style,
            self: { ...this.state.style.self,
              transform: 'scale( 1 )',
              cursor: 'pointer',
            }
          }
        });
      },
      onMouseUp: () => {
        this.setState( {style:
          {...this.state.style,
            self: { ...this.state.style.self,
              transform: 'scale( 1.05 )',
              cursor: 'pointer',
            }
          }
        });
      },
    }
  }

  handleOnClickchildrenThreadView(){
    const{ app } = this.props.state;
    const childrenThreadView = app.childrenThreadView ? false : true ;

    if( app.isOpenNotif ){
      this.props.closeNotif();
    }

    talknAPI.onClickChildrenThreadView( childrenThreadView );
  }

  handleOnClickLoginFacebook(){
    const{ thread } = this.props.state;
    const href = `https://talkn.io:8443/auth/facebook?url=${window.location.href}`;
    location.href = href;
  }

  handleOnClickLoginTwitter(){
    const{ thread } = this.props.state;
    const href = `https://talkn.io:8443/auth/twitter?url=${window.location.href}`;
    location.href = href;
  }

  renderFriendLiLabel( name, icon, connection ){
    const { style } = this.props.state;
    const href = `/${connection}`;
    const label = connection ?
      (<span style={ style.menu.namesAddConnection }>{ name }<br />{ connection }</span>) :
      (<span style={ style.menu.names }><br />{ name }</span>) ;

    return(
      <a style={ style.menu.wrap } href={ href } >
        <img style={ style.menu.img } src={ icon } />
        { label }
      </a>
    );
  }

  responseFacebook(response) {
    console.log(response);
  }

 	render() {
    const { style, app, user, thread } = this.props.state;
    const { icon } = style;
    const childrenThreadViewLabel = app.childrenThreadView ? 'Children thread view ON' : 'Children thread view OFF';
    const UserIcon = Icon.getUser( icon.user );

		return (
      <div style={ style.menu.self } >

        <div style={ style.menu.scroll } >
          <br />
{/*
          <ol style={ style.menu.columns }>
            <MenuLi label={ thread.connection } isLast={ false } {...this.props.state} />
            <MenuLi label={ childrenThreadViewLabel } isLast={ true } {...this.props.state} onClick={ this.handleOnClickchildrenThreadView }/>
          </ol>

          <br />

          <ol style={ style.menu.columns }>
            <MenuLi label={ this.renderFriendLiLabel( 'mirazle', 'https://pbs.twimg.com/profile_images/1725640801/baba_bigger.png', '/news.yahoo.co.jp' ) } isLast={ false } {...this.props.state} />
            <MenuLi label={ this.renderFriendLiLabel( 'fukuty.sho', 'https://pbs.twimg.com/profile_images/927155774937186304/8I_6Wp0c_bigger.jpg', '/twitter.com/fukutys' ) } isLast={ false } {...this.props.state} />
            <MenuLi label={ this.renderFriendLiLabel( '自由になりたいあなたへ', 'https://pbs.twimg.com/profile_images/890932897170898944/yIEPHR9C_bigger.jpg', '/zozo.jp/ranking/all-sales.html' ) } isLast={ false } {...this.props.state} />
            <MenuLi label={ this.renderFriendLiLabel( '古谷 沙綾香', 'https://pbs.twimg.com/profile_images/946122762396999680/zOCsFkrw_bigger.jpg', '/www.microsoft.com/ja-jp' ) } isLast={ false } {...this.props.state} />
            <MenuLi label={ this.renderFriendLiLabel( 'りゅう＠のんびりパパ', 'https://pbs.twimg.com/profile_images/855356315551449088/UMsYHYKZ_bigger.jpg' ) } isLast={ false } {...this.props.state} />
            <MenuLi label={ this.renderFriendLiLabel( 'ベンチャータイムス', 'https://pbs.twimg.com/profile_images/589975861878661121/yPshjOKb_bigger.jpg' ) } isLast={ false } {...this.props.state} />
            <MenuLi label={ this.renderFriendLiLabel( 'ｎａｈｏ', 'https://pbs.twimg.com/profile_images/753595099590762497/u3y4bddq_bigger.jpg' ) } isLast={ false } {...this.props.state} />
            <MenuLi label={ this.renderFriendLiLabel( 'takayukii', 'https://pbs.twimg.com/profile_images/815378347618205697/d9qS-g6z_bigger.jpg' ) } isLast={ false } {...this.props.state} />
            <MenuLi label={ this.renderFriendLiLabel( '柳本　顕', 'https://pbs.twimg.com/profile_images/753735960316121088/8_Pf8eTu_bigger.jpg' ) } isLast={ false } {...this.props.state} />
            <MenuLi label={ this.renderFriendLiLabel( 'yukki', 'https://pbs.twimg.com/profile_images/378800000561520910/39aa6d3e3e119c25136ed1de40705294_bigger.jpeg' ) } isLast={ false } {...this.props.state} />
            <MenuLi label={ this.renderFriendLiLabel( 'さくら剛', 'https://pbs.twimg.com/profile_images/913411791287345152/BWboXDW2_bigger.jpg' ) } isLast={ false } {...this.props.state} />
            <MenuLi label={ this.renderFriendLiLabel( '南野真太郎(MTRo)', 'https://pbs.twimg.com/profile_images/1519836653/EAAD6F43-D430-476B-916A-2EBF05114616_bigger' ) } isLast={ false } {...this.props.state} />
            <MenuLi label={ this.renderFriendLiLabel( 'sk', 'https://pbs.twimg.com/profile_images/27767372/e__-1_bigger.png' ) } isLast={ false } {...this.props.state} />
            <MenuLi label={ '⇨ LOGIN FACEBOOK' }  isLast={ false }onClick={this.handleOnClickLoginFacebook}  {...this.props.state} />
            <MenuLi label={ '⇨ LOGIN TWITTER' }  isLast={ true }onClick={this.handleOnClickLoginTwitter}  {...this.props.state} />
          </ol>
*/}
        </div>
        <footer style={ style.menu.footer }>
          <div style={ style.menu.footerChildMoney }>
            { UserIcon }
          </div>
          <div style={ style.menu.footerChildMoney }>
            { UserIcon }
          </div>
          <div style={ style.menu.footerChildMoney }>
            { UserIcon }
          </div>
          <div style={ style.menu.footerChildMoney }>
            { UserIcon }
          </div>
        </footer>
        <iframe src={ conf.sessionPath } style={{}} />
      </div>
		);
 	}
}
