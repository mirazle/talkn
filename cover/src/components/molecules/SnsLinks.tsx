import * as React from 'react';
import type { FunctionComponent } from 'react';
import styled from 'styled-components';

import conf from 'common/conf';

type Props = {
  serverMetas: any;
};

const getSnsIconSrc = ({ type, visible }) => {
  switch (type) {
    case 'twitter':
      return visible ? `//${conf.assetsImgPath}twitter.svg` : `//${conf.assetsImgPath}twitter_gray.svg`;
    case 'facebook':
      return visible ? `//${conf.assetsImgPath}facebook.svg` : `//${conf.assetsImgPath}facebook_gray.svg`;
    case 'appstore':
      return visible ? `//${conf.assetsImgPath}appstore.svg` : `//${conf.assetsImgPath}appstore_gray.svg`;
    case 'android':
      return visible ? `//${conf.assetsImgPath}android.svg` : `//${conf.assetsImgPath}android_gray.svg`;
  }
};
const Component: FunctionComponent<Props> = ({ serverMetas }) => {
  return (
    <Container>
      <SnsIconImg src={getSnsIconSrc({ type: 'twitter', visible: serverMetas['twitter:site'] !== '' })} />
      <SnsIconImg src={getSnsIconSrc({ type: 'facebook', visible: serverMetas['fb:page_id'] !== '' })} />
      <SnsIconImg src={getSnsIconSrc({ type: 'appstore', visible: serverMetas['al:ios:app_store_id'] !== '' })} />
      <SnsIconImg src={getSnsIconSrc({ type: 'android', visible: serverMetas['al:android:package'] !== '' })} />
    </Container>
  );
};

export default Component;

const Container = styled.section`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const SnsIconImg = styled.img`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  width: 46px;
  min-width: 46px;
  max-width: 46px;
  height: 46px;
  min-height: 46px;
  max-height: 46px;
  user-select: none;
`;
