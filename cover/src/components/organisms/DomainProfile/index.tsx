import React from 'react';
import styled from 'styled-components';

import SnsLinks from 'cover/components/molecules/SnsLinks';
import Flex, { P, H5 } from 'cover/flexes';
import styles from 'cover/styles';

type Props = {
  serverMetas: any;
};

const Component: React.FC<Props> = ({ serverMetas }: Props) => {
  return (
    <Container>
      <DomainProfileTitle className={'DomainProfileTitle'} id={'Section'}>
        Domain Profile
      </DomainProfileTitle>
      <FlexProfile className="FlexProfile">
        <DomainProfileImage src={serverMetas['og:image']} />
        <Description>
          <H5>{serverMetas['title']}</H5>
          <P className="description">{serverMetas['description']}</P>
          <TagsSection>
            <P>I'am Tags</P>
            <Tags>
              {serverMetas.keywords &&
                serverMetas.keywords.split(',').map((tag: string, index: number) => tag !== '' && <Tag key={`Tag${index}`}>{tag}</Tag>)}
            </Tags>
            <P>Search Tags</P>
            <Tags>
              {window.talknDatas.config.relationTags.map(
                (tag: string, index: number) => tag !== '' && <Tag key={`Tag${index}`}>{tag}</Tag>
              )}
            </Tags>
          </TagsSection>
          <SnsLinksWrap>
            <SnsLinks serverMetas={serverMetas} />
          </SnsLinksWrap>
        </Description>
      </FlexProfile>
    </Container>
  );
};

export default Component;

const Container = styled.div`
  overflow: hidden;
  width: 100%;
  max-width: ${styles.appWidth}px;
  height: auto;
  padding: ${styles.doublePadding}px;
  margin-top: ${styles.quadMargin}px;
  margin-bottom: ${styles.quadMargin}px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid ${styles.borderColor};
  border-radius: ${styles.doubleSize}px;
  .DomainProfileDescTitle {
    padding-bottom: ${styles.doublePadding}px;
  }
  @media (max-width: ${styles.doubleAdvertWidth}px) {
    width: calc(100% - ${styles.baseMargin}px);
    margin-left: ${styles.baseMargin}px;
  }
  @media (max-width: ${styles.spLayoutWidth}px) {
    width: 100%;
    padding: ${styles.sectionPadding}px ${styles.sectionPadding / 2}px;
    margin-top: 0;
    margin-left: 0;
    margin-right: 0;
    border-radius: 0;
  }
`;

const FlexProfile = styled(Flex)`
  padding-top: ${styles.doublePadding}px;
  @media (max-width: ${styles.spLayoutStrictWidth}px) {
    flex-flow: column nowrap;
  }
`;

const DomainProfileTitle = styled(H5)`
  padding-bottom: ${styles.basePadding}px;
  line-height: 60px;
  border-bottom: 1px solid ${styles.borderColor};
  font-weight: 400;
`;

const DomainProfileImage = styled.img`
  width: ${styles.imageWidth}px;
  min-width: ${styles.imageWidth}px;
  height: min-content;
  @media (max-width: ${styles.spLayoutStrictWidth}px) {
    width: 100%;
    height: auto;
  }
`;

const Description = styled.div`
  width: calc(100% - ${styles.imageWidth}px);
  padding-left: ${styles.basePadding}px;
  p.description {
    padding-top: ${styles.doublePadding}px;
  }
  @media (max-width: ${styles.spLayoutStrictWidth}px) {
    padding-top: ${styles.doublePadding}px;
    width: 100%;
  }
`;

const TagsSection = styled.section`
  margin-bottom: ${styles.baseMargin}px;
  p {
    margin: ${styles.baseMargin}px 0;
  }
`;

const Tags = styled.section`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: flex-start;
`;

const Tag = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 12px 20px;
  margin: 10px;
  border-radius: ${styles.doubleSize}px;
  background: ${styles.fontColor};
  color: #fff;
  white-space: nowrap;
  transition: ${styles.transitionDuration}ms;
  cursor: pointer;
  :hover {
    background: ${styles.themeColor};
  }
`;

const SnsLinksWrap = styled.section`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: flex-start;
  max-width: 375px;
  padding: ${styles.basePadding}px ${styles.doublePadding}px;
  @media (max-width: ${styles.spLayoutStrictWidth}px) {
    width: 100%;
  }
`;
