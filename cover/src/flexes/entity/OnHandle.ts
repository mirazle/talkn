import React from 'react';

export type OnHandleType = {
  onClick?: (e: React.UIEvent<HTMLElement, UIEvent>) => void;
  onContextMenu?: (e: React.UIEvent<HTMLElement, UIEvent>) => void;
  onDoubleClick?: (e: React.UIEvent<HTMLElement, UIEvent>) => void;
  onDrag?: (e: React.UIEvent<HTMLElement, UIEvent>) => void;
  onDragEnd?: (e: React.UIEvent<HTMLElement, UIEvent>) => void;
  onDragEnter?: (e: React.UIEvent<HTMLElement, UIEvent>) => void;
  onDragExit?: (e: React.UIEvent<HTMLElement, UIEvent>) => void;
  onDragLeave?: (e: React.UIEvent<HTMLElement, UIEvent>) => void;
  onDragOver?: (e: React.UIEvent<HTMLElement, UIEvent>) => void;
  onDragStart?: (e: React.UIEvent<HTMLElement, UIEvent>) => void;
  onDrop?: (e: React.UIEvent<HTMLElement, UIEvent>) => void;
  onMouseDown?: (e: React.UIEvent<HTMLElement, UIEvent>) => void;
  onMouseEnter?: (e: React.UIEvent<HTMLElement, UIEvent>) => void;
  onMouseLeave?: (e: React.UIEvent<HTMLElement, UIEvent>) => void;
  onMouseMove?: (e: React.UIEvent<HTMLElement, UIEvent>) => void;
  onMouseOut?: (e: React.UIEvent<HTMLElement, UIEvent>) => void;
  onMouseOver?: (e: React.UIEvent<HTMLElement, UIEvent>) => void;
  onMouseUp?: (e: React.UIEvent<HTMLElement, UIEvent>) => void;
  onTouchCancel?: (e: React.UIEvent<HTMLElement, UIEvent>) => void;
  onTouchEnd?: (e: React.UIEvent<HTMLElement, UIEvent>) => void;
  onTouchMove?: (e: React.UIEvent<HTMLElement, UIEvent>) => void;
  onTouchStart?: (e: React.UIEvent<HTMLElement, UIEvent>) => void;
  onScroll?: (e: React.UIEvent<HTMLElement, UIEvent>) => void;
  onScrollEnd?: (e: React.UIEvent<HTMLElement, UIEvent>) => void;
  onWheel?: (e: React.UIEvent<HTMLElement, UIEvent>) => void;
};

export type OnInputEventType = {
  onFocus?: (e: React.UIEvent<HTMLElement, UIEvent>) => void;
  onBlur?: (e: React.UIEvent<HTMLElement, UIEvent>) => void;
  onInput?: (e: React.UIEvent<HTMLElement, UIEvent>) => void;
  onInvalid?: (e: React.UIEvent<HTMLElement, UIEvent>) => void;
  onReset?: (e: React.UIEvent<HTMLElement, UIEvent>) => void;
  onSubmit?: (e: React.UIEvent<HTMLElement, UIEvent>) => void;
  onError?: (e: React.UIEvent<HTMLElement, UIEvent>) => void;
  onLoad?: (e: React.UIEvent<HTMLElement, UIEvent>) => void;
  onSelect?: (e: React.UIEvent<HTMLElement, UIEvent>) => void;
  onAnimationStart?: (e: React.UIEvent<HTMLElement, UIEvent>) => void;
  onAnimationEnd?: (e: React.UIEvent<HTMLElement, UIEvent>) => void;
  onAnimationIteration?: (e: React.UIEvent<HTMLElement, UIEvent>) => void;
  onTransitionEnd?: (e: React.UIEvent<HTMLElement, UIEvent>) => void;
  onCompositionEnd?: (e: React.UIEvent<HTMLElement, UIEvent>) => void;
  onCompositionStart?: (e: React.UIEvent<HTMLElement, UIEvent>) => void;
  onCompositionUpdate?: (e: React.UIEvent<HTMLElement, UIEvent>) => void;
  onKeyDown?: (e: React.UIEvent<HTMLElement, UIEvent>) => void;
  onKeyPress?: (e: React.UIEvent<HTMLElement, UIEvent>) => void;
  onKeyUp?: (e: React.UIEvent<HTMLElement, UIEvent>) => void;
};

export const onScrollEnd = () => {
  let number: number = Number(sessionStorage.getItem('flexesOnScrollEnd'));
  number = window.setTimeout(() => {}, 200);
  sessionStorage.setItem('flexesOnScrollEnd', String(number));
};
