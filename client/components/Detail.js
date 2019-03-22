import React, { Component } from "react"
import Marquee from 'react-marquee';
import conf from 'common/conf';
import define from 'common/define';
import Sequence from 'common/Sequence';
import App from 'common/schemas/state/App';
import DetailFooter from 'client/components/DetailFooter';
import LockMenu from './LockMenu';
import Icon from './Icon';

export default class Detail extends Component {

  constructor(props) {
    super(props);
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
    const { state, onClickOpenLockMenu, openInnerNotif } = this.props;
    const { app } = state
    if(app.openLockMenu !== App.openLockMenuLabelNo){
      onClickOpenLockMenu(App.openLockMenuLabelNo);
    }
  }

  getImgStyle( style, protocol, serverMetas ){
    let backgroundImage = style.detail.img.backgroundImage;
    let backgroundSize = style.detail.img.backgroundSize;
    if( serverMetas['og:image'] ){
      if(
          `${serverMetas['og:image']}`.indexOf(Sequence.HTTPS_PROTOCOL) === 0 || 
          `${serverMetas['og:image']}`.indexOf(Sequence.HTTP_PROTOCOL) === 0
      ){
        backgroundImage = `url("${serverMetas['og:image']}")`;
      }else{
        if(protocol === Sequence.TALKN_PROTOCOL){
          backgroundImage = `url("${Sequence.HTTPS_PROTOCOL}${serverMetas['og:image']}")`;        
        }else{
          backgroundImage = `url("${protocol}${serverMetas['og:image']}")`;
        }
      }
      backgroundSize = 'cover';
    }
    return {...style.detail.img, backgroundImage, backgroundSize};
  }

  getDescription( serverMetas ){
    if( serverMetas['description'] !== conf.description ){
      return serverMetas['description'];
    }
    if( serverMetas['og:description'] ){
      return serverMetas['og:description'];
    }
    return conf.description;
  }

  renderHeader(){
    const { state, handleOnClickToggleDetail } = this.props;
    const { threadDetail, style } = state;
    return(
      <header
        onClick={handleOnClickToggleDetail}
        style={ style.detail.header }
      >
        <span style={ style.detail.headerP }>
        <Marquee
          text={threadDetail.serverMetas.title}
          loop={true}
          hoverToStop={false}
          trailing={0}
          leading={0}
        />
        </span>
      </header>
    )
  }

  getTwitterIcon(state){
    const { app, threadDetail } = state;
    const { serverMetas } = threadDetail;
    const active = serverMetas['twitter:site'] !== "";
    const href = active ? `${define.URL.twitter}${serverMetas['twitter:site'].replace( "@", "" )}` : "";
    const onClick = app.iframe ? () => {talknAPI.extension("linkTo", {href})} : () => {}; 
    return Icon.getTwitter( {}, state, {active, href, onClick});
  }

  getFacebookIcon(state){
    const { app, threadDetail } = state;
    const { serverMetas } = threadDetail;
    const active = serverMetas['fb:page_id'] !== "";
    const href = active ? `${define.URL.facebook}${serverMetas['fb:page_id']}` : "";
    const onClick = app.iframe ? () => {talknAPI.extension("linkTo", {href})} : () => {}; 
    return Icon.getFacebook( {}, state, {active, href, onClick});
  }

  getAppstoreIcon(state){
    const { app, threadDetail } = state;
    const { serverMetas } = threadDetail;
    const active = serverMetas["al:ios:app_store_id"] !== "";
    const href = active ? `${define.URL.appstore}${serverMetas["al:ios:app_store_id"]}` : "";
    const onClick = app.iframe ? () => {talknAPI.extension("linkTo", {href})} : () => {}; 
    return Icon.getAppstore( {}, state, {active, href, onClick});
  }

  getAndroidIcon(state){
    const { app, threadDetail } = state;
    const { serverMetas } = threadDetail;
    const active = serverMetas["al:android:package"] !== "";
    const href = active ? `${define.URL.playstore}${serverMetas["al:android:package"]}` : "";
    const onClick = app.iframe ? () => {talknAPI.extension("linkTo", {href})} : () => {}; 
    return Icon.getAndroid( {}, state, {active, href, onClick});
  }

  getHomeIcon(state){
    const { app, threadDetail } = state;
    const { protocol, connection, hasSlash  } = threadDetail;
    const active = true;
    let href = `${Sequence.HTTPS_PROTOCOL}//${conf.domain}${connection}`;

    if( protocol !== Sequence.TALKN_PROTOCOL ){
      if( hasSlash && connection.lastIndexOf("/") === ( connection.length - 1 )){
        href = `${protocol}/${connection}`.replace(/\/$/, '');
      }else{
        href = `${protocol}/${connection}`;
      }
    }

    const onClick = app.iframe ? () => {talknAPI.extension("linkTo", {href})} : () => {}; 
    return Icon.getHome( {}, state, {active, href, onClick});
  }

  getTalknIcon(state){
    const { app, threadDetail } = state;
    const { connection, hasSlash } = threadDetail;
    const active = true;
    const href = `${Sequence.HTTPS_PROTOCOL}//${conf.domain}${connection}`;
    const onClick = app.iframe ? () => {talknAPI.extension("linkTo", {href})} : () => {}; 
    return Icon.getTalkn( {}, state, {active, href, onClick});
  }

  getDispContentType(contentType){
    const { style } = this.props.state
    return contentType.split(";").map( ( c, i ) => 
      <div
        key={`${c}_${i}`}
        style={style.detail.metaContentType}
      >
        {c}
      </div>
    );
  }

  renderMeta(){
    const { state } = this.props;
    const { threadDetail, style } = state
    const { serverMetas, contentType, h1s, protocol } = threadDetail;
    style.detail.img = this.getImgStyle( style, protocol, serverMetas );
    const description = this.getDescription( serverMetas );

    // Have item icons.
    const TwitterIcon = this.getTwitterIcon( state );
    const FacebookIcon = this.getFacebookIcon( state );
    const AppstoreIcon = this.getAppstoreIcon( state );
    const AndroidIcon = this.getAndroidIcon( state );

    // Default icons.
    const HomeIcon = this.getHomeIcon( state );
    const TalknIcon = this.getTalknIcon( state );
    const GraphIcon = Icon.getGraph( {}, state, {active: false} );
    const EmptyIcon = Icon.getEmpty( {}, state, {active: false} );

    // Content Type
    const dispContentType = this.getDispContentType(contentType);    
    /*
    const h1LiTags = h1s.map( ( h1, i ) => {
      return( <li style={ style.detail.h1sLi } key={`h1s${i}`}>・{h1}</li> );
    });
    */

    return(
      <div style={ style.detail.meta } >
        <div style={ style.detail.img } />
        <div style={ style.detail.description }>{ description }</div>

        <div style={ style.detail.metaItems }>
          { TwitterIcon }
          { FacebookIcon }
          { AppstoreIcon }
          { AndroidIcon }
        </div>

        <div style={ style.detail.metaItems }>
          { HomeIcon }
          { TalknIcon }
          { GraphIcon }
          { EmptyIcon }
        </div>

        <div style={ style.detail.metaContentTypeWrap }>
            { dispContentType }
        </div>
      </div>
    )
  }

  renderAnalyze(){
    const { thread } = this.state;
    const { style } = this.props.state
    return(
      <div style={ style.detail.analyze }>
        <div style={ style.detail.analyzeRow }>
          <div style={ style.detail.analyzeCol }>
            <div style={ style.detail.analyzeLabel }>
              VIEWING
            </div>
            <hr style={ style.detail.analyzeHr } />
            <div style={ style.detail.analyzeValue }>
              {thread.watchCnt}
            </div>
          </div>
          <div style={ style.detail.analyzeCol }>
            <div style={ style.detail.analyzeLabel }>
              POSITIBITY
            </div>
            <hr style={ style.detail.analyzeHr } />
            <div style={ style.detail.analyzeValue }>
              1.5
            </div>
          </div>
          <div style={ style.detail.analyzeCol }>
            <div style={ style.detail.analyzeLabel }>
              GROWTH
            </div>
            <hr style={ style.detail.analyzeHr } />
            <div style={ style.detail.analyzeValue }>
              2.0%
            </div>
          </div>
        </div>
        <div style={ style.detail.analyzeRow }>
          <div style={ style.detail.analyzeCol }>
            <div style={ style.detail.analyzeLabel }>
              TOTAL POST
            </div>
            <hr style={ style.detail.analyzeHr } />
            <div style={ style.detail.analyzeValue }>
              {thread.postCnt}
            </div>
          </div>
          <div style={ style.detail.analyzeCol }>
            <div style={ style.detail.analyzeLabel }>
              AD POWER
            </div>
            <hr style={ style.detail.analyzeHr } />
            <div style={ style.detail.analyzeValue }>
              102
            </div>
          </div>
          <div style={ style.detail.analyzeCol }>
            <div style={ style.detail.analyzeLabel }>
              RANK
            </div>
            <hr style={ style.detail.analyzeHr } />
            <div style={ style.detail.analyzeValue }>
              2
            </div>
          </div>
        </div>
        <div style={ style.detail.analyzeRow }>
          <div style={ style.detail.analyzeCol }>
            <div style={ style.detail.analyzeLabel }>
              LIKE
            </div>
            <hr style={ style.detail.analyzeHr } />
            <div style={ style.detail.analyzeValue }>
              {thread.postCnt}
            </div>
          </div>
          <div style={ style.detail.analyzeCol }>
            <div style={ style.detail.analyzeLabel }>
              SHARE
            </div>
            <hr style={ style.detail.analyzeHr } />
            <div style={ style.detail.analyzeValue }>
              12
            </div>
          </div>
          <div style={ style.detail.analyzeCol }>
            <div style={ style.detail.analyzeLabel }>
              MONEY
            </div>
            <hr style={ style.detail.analyzeHr } />
            <div style={ style.detail.analyzeValue }>
              13200
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderH1s(){
    const { threadDetail, style } = this.props.state
    const liTags = threadDetail.h1s.map( ( h1, i ) => {
      return( <li style={ style.detail.h1sLi } key={`h1s${i}`}>・{h1}</li> );
    });
    return(
      <ol style={ style.detail.h1s } >
        {liTags}
      </ol>
    )
  }

  renderLockMenu(){
    const { app } = this.props.state
    switch( app.screenMode ){
    case App.screenModeSmallLabel :
    case App.screenModeMiddleLabel : 
      return <LockMenu {...this.props} />
    case App.screenModeLargeLabel : 
      return null;
    }
  }

  renderDetailFooter(){
    const { app } = this.props.state
    switch( app.screenMode ){
    case App.screenModeSmallLabel :
    case App.screenModeMiddleLabel : 
    case App.screenModeLargeLabel : 
      return <DetailFooter {...this.props } />;
    }
  }

  renderExtension(){
    const { state } = this.props;
    const { app } = state
    const active = true;
    const href = "https://chrome.google.com/webstore/detail/talkn-for-chrome/dkngnmdlcofambpfaccepbnjgfholgbo?hl=en";
    const onClick = app.iframe ? () => {talknAPI.extension("linkTo", {href})} : () => {}; 
    return Icon.getChromeExtension( {}, state, {active, href, onClick});
  }

 	render() {
    const { style } = this.props.state
		return (
      <div data-component-name={this.constructor.name} style={ style.detail.self }>
        {this.renderHeader()}
        <div style={ style.detail.body } >
          {this.renderMeta()}
          {this.renderExtension()}

        </div>
        {this.renderLockMenu()}
        {this.renderDetailFooter()}
      </div>
		);
 	}
}
