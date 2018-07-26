import React, { Component, PropTypes } from "react";
import Container from 'client/style/Container';
import User from 'common/schemas/state/User';
import util from 'common/util';
import conf from 'common/conf';
import Icon from '../Icon';

export default class MenuIndexList extends Component {

  constructor(props) {
    const {style} = props.state;
    super(props);
    this.state = {style}
    this.getDecolationProps = this.getDecolationProps.bind(this);
  }

  getDecolationProps( styleKey, connection ){
    return {
      onMouseOver: () => {
        this.setState(
          { style:
            {...this.state.style,
              menuIndexList: { ...this.state.style.menuIndexList,
                [ styleKey ]: { ...this.state.style.menuIndexList[ styleKey ],
                  background: Container.whiteRGB,
                }
              }
            }
          }
        );
      },
      onMouseLeave: () => {
        this.setState( {style:
          {...this.state.style,
            menuIndexList: { ...this.state.style.menuIndexList,
              [ styleKey ]: { ...this.state.style.menuIndexList[ styleKey ],
                background: Container.offWhiteRGB,
              }
            }
          }
        });
      },
      onMouseDown: () => {
        console.log( connection );
        talknAPI.find( connection );
        this.setState( {style:
          {...this.state.style,
            menuIndexList: { ...this.state.style.menuIndexList,
              [ styleKey ]: { ...this.state.style.menuIndexList[ styleKey ],
              }
            }
          }
        });
      },
      onMouseUp: () => {
        this.setState( {style:
          {...this.state.style,
            menuIndexList: { ...this.state.style.menuIndexList,
                [ styleKey ]: { ...this.state.style.menuIndexList[ styleKey ],
              }
            }
          }
        });
      },
    }
  }

 	render() {
    const { style } = this.state;
    const { menuIndex, thread } = this.props.state;
    const{ connection, post, favicon, createTime } = this.props.mi;
    const dispConnection = connection.replace( thread.connection, '' );
    const dispFavicon = conf.assetsIconPath + util.getSaveFaviconName( favicon );
    const styleKey = thread.connection === connection ? 'liActiveSelf' : 'liUnactiveSelf' ;
    const events = styleKey === 'liUnactiveSelf' ? this.getDecolationProps( styleKey, connection ) : () => {} ;

    return (
      <li style={style.menuIndexList[ styleKey ] } {...events}>

        <div style={style.menuIndexList.upper}>
          <span style={style.menuIndexList.upperSpace} />
          <span style={style.menuIndexList.upperRight}>{dispConnection}</span>
        </div>

        <div style={style.menuIndexList.bottom}>
          <span style={{...style.menuIndexList.bottomIcon, backgroundImage: `url( ${dispFavicon} )`}} />
          <span style={style.menuIndexList.bottomPost} dangerouslySetInnerHTML={{__html: post}} />
        </div>

      </li>
    )
 	}
}
