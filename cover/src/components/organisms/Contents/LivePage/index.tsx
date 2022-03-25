import * as React from 'react';
import type { FunctionComponent } from 'react';
import styled from 'styled-components';

import CommingSoon from 'cover/components/atoms/CommingSoon';
import Spinner from 'cover/components/atoms/Spinner';

type Props = {
  ch: string;
  userCategoryChs: string[];
  talknFrameRef: React.MutableRefObject<HTMLElement>;
};

const Component: FunctionComponent<Props> = ({ ch, userCategoryChs, talknFrameRef }) => {
  return userCategoryChs.length > 0 ? (
    <Container>
      {userCategoryChs.map((categoryCh: any, index) => {
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
