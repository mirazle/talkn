import React, { Component, PropTypes } from "react"
import User from 'common/schemas/state/User';

export default class SettingLi extends Component {

  constructor(props) {
    super(props);
    const { style, isLast } = props;
    const liStyle = isLast ? style.setting.columnLast :  style.setting.column ;
    this.state = {style: liStyle};
    this.getDecolationProps = this.getDecolationProps.bind(this);
  }

  getDecolationProps(){
    const { isLast } = this.props;
    const styleKey = isLast ? 'columnLast' : 'column' ;
    return {
      onMouseOver: () => {
        this.setState(
          { style:
            {...this.state.style,
                transition: '200ms',
                transform: 'scale( 1.05 )',
                cursor: 'pointer',
            }
          }
        );
      },
      onMouseLeave: () => {
        this.setState( {style:
          {...this.state.style,
              transition: '600ms',
              transform: 'scale( 1 )',
              cursor: 'default',
          }
        });
      },
      onMouseDown: () => {
        this.setState( {style:
          {...this.state.style,
              transform: 'scale( 1 )',
              cursor: 'pointer',
          }
        });
      },
      onMouseUp: () => {
        this.setState( {style:
          {...this.state.style,
              transform: 'scale( 1.05 )',
              cursor: 'pointer',
          }
        });
      },
    }
  }

 	render() {
    let { label, onClick } = this.props;
    const { style } = this.state;
    onClick = onClick ? onClick : () => {} ;
		return (
      <li style={ style } onClick={ onClick } {...this.getDecolationProps()}>
        {label}
      </li>
		);
 	}
}
