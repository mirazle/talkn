import React from 'react';

import Node from './Node';

export type Props = {
  type: string;
  props?: (React.InputHTMLAttributes<HTMLInputElement> & React.ClassAttributes<HTMLInputElement>) | null;
  nodes?: string | Props[];
};

const isGangerousTag = (nodes) => {
  if (nodes.indexOf('&lt;') >= 0 && nodes.indexOf('&gt;') >= 0) return 1;
  if (nodes.indexOf('<') >= 0 && nodes.indexOf('</') >= 0) return 2;
  if (nodes.indexOf('<') >= 0 && nodes.indexOf('/>') >= 0) return 3;
  return 0;
};

const Component: React.FC<Props> = (params) => {
  const { type, nodes } = params;
  let { props } = params;
  if (typeof nodes === 'string' && isGangerousTag(nodes)) {
    if (props === undefined) props = {};
    const html = nodes.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    props.dangerouslySetInnerHTML = { __html: html };
    return React.createElement(type, props);
  } else if (typeof nodes === 'object' && nodes.constructor.name === 'Array' && nodes.length > 0) {
    return React.createElement(
      type,
      props,
      nodes.map((tag, index) => <Node key={`${tag.type}${index}`} type={tag.type} props={tag.props} nodes={tag.nodes} />)
    );
  }

  if (nodes && nodes.length > 0) {
    return React.createElement(type, props, nodes);
  } else {
    return React.createElement(type, props);
  }
};

export default Component;
