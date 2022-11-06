import { FlexBoxLayoutPropsType } from '..';
import { css } from 'styled-components';

import { BoxLayoutCss } from './BoxLayout';
import { ContentCss } from './Content';

import { getHoverAltCss } from '../plugin/hoverAlt';

type ComponentPropsType = any;

export const FlexCss = css<FlexBoxLayoutPropsType>`
  display: ${(props) => props.display};
  flex-flow: ${(props) => props.flow};
  align-items: ${(props) => props.alignItems};
  justify-content: ${(props) => props.justifyContent};
  user-select: ${(props) => (props.select ? 'text' : 'none')};
`;

export const FlexesBaseCss = css<ComponentPropsType>`
  ${FlexCss};
  ${BoxLayoutCss};
  ${ContentCss};
  ${(props) => props.alt && props.alt !== '' && getHoverAltCss(props)};
`;
