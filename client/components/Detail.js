import React, { Component, PropTypes } from "react"
import User from 'common/schemas/state/User';
import Icon from './Icon';

export default class Setting extends Component {

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

  renderHeader(){
    const { thread, style } = this.props.state
    return(
      <header style={ style.detail.header }>
        <p style={ style.detail.headerP }>
        { thread.title }
        </p>
      </header>
    )
  }

  renderMeta(){
    const { thread, style } = this.props.state
    const backgroundImage = thread.serverMetas['og:image'] ? `url("${thread.serverMetas['og:image']}")` : 'url()';

    style.detail.img = {...style.detail.img, backgroundImage};
    let description = thread.serverMetas['og:description'] ? thread.serverMetas['og:description'] : '';
    description = thread.serverMetas['description'] ? thread.serverMetas['description'] : '';
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
              Views
            </div>
            <hr style={ style.detail.analyzeHr } />
            <div style={ style.detail.analyzeValue }>
              {thread.watchCnt}
            </div>
          </div>
          <div style={ style.detail.analyzeCol }>
            <div style={ style.detail.analyzeLabel }>
              Positibity
            </div>
            <hr style={ style.detail.analyzeHr } />
            <div style={ style.detail.analyzeValue }>
              1.5
            </div>
          </div>
          <div style={ style.detail.analyzeCol }>
            <div style={ style.detail.analyzeLabel }>
              Growth
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
              Post Cnt
            </div>
            <hr style={ style.detail.analyzeHr } />
            <div style={ style.detail.analyzeValue }>
              {thread.postCnt}
            </div>
          </div>
          <div style={ style.detail.analyzeCol }>
            <div style={ style.detail.analyzeLabel }>
              Multi Cnt
            </div>
            <hr style={ style.detail.analyzeHr } />
            <div style={ style.detail.analyzeValue }>
              {thread.multiPostCnt}
            </div>
          </div>
          <div style={ style.detail.analyzeCol }>
            <div style={ style.detail.analyzeLabel }>
              XX Cnt
            </div>
            <hr style={ style.detail.analyzeHr } />
            <div style={ style.detail.analyzeValue }>
              0
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
        <div style={ style.detail.footerChildMoney } onClick={this.handleOnClickMoney} {...Icon.getDecolationProps2( 'detail', 'footerChildMoney' )}>
          { MoneyIcon }
          <div>MONEY</div>
        </div>
        <div style={ style.detail.footerChildShare } {...Icon.getDecolationProps2( 'detail', 'footerChildShare' )}>
          { ShareIcon }
          <div>SHARE</div>
        </div>
      </footer>
    )
  }

 	render() {
    const { thread, style } = this.props.state

    // 同じだけどstateで更新されるのはdetailだけ
		return (
      <div style={ style.detail.self }>
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
