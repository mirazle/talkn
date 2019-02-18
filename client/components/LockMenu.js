import React, { Component } from "react"
import conf from 'common/conf';
import Sequence from 'common/Sequence';
import Style from 'client/style/index/';
import Container from 'client/style/Container';
import Icon from 'client/components/Icon';

export default class LockMenu extends Component {

  getDecolationProps(type){
    return {
      onMouseOver: () => {
        this.setState(
          { style:
            {...this.state.style,
              [type]: { ...this.state.style[type],
                color: Container.whiteRGB,
                background: Container.themeRGB
              }
            }
          }
        );
      },
      onMouseLeave: () => {
        this.setState( {style:
          {...this.state.style,
            [type]: { ...this.state.style[type],
              color: Style.fontBaseRGB,
              background: Container.whiteRGBA,
              transform: 'scale( 1 )'
            }
          }
        });
      },
      onMouseDown: () => {
        this.setState( {style:
          {...this.state.style,
            [type]: { ...this.state.style[type],
              transition: "200ms",
              transform: 'scale( 1.05 )',
            }
          }
        });
      },
      onMouseUp: () => {
        this.setState( {style:
          {...this.state.style,
            [type]: { ...this.state.style[type],
              transition: "200ms",
              transform: 'scale( 1 )'
            }
          }
        });
      },
    }
  }

  constructor(props) {
    super(props);
    const {lockMenu: style} = props.state.style;
    this.state = {style}
    this.getDecolationProps = this.getDecolationProps.bind(this);
    this.handleOnClickToWeb = this.handleOnClickToWeb.bind(this);
    this.handleOnClickToTalkn = this.handleOnClickToTalkn.bind(this);
  }

  handleOnClickToWeb(){
    const { threadDetail } = this.props.state;
    if( threadDetail.protocol === Sequence.TALKN_PROTOCOL ){
      location.href = threadDetail.connection;
    }else{
      location.href = threadDetail.protocol + "/" + threadDetail.connection;
    }
  }

  handleOnClickToTalkn(){
    const { threadDetail } = this.props.state;
    location.href = `//${conf.domain}${threadDetail.connection}`;
  }

 	render() {
    const { style: stateStyle } = this.state;
    const { openInnerNotif } = this.props;
    const { app, style } = this.props.state;

    switch( app.openLockMenu ){
    case 1:
      return (
        <div data-component-name={this.constructor.name} style={style.lockMenu.menuWeb}>
          <header style={style.lockMenu.header}>
            WEB
          </header>
          <ul style={style.lockMenu.ul}>
            <li
              style={stateStyle.liGoWeb}
              onClick={this.handleOnClickToWeb}
              {...this.getDecolationProps('liGoWeb')}
            >
              Go Web Page
            </li>
          </ul>
        </div>
      );
    case 2:
      return (
        <div data-component-name={this.constructor.name} style={style.lockMenu.menuShare}>
          <header style={style.lockMenu.header}>
            SHARE
          </header>
          <ul style={style.lockMenu.ul}>
            <li
              style={stateStyle.liTwitter}
              onClick={ () => openInnerNotif() }
              {...this.getDecolationProps('liTwitter')}
            >
              {Icon.getTwitter()}
              <div style={style.lockMenu.shareLabel}>Twitter</div>
            </li>
            <li
              style={stateStyle.liFacebook}
              onClick={ () => openInnerNotif() }
              {...this.getDecolationProps('liFacebook')}
            >
              {Icon.getFacebook()}
              <div style={style.lockMenu.shareLabel}>Facebook</div>
            </li>
            <li
              style={stateStyle.liEmbed}
              onClick={ () => openInnerNotif('Copied iFrame Tag.') }
              {...this.getDecolationProps('liEmbed')}
            >
              {Icon.getTalkn()}
              <div style={style.lockMenu.shareLabel}>Copy iFrame Tag</div>
            </li>
          </ul>
        </div>
      );
    default :
      return null;
    }
 	}
}

// {`<iframe src='//${conf.domain}${threadDetail.connection}' frameborder='0' style='height: 385px; width: 300px' />`}