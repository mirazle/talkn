import React, { Component } from "react"
import conf from 'common/conf';
import define from 'common/define';
import App from 'common/schemas/state/App';
import Icon from './Icon';
import Container from 'client/style/Container';

export default class DetailFooter extends Component {

  constructor(props) {
    super(props);
    this.handleOnClickLike = this.handleOnClickLike.bind(this);
    this.handleOnClickShare = this.handleOnClickShare.bind(this);
    this.handleOnClickPortal = this.handleOnClickPortal.bind(this);
  }

  handleOnClickLike(){
    const { state, onClickOpenLockMenu, openInnerNotif } = this.props;
    const { app } = state
    if(app.openLockMenu !== App.openLockMenuLabelNo){
      onClickOpenLockMenu(App.openLockMenuLabelNo);
    }else{
      openInnerNotif();
    }
  }

  handleOnClickShare(){
    const { state, onClickOpenLockMenu, openInnerNotif } = this.props;
    const { app } = state
    if(app.openLockMenu !== App.openLockMenuLabelNo){
      onClickOpenLockMenu(App.openLockMenuLabelNo);
    }else{
      onClickOpenLockMenu(App.openLockMenuLabelShare);
    }
  }

  handleOnClickPortal(){
    const { app } = this.props.state;
    if( app.type === define.APP_TYPES.EXTENSION ){
      talknAPI.extension("linkTo", {href: `https://${conf.wwwURL}` });
    }else{
      location.href = `https://${conf.wwwURL}`;
    }
  }
  
  render(){
    const { mode, state } = this.props;
    const { app, style } = state

    if( define.APP_TYPES.EXTENSION === app.type && mode === "default"){
      return null;
    }else{
      const HeartIcon = Icon.getHeart( {}, state );
      const ShareIcon = Icon.getShare( {}, state );
      const MoneyIcon = Icon.getMoney( {}, state );
      const shareColor = state.app.openLockMenu === App.openLockMenuLabelShare ? Container.themeRGBA : Container.fontBaseRGB;

      return(
        <footer
          data-component-name={this.constructor.name}
          style={ style.detailFooter.self }>
          <div style={ style.detailFooter.childLike } onClick={this.handleOnClickLike}>
            { HeartIcon }
            <div>LIKE</div>
          </div>
          <div style={ style.detailFooter.childShare } onClick={this.handleOnClickShare}>
            { ShareIcon }
            <div style={{color: shareColor}}>SHARE</div>
          </div>
          <div style={ style.detailFooter.childMoney } onClick={this.handleOnClickPortal}>
            { MoneyIcon }
            <div>ABOUT</div>
          </div>
        </footer>
      );
    }
  }
}
