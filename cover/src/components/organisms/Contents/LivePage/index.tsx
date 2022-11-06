import * as React from 'react';
import type { FunctionComponent } from 'react';
import styled from 'styled-components';

import CommingSoon from 'cover/components/atoms/CommingSoon';

type Props = {
  ch: string;
  categoryChs: string[];
  talknFrameRef: React.MutableRefObject<HTMLElement>;
};

const Component: FunctionComponent<Props> = ({ ch, categoryChs, talknFrameRef }) => {
  return categoryChs.length > 0 ? (
    <Container>
      {categoryChs.map((categoryCh: any, index) => {
        if (categoryCh && categoryCh !== '') {
          /*
          return (
            <TalknFrame key={`${categoryCh}:${index}`} ref={talknFrameRef} className="talknFrame" data-ch={categoryCh}>
              <Spinner size="50" />
            </TalknFrame>
          );
          */
          return <></>;
        } else {
          return null;
        }
      })}
    </Container>
  ) : (
    <CommingSoon ch={ch} />
  );
};

export default Component;

const Container = styled.div``;

type TalknFramePropsType = {
  'data-ch': string;
  'ref': any;
};

const TalknFrame = styled.div<TalknFramePropsType>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 340px;
`;
