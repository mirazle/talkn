import * as React from 'react';
import type { FunctionComponent } from 'react';
import styled from 'styled-components';

import ActionsSection from 'cover/components/organisms/Footer/ActionsSection';
import DesignSection from 'cover/components/organisms/Footer/DesignSection';
import MessageSection from 'cover/components/organisms/Footer/MessageSection';
import OtherContentsSection from 'cover/components/organisms/Footer/OtherContentsSection';
import ServiceConceptSection from 'cover/components/organisms/Footer/ServiceConceptSection';
import ToTopSection from 'cover/components/organisms/Footer/ToTopSection';

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
`;
