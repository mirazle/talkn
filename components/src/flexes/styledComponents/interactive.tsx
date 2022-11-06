import styled from 'styled-components';

import { FlexesBaseCss } from '../entity/FlexLayout';

// interactive
export const Details = styled.details`
  ${FlexesBaseCss};
`;
export const Summary = styled.summary`
  ${FlexesBaseCss};
`;
export const Menu = styled.menu`
  ${FlexesBaseCss};
`;

export default {
  Details,
  Summary,
  Menu,
};
