import React, { Component } from "react"
import Marquee from 'react-marquee';
import conf from 'common/conf';
import define from 'common/define';
import Sequence from 'common/Sequence';
import App from 'common/schemas/state/App';
import DetailFooter from 'client/components/DetailFooter';
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
    const { threadDetail, style } = this.props.state
    return(
      <header style={ style.detail.header }>
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
    const { serverMetas } = state.threadDetail;
    const active = serverMetas['twitter:site'] !== "";
    const href = active ? `${define.URL.twitter}${serverMetas['twitter:site'].replace( "@", "" )}` : "";
    return Icon.getTwitter( {}, state, {active, href});
  }

  getFacebookIcon(state){
    const { serverMetas } = state.threadDetail;
    const active = serverMetas['fb:page_id'] !== "";
    const href = active ? `${define.URL.facebook}${serverMetas['fb:page_id']}` : "";
    return Icon.getFacebook( {}, state, {active, href});
  }

  getAppstoreIcon(state){
    const { serverMetas } = state.threadDetail;
    const active = serverMetas["al:ios:app_store_id"] !== "";
    const href = active ? `${define.URL.appstore}${serverMetas["al:ios:app_store_id"]}` : "";
    return Icon.getAppstore( {}, state, {active, href});
  }

  getAndroidIcon(state){
    const { serverMetas } = state.threadDetail;
    const active = serverMetas["al:android:package"] !== "";
    const href = active ? `${define.URL.playstore}${serverMetas["al:android:package"]}` : "";
    return Icon.getAndroid( {}, state, {active, href});
  }

  getHomeIcon(state){
    const { protocol, connection, hasSlash } = state.threadDetail;
    const active = true;
    const href = protocol === Sequence.TALKN_PROTOCOL ?
      `${Sequence.HTTPS_PROTOCOL}//${conf.domain}${connection}`:
      `${protocol}/${connection}`;
    return Icon.getHome( {}, state, {active, href});
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
    const GraphIcon = Icon.getGraph( {}, state, {active: false} );
    const EmptyIcon = Icon.getEmpty( {}, state, {active: false} );
    const h1LiTags = h1s.map( ( h1, i ) => {
      return( <li style={ style.detail.h1sLi } key={`h1s${i}`}>・{h1}</li> );
    });

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
          { GraphIcon }
          { EmptyIcon }
          { EmptyIcon }
        </div>

        <div style={ style.detail.metaContentType }>
          { contentType }
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

  renderDetailFooter(){
    const { app } = this.props.state
    switch( app.screenMode ){
    case App.screenModeSmallLabel :
      return <DetailFooter {...this.props } />;
    case App.screenModeMiddleLabel : 
    case App.screenModeLargeLabel : 
      return null;
    }
  }

 	render() {
    const { style } = this.props.state

		return (
      <div data-component-name={this.constructor.name} style={ style.detail.self }>
        {this.renderHeader()}
        <div style={ style.detail.body } >

          {this.renderMeta()}

          <br />
          <br />
          <br />
          <br />
          <br />
          <br />

        </div>
        {this.renderDetailFooter()}
      </div>
		);
 	}
}
