import React, { useEffect, useRef, useState } from 'react';

import config from './config';
import { flexesPropsInit } from './constants';
import { FlexesContextType, useFlexesContext } from './nodes/context';
import styledComponents from './styledComponents';
import { Props, FlexesOptionType } from './types';
import { TagType } from './types/tag';

export * from './types';
export * from './constants';
export * from './entity/FlexLayout';

const { libName } = config;
const deleteChildren = ['Img'];
let elements: { [key in TagType]: (props, option) => React.ReactNode } | { Div: () => void } = { Div: () => {} };

Object.keys(styledComponents).forEach((category) => {
  Object.keys(styledComponents[category]).forEach((tagName: TagType) => {
    const FlexesComponent = styledComponents[category][tagName];
    elements[tagName] = (props, option) => {
      if (deleteChildren.includes(tagName)) delete props.children;
      return (
        <FlexesComponent {...props} {...option}>
          {props.children}
        </FlexesComponent>
      );
    };
  });
});

export default (tagType: TagType) => (props: Props) => {
  const globalContext: FlexesContextType = useFlexesContext();

  let p: Props = {
    ref: useRef(),
    ...flexesPropsInit,
    ...props,
    className: props.className ? `${libName} ${tagType} ${props.className}` : `${libName} ${tagType}`,
  };

  const [option, setOption] = useState<FlexesOptionType>({ height: p.height });
  const isOverflowYScroll = p.overflow.split(' ')[1] && p.overflow.split(' ')[1] === 'scroll';
  const selfElm = p.ref.current as unknown as HTMLElement;
  useEffect(() => {
    if (selfElm) {
      if (isOverflowYScroll) {
        const parentElm = selfElm.parentElement;
        setOption({ ...option, height: `${parentElm.clientHeight}px` });
      }
    }
  }, [isOverflowYScroll && globalContext.innerHeight]);

  useEffect(() => {
    if (selfElm) {
      if (p.mouted) {
        p.mouted(selfElm);
      }
      setOption({ ...option, clientWidth: selfElm.clientWidth, clientHeight: selfElm.clientHeight });
    }
  }, [selfElm]);

  return elements[tagType] ? elements[tagType](p, option) : elements.Div(p, option);
};
