import React, { Component } from "react";
import Container from "client/style/Container";

interface Props {
  app: any;
  isLast: boolean;
  label: string;
  onClick?: any;
}

interface State {
  style: any;
}

export default class MenuLi extends Component<Props, State> {
  constructor(props) {
    super(props);
    const { style, isLast } = props;
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
    let { label, onClick } = this.props;
    const { style } = this.state;
    onClick = onClick ? onClick : () => {};
    return (
      <li
        data-component-name={"MenuLi"}
        style={style}
        onClick={onClick}
        {...this.getDecolationProps()}
      >
        {label}
      </li>
    );
  }
}
