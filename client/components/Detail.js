import React, { Component } from "react"
import Marquee from 'react-marquee';
import conf from 'common/conf';
import Icon from './Icon';

export default class Detail extends Component {

  constructor(props) {
    super(props);
    this.handleOnClickLike = this.handleOnClickLike.bind(this);
    this.handleOnClickMoney = this.handleOnClickMoney.bind(this);
    this.handleOnClickShare = this.handleOnClickShare.bind(this);
  }

  handleOnClickLike(){
  }

  handleOnClickMoney(){
    talknAPI.onChangeInputPost( '@ETH:' );
  }

  handleOnClickShare(){
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
    const { thread, style } = this.props.state
    return(
      <header style={ style.detail.header }>
        <span style={ style.detail.headerP }>
        <Marquee
          text={thread.serverMetas.title}
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
    const { thread, style } = this.props.state
    let backgroundImage = style.detail.img.backgroundImage;
    let backgroundSize = style.detail.img.backgroundSize;

    if( thread.serverMetas['og:image'] ){
      backgroundImage = `url("${thread.serverMetas['og:image']}")`;
      backgroundSize = 'cover';
    }

    style.detail.img = {...style.detail.img, backgroundImage, backgroundSize};
    const description = this.getDescription( thread.serverMetas );
    const h1LiTags = thread.h1s.map( ( h1, i ) => {
      return( <li style={ style.detail.h1sLi } key={`h1s${i}`}>・{h1}</li> );
    });

    return(
      <div style={ style.detail.meta } >
        <div style={ style.detail.img } />
        <div style={ style.detail.description }>{ description }</div>
        <div style={ style.detail.contentType }>{ thread.contentType }</div>
      </div>
    )
  }

  renderAnalyze(){
    const { thread, style } = this.props.state
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
    const { thread, style } = this.props.state
    const liTags = thread.h1s.map( ( h1, i ) => {
      return( <li style={ style.detail.h1sLi } key={`h1s${i}`}>・{h1}</li> );
    });
    return(
      <ol style={ style.detail.h1s } >
        {liTags}
      </ol>
    )
  }

  renderFooter(){
    const { style } = this.props.state
    const { icon } = style;
    const HeartIcon = Icon.getHeart( icon.heart );
    const ShareIcon = Icon.getShare( icon.share );
    const MoneyIcon = Icon.getMoney( icon.money );

    return(
      <footer style={ style.detail.footer }>
        <div style={ style.detail.footerChildLike }  {...Icon.getDecolationProps2( 'detail', 'footerChildLike' ) }>
          { HeartIcon }
          <div>LIKE</div>
        </div>
        <div style={ style.detail.footerChildShare } {...Icon.getDecolationProps2( 'detail', 'footerChildShare' )}>
          { ShareIcon }
          <div>SHARE</div>
        </div>
        <div style={ style.detail.footerChildMoney } onClick={this.handleOnClickMoney} {...Icon.getDecolationProps2( 'detail', 'footerChildMoney' )}>
          { MoneyIcon }
          <div>MONEY</div>
        </div>
      </footer>
    )
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
          {this.renderAnalyze()}

          <br />
          <br />
          {this.renderH1s()}

          <br />
          <br />
        </div>
        {this.renderFooter()}
      </div>
		);
 	}
}
