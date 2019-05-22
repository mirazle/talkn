import React, { Component } from "react"
import conf from 'common/conf';
import Sequence from 'common/Sequence';
import App from 'common/schemas/state/App';
import Style from 'client/style/index/';
import Container from 'client/style/Container';
import {default as LockMenuStyle} from 'client/style/LockMenu';
import Icon from 'client/components/Icon';

export default class LockMenu extends Component {

  getDecolationProps1(type){
    return {
      onMouseOver: () => {
        if( type === "liEmbed" ){
          document.querySelector("[data-component-share-input]").select();
        }
        this.setState(
          { style:
            {...this.state.style,
              [type]: { ...this.state.style[type],
                color: Container.whiteRGB,
                background: Container.getThemeRGBA(0.7)
              }
            }
          }
        );
      },
      onMouseLeave: () => {
        if( type === "liEmbed" ){
          document.getSelection().empty();
        }
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

  getDecolationPropsEmbed(){
    return {
      onMouseOver: () => {
        this.setState(
          { style:
            {...this.state.style,
              liEmbed: { ...this.state.style.liEmbed,
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
            liEmbed: { ...this.state.style.liEmebed,
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
            liEmbed: { ...this.state.style.liEmbed,
              transition: "200ms",
              transform: 'scale( 1.05 )',
            }
          }
        });
      },
      onMouseUp: () => {
        this.setState( {style:
          {...this.state.style,
            liEmbed: { ...this.state.style.liEmbed,
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
    this.getDecolationProps1 = this.getDecolationProps1.bind(this);
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
    const { state } = this;
    const { style: stateStyle } = state;
    const { openInnerNotif, onClickOpenLockMenu } = this.props;
    const { style, threadDetail } = this.props.state;
    
    const IconHeadTab = Icon.getHeadTab( LockMenuStyle.headTabUpdate );
    const IconTwitter = Icon.getTwitter( {}, state, {sizePx: Icon.middleSize} );
    const IconFacebook = Icon.getFacebook( {}, state, {sizePx: Icon.middleSize} );
    const IconTalkn = Icon.getTalkn( {}, state, {sizePx: Icon.middleSize} );

    return (
      <div
        data-component-name={"LockMenu"}
        style={style.lockMenu.menuShare}
      >
        <header
          style={style.lockMenu.header}
          onClick={ () => onClickOpenLockMenu(App.openLockMenuLabelNo)}  
        >
          SHARE
          { IconHeadTab }
        </header>
        <ul style={style.lockMenu.ul}>
          <li
            style={stateStyle.liTwitter}
            onClick={ () => openInnerNotif() }
            {...this.getDecolationProps1('liTwitter')}
          >
            { IconTwitter }
            <div style={style.lockMenu.shareLabel}>Twitter</div>
          </li>
          <li
            style={stateStyle.liFacebook}
            onClick={ () => openInnerNotif() }
            {...this.getDecolationProps1('liFacebook')}
          >
            { IconFacebook }
            <div style={style.lockMenu.shareLabel}>Facebook</div>
          </li>
          <li
            style={stateStyle.liEmbed}
            onClick={ () => {
                document.querySelector("[data-component-share-input]").select();
                document.execCommand("copy");
                openInnerNotif('Success Copy iFrame Tag.');
              }
            }
            {...this.getDecolationProps1('liEmbed')}
          >
            { IconTalkn }
            <div style={style.lockMenu.shareLabel}>
              <input  
                data-component-share-input
                type="text"
                style={stateStyle.liEmbedInput}
                readOnly={true}
                value={
                  `<iframe src='//${conf.domain}${threadDetail.connection}' frameborder='0' style='height: 385px; width: 280px' />`
                }
              />
            </div>
          </li>
        </ul>
      </div>
    );
 	}
}