import React, { Component, PropTypes } from "react"
import User from 'common/schemas/state/User';
import Icon from './Icon';

export default class Setting extends Component {

  constructor(props) {
    super(props);
  }

  renderHeader(){
    const { thread, style } = this.props.state
    return(
      <header style={ style.detail.header }>
        { thread.title }
      </header>
    )
  }

  renderMeta(){
    const { thread, style } = this.props.state
    const backgroundImage = thread.metas['og:image'] ? `url("${thread.metas['og:image']}")` : 'url()';
    style.detail.img = {...style.detail.img, backgroundImage};
    const description = thread.metas['og:description'] ? thread.metas['og:description'] : '';
    return(
      <span style={ style.detail.meta } >
        <div style={ style.detail.img } />
        <div style={ style.detail.description }>{ description }</div>
      </span>
    )
  }

  renderAnalyze(){
    const { thread, style } = this.props.state
    return(
      <div style={ style.detail.analyze }>
        <div style={ style.detail.analyzeRow }>
          <div style={ style.detail.analyzeCol }>
            <div>
              {thread.postCnt}
            </div>
            <hr style={ style.detail.analyzeHr } />
            <div>
              Post Cnt
            </div>
          </div>
          <div style={ style.detail.analyzeCol }>
            <div>
              {thread.multiPostCnt}
            </div>
            <hr style={ style.detail.analyzeHr } />
            <div>
              Multi Cnt
            </div>
          </div>
          <div style={ style.detail.analyzeCol }>
            <div>
              {thread.multiPostCnt}
            </div>
            <hr style={ style.detail.analyzeHr } />
            <div>
              XX Cnt
            </div>
          </div>
        </div>
        <div style={ style.detail.analyzeRow }>
          <div style={ style.detail.analyzeCol }>
            <div>
              {thread.watchCnt}
            </div>
            <hr style={ style.detail.analyzeHr } />
            <div>
              Views
            </div>
          </div>
          <div style={ style.detail.analyzeCol }>
            <div>
              1.5
            </div>
            <hr style={ style.detail.analyzeHr } />
            <div>
              Positibity
            </div>
          </div>
          <div style={ style.detail.analyzeCol }>
            <div>
              2.0%
            </div>
            <hr style={ style.detail.analyzeHr } />
            <div>
              Growth
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderH1s(){
    const { thread, style } = this.props.state
    const liTags = thread.h1s.map( ( h1, i ) => {
      return( <li key={`h1s${i}`}>${h1}</li> );
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
        <div style={ style.detail.footerChild }>
          { HeartIcon }
          <div>LIKE</div>
        </div>
        <div style={ style.detail.footerChild }>
          { MoneyIcon }
          <div>MONEY</div>
        </div>
        <div style={ style.detail.footerChild }>
          { ShareIcon }
          <div>SHARE</div>
        </div>
      </footer>
    )
  }

 	render() {
    const { thread, style } = this.props.state
		return (
      <div style={ style.detail.self }>
        {this.renderHeader()}
        <div style={ style.detail.body } >
          {this.renderMeta()}
          {this.renderAnalyze()}
          {this.renderH1s()}
        </div>
        {this.renderFooter()}
      </div>
		);
 	}
}
