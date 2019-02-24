import React, { Component } from "react"
import Marquee from 'react-marquee';
import conf from 'common/conf';
import Sequence from 'common/Sequence';
import App from 'common/schemas/state/App';
import DetailFooter from 'client/components/DetailFooter';

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

  renderMeta(){
    const { threadDetail, style } = this.props.state
    let backgroundImage = style.detail.img.backgroundImage;
    let backgroundSize = style.detail.img.backgroundSize;

    if( threadDetail.serverMetas['og:image'] ){
      if(
          `${threadDetail.serverMetas['og:image']}`.indexOf(Sequence.HTTPS_PROTOCOL) === 0 || 
          `${threadDetail.serverMetas['og:image']}`.indexOf(Sequence.HTTP_PROTOCOL) === 0
      ){
        backgroundImage = `url("${threadDetail.serverMetas['og:image']}")`;
      }else{
        if(threadDetail.protocol === Sequence.TALKN_PROTOCOL){
          backgroundImage = `url("${Sequence.HTTPS_PROTOCOL}${threadDetail.serverMetas['og:image']}")`;        
        }else{
          backgroundImage = `url("${threadDetail.protocol}${threadDetail.serverMetas['og:image']}")`;
        }
      }

      backgroundSize = 'cover';
    }

    style.detail.img = {...style.detail.img, backgroundImage, backgroundSize};
    const description = this.getDescription( threadDetail.serverMetas );
    const h1LiTags = threadDetail.h1s.map( ( h1, i ) => {
      return( <li style={ style.detail.h1sLi } key={`h1s${i}`}>・{h1}</li> );
    });

    return(
      <div style={ style.detail.meta } >
        <div style={ style.detail.img } />
        <div style={ style.detail.description }>{ description }</div>
        <div style={ style.detail.contentType }>{ threadDetail.contentType }</div>
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
