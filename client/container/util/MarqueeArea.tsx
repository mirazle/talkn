import React, { Component } from "react";
import ReactDOM from "react-dom";

/*
Copyright (c) jasonslyvia
Released under the MIT license
https://www.npmjs.com/package/react-marquee
*/

const FPS = 60;
const STEP = 1;
const TIMEOUT = (1 / FPS) * 1000;

/*
  Type '{
    text: string;
    loop: boolean;
    hoverToStop: boolean;
    trailing: number;
    leading: number;
  }' is missing the following properties from type 'Readonly<Props>': style, classNamets(2739)
  */
interface Props {
  hoverToStop: any;
  leading: any;
  loop: any;
  trailing: any;
  style?: any;
  className?: any;
  marqueeRef: string;
  element?: any;
}
interface State {
  animatedWidth: number;
  overflowWidth: number;
}
export default class MarqueeArea extends Component<Props, State> {
  _marqueeTimer: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      animatedWidth: 0,
      overflowWidth: 0
    };

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  componentDidMount() {
    this._measureText();

    if (this.props.hoverToStop) {
      this._startAnimation();
    }
  }

  shouldComponentUpdate(nextProps) {
    if (this.state.overflowWidth === 0) {
      return false;
    }
    return true;
  }

  componentDidUpdate() {
    this._measureText();

    if (this.props.hoverToStop) {
      this._startAnimation();
    }
  }

  componentWillUnmount() {
    clearTimeout(this._marqueeTimer);
  }

  componentWillReceiveProps(nextProps) {
    /*
    if (this.props.text && this.props.text.length != nextProps.text.length) {
      clearTimeout(this._marqueeTimer);
      this.setState({
        animatedWidth: 0
      });
    }
*/
  }

  handleMouseEnter() {
    if (this.props.hoverToStop) {
      clearTimeout(this._marqueeTimer);
    } else if (this.state.overflowWidth > 0) {
      this._startAnimation();
    }
  }

  handleMouseLeave() {
    if (this.props.hoverToStop && this.state.overflowWidth > 0) {
      this._startAnimation();
    } else {
      clearTimeout(this._marqueeTimer);
      this.setState({
        animatedWidth: 0
      });
    }
  }

  render(): JSX.Element {
    return this.renderMarquee();
  }

  renderMarquee(): JSX.Element {
    const style: any = {
      ...{
        position: "relative",
        right: this.state.animatedWidth,
        whiteSpace: "nowrap"
      },
      ...this.props.style
    };

    if (this.state.overflowWidth < 0) {
      return (
        <div style={{ overflow: "hidden" }}>
          <span ref="text" style={style} title={"this.props.text"}>
            {"this.props.text"}
          </span>
        </div>
      );
    } else {
      return (
        <div style={{ overflow: "hidden" }} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
          <span ref="text" style={style} title={"this.props.text"}>
            {"this.props.text"}
          </span>
        </div>
      );
    }
  }
  _startAnimation() {
    clearTimeout(this._marqueeTimer);
    const isLeading = this.state.animatedWidth === 0;
    const timeout = isLeading ? this.props.leading : TIMEOUT;

    const animate = () => {
      const { overflowWidth } = this.state;
      let animatedWidth = this.state.animatedWidth + STEP;
      const isRoundOver = animatedWidth > overflowWidth;

      if (isRoundOver) {
        if (this.props.loop) {
          animatedWidth = 0;
        } else {
          return;
        }
      }

      if (isRoundOver && this.props.trailing) {
        this._marqueeTimer = setTimeout(() => {
          this.setState({
            animatedWidth
          });

          this._marqueeTimer = setTimeout(animate, TIMEOUT);
        }, this.props.trailing);
      } else {
        this.setState({
          animatedWidth
        });

        this._marqueeTimer = setTimeout(animate, TIMEOUT);
      }
    };

    this._marqueeTimer = setTimeout(animate, timeout);
  }

  _measureText() {
    const container: any = ReactDOM.findDOMNode(this);
    //const container = document.querySelector("[data-component-name='Marquee']");
    const node: any = ReactDOM.findDOMNode(this.refs.text);
    if (container && node) {
      const containerWidth = container.offsetWidth;
      const textWidth = node.offsetWidth;
      const overflowWidth = textWidth - containerWidth;

      if (overflowWidth !== this.state.overflowWidth) {
        this.setState({
          overflowWidth
        });
      }
    }
  }
}
