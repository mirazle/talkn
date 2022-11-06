import * as React from 'react';
import type { FunctionComponent } from 'react';
import styled from 'styled-components';

import ActionsSection from 'components/atomicDesign/organisms/Footer/ActionsSection';
import DesignSection from 'components/atomicDesign/organisms/Footer/DesignSection';
import MessageSection from 'components/atomicDesign/organisms/Footer/MessageSection';
import OtherContentsSection from 'components/atomicDesign/organisms/Footer/OtherContentsSection';
import ServiceConceptSection from 'components/atomicDesign/organisms/Footer/ServiceConceptSection';
import ToTopSection from 'components/atomicDesign/organisms/Footer/ToTopSection';

type Props = {
  ch: string;
};

const Component: FunctionComponent<Props> = ({ ch }) => {
  return (
    <Footer>
      <ToTopSection />
      <ActionsSection ch={ch} />
      <ServiceConceptSection />
      <OtherContentsSection />
      <DesignSection />
      <MessageSection />
    </Footer>
  );
};

export default Component;

const Footer = styled.footer`
  display: flex;
  flex-flow: column;
  justify-content: center;
  width: 100%;
  background: #000;
`;
