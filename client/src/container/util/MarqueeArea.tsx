import React from 'react';
import ReactDOM from 'react-dom';

import TalknComponent from 'client/components/TalknComponent';

const FPS = 60;
const STEP = 1;
const TIMEOUT = (1 / FPS) * 1000;

export interface MarqueeAreaProps {
  id?: number | string;
}

export interface MarqueeAreaState {
  animatedWidth: number;
  overflowWidth: number;
}

export default class MarqueeArea<P extends MarqueeAreaProps, S extends MarqueeAreaState> extends TalknComponent<P, S> {
  id: number | string;
  marqueeTimer: any;
  marqueeTextStyle: any = {
    position: 'relative',
    transform: `translateX(0px)`,
    whiteSpace: 'nowrap',
  };
  constructor(props: P) {
    super(props as P);
    this.id = props.id;
    this.startAnimation = this.startAnimation.bind(this);
    this.measureText = this.measureText.bind(this);
    this.onMouseOverArea = this.onMouseOverArea.bind(this);
    this.onMouseLeaveArea = this.onMouseLeaveArea.bind(this);
  }

  get superState() {
    return {
      animatedWidth: 0,
      overflowWidth: 0,
    } as MarqueeAreaState as S;
  }

  get marqueeWrapRef() {
    return `MarqueeWrap${this.id}`;
  }

  get marqueeTextRef() {
    return `Marquee${this.id}`;
  }

  clearTimeout() {
    clearTimeout(this.marqueeTimer);
  }

  onMouseOverArea() {
    if (this.state.overflowWidth > 0) {
      this.startAnimation();
    }
  }

  onMouseLeaveArea() {
    this.clearTimeout();
    this.setState({
      animatedWidth: 0,
    });
  }

  getMarqueeStyle() {
    return {
      position: 'absolute',
      transform: `translateX(-${this.state.animatedWidth}px)`,
      whiteSpace: 'nowrap',
    };
  }

  startAnimation() {
    this.clearTimeout();
    const animate = () => {
      const { overflowWidth } = this.state;
      let animatedWidth = this.state.animatedWidth + STEP;
      const isRoundOver = animatedWidth > overflowWidth;
      if (isRoundOver) {
        animatedWidth = 0;
      }
      this.setState({
        animatedWidth,
      });

      this.marqueeTimer = setTimeout(animate, TIMEOUT);
    };

    this.marqueeTimer = setTimeout(animate, TIMEOUT);
  }

  measureText() {
    // マーキーさせたいテキストのcontainer
    const container: any = ReactDOM.findDOMNode(this.refs[`MarqueeWrap${this.id}`]);

    // マーキーさせたいテキスト全体(表示されない部分も含めて)
    const node: any = container.firstChild;

    if (container && node) {
      const containerWidth = container.offsetWidth;
      const textWidth = node.offsetWidth;
      const overflowWidth = textWidth - containerWidth;

      if (overflowWidth !== this.state.overflowWidth) {
        this.setState({
          overflowWidth,
        });
      }
    }
  }
}
