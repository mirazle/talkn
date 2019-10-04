import React, { Component } from "react";
import Container from "client/style/Container";

interface Props {
  app: any;
  isLast: any;
  label: any;
  onClick: any;
  state: any;
}

interface State {
  style: any;
}

export default class TwitterLi extends Component<Props, State> {
  constructor(props) {
    super(props);
    const { isLast, style } = props.state;
    const liStyle = isLast ? style.menu.columnLast : style.menu.column;
    this.state = { style: liStyle };
    this.getDecolationProps = this.getDecolationProps.bind(this);
  }

  getDecolationProps() {
    const { isLast, app } = this.props;
    const styleKey = isLast ? "columnLast" : "column";
    return {
      onMouseOver: () => {
        this.setState({
          style: {
            ...this.state.style,
            transition: Container.getTransitionFirstOn(app),
            transform: "scale( 1.05 )",
            cursor: "pointer"
          }
        });
      },
      onMouseLeave: () => {
        this.setState({
          style: {
            ...this.state.style,
            transition: Container.getTransitionOn(app),
            transform: "scale( 1 )",
            cursor: "default"
          }
        });
      },
      onMouseDown: () => {
        this.setState({
          style: {
            ...this.state.style,
            transform: "scale( 1 )",
            cursor: "pointer"
          }
        });
      },
      onMouseUp: () => {
        this.setState({
          style: {
            ...this.state.style,
            transform: "scale( 1.05 )",
            cursor: "pointer"
          }
        });
      }
    };
  }

  render() {
    let { label, onClick, state } = this.props;
    const { style } = state;
    onClick = onClick ? onClick : () => {};
    return (
      <li
        data-component-name={"TwitterLi"}
        style={style.menuUsers.column}
        onClick={onClick}
        {...this.getDecolationProps()}
      >
        {label}
      </li>
    );
  }
}