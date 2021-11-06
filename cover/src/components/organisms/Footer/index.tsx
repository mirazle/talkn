import * as React from 'react';
import type { FunctionComponent } from 'react';
import styled from 'styled-components';

import DesignSection from 'cover/components/organisms/Footer/DesignSection';
import EditSection from 'cover/components/organisms/Footer/EditSection';
import MessageSection from 'cover/components/organisms/Footer/MessageSection';
import OtherContentsSection from 'cover/components/organisms/Footer/OtherContentsSection';
import ServiceConceptSection from 'cover/components/organisms/Footer/ServiceConceptSection';
import ToTopSection from 'cover/components/organisms/Footer/ToTopSection';

type Props = {};

const Component: FunctionComponent<Props> = () => {
  return (
    <Footer>
      <EditSection />
      <ToTopSection />
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
