import React, { useRef, useState } from 'react';
import type { FunctionComponent } from 'react';
import styled, { css } from 'styled-components';

import { ConfigType } from 'common/Config';

import Flex from 'cover/components/atoms/Flex';
import P from 'cover/components/atoms/P';
import Title from 'cover/components/atoms/Title';
import * as styles from 'cover/styles';

type Props = {
  ch: string;
  config: ConfigType;
};

const getCreatorsIndex = (obj, index) => {
  return (
    <CreatorsIndex key={index}>
      <CreatorsIndexNo>
        <Title type="Config">#{index + 1}</Title>
      </CreatorsIndexNo>
      <Flex flow="row nowrap" alignItems="center" justifyContent="flex-start">
        <Title type="Config">Title</Title>
        <CreatorsIndexTitleIpnut type="text" name={`creatorsIndex[${index}]['title']`} defaultValue={obj['title']} />
      </Flex>
      <Flex flow="row nowrap" alignItems="center" justifyContent="flex-start">
        <Title type="Config">EyeCatch</Title>
        <CreatorsIndexEyeCatchInput type="text" name={`creatorsIndex[${index}]['eyeCatch']`} defaultValue={obj['eyeCatch']} />
      </Flex>
      <Flex flow="row nowrap" alignItems="center" justifyContent="flex-start">
        <Title type="Config">File</Title>
        <CreatorsIndexInterviewInput type="text" name={`creatorsIndex[${index}]['interview']`} defaultValue={obj['interview']} />
      </Flex>
    </CreatorsIndex>
  );
};

const getUserCategoryChs = (ch, userCategoryCh, index) => {
  console.log(ch);
  return (
    <Flex key={`userCategoryCh-${index}`} flow="row nowrap" alignItems="center" justifyContent="flex-start">
      <Title type="Config">Ch:</Title>
      <UseCategoryChInput key={index} name={'userCategoryCh'} type="text" defaultValue={userCategoryCh.replace(ch, '')} />
    </Flex>
  );
};

const Component: FunctionComponent<Props> = ({ ch, config }: Props) => {
  const [iamTags, setIamTags] = useState(config.iamTags);
  const [relationTags, setRelationTags] = useState(config.relationTags);
  const configRef = useRef(<Button />);

  const handleOnBlurIamTag = (e, index) => {
    iamTags[index] = e.target.value;
    const updateIamTags = iamTags.filter((tag) => tag !== '');
    setIamTags(updateIamTags);
  };
  const handleOnBlurRelationTag = (e, index) => {
    let updateRelationTags = [...relationTags];
    updateRelationTags[index] = e.target.value;
    console.log(updateRelationTags);
    updateRelationTags = updateRelationTags.filter((tag) => tag !== '');
    console.log(updateRelationTags);
    setRelationTags(updateRelationTags);
  };

  const getIamTags = (label, index) => {
    return <Tag key={`Tag-${label}-${index}`} name={'iamTags'} defaultValue={label} onBlur={(e) => handleOnBlurIamTag(e, index)} />;
  };

  const getRelationTags = (label, index) => {
    return (
      <Tag key={`Tag-${label}-${index}`} name={'relationTags'} defaultValue={label} onBlur={(e) => handleOnBlurRelationTag(e, index)} />
    );
  };

  return (
    <Container>
      <Form ref={configRef} method="post">
        <Title type="Config">● Version</Title>
        <VersionInput type="text" name="version" value={config['version']} readOnly />
        <Title type="Config">● Ch</Title>
        <ChInput type="text" name="ch" value={ch} readOnly />
        <Title type="Config">● Live Pages</Title>
        <Flex flow="row wrap">{config['userCategoryChs'].map((label, index) => getUserCategoryChs(ch, label, index))}</Flex>
        <Title type="Config">● Creators</Title>
        <Flex flow="row wrap">{config['creatorsIndex'].map(getCreatorsIndex)}</Flex>
        <Title type="Config">● I&apos;am Tags</Title>
        <Flex flow="row wrap">
          {iamTags.map(getIamTags)}
          {getIamTags('', iamTags.length)}
        </Flex>
        <Title type="Config">● Relation Tags</Title>
        <Flex flow="row wrap">
          {console.log(relationTags)}
          {relationTags.map(getRelationTags)}
          {getRelationTags('', relationTags.length)}
        </Flex>
        <Button>Download(※)</Button>
        <CustomP className="CustomP">
          ※Upload your site
          <br /> /{ch}talkn.config.json
        </CustomP>
      </Form>
    </Container>
  );
};

export default Component;

const Container = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
`;

type FormType = {
  ref: any;
};

const Form = styled.form<FormType>`
  display: flex;
  flex-flow: column wrap;
  align-items: flex-start;
  justify-content: flex-start;
`;

const InputCss = css`
  display: block;
  min-width: 320px;
  max-width: calc(100% - ${styles.doubleMargin * 2}px);
  padding: ${styles.basePadding}px;
  margin-left: ${styles.doubleMargin}px;
  margin-right: ${styles.doubleMargin}px;
  outline-color: ${styles.themeColor};
  color: ${styles.fontColor};
  border-radius: 3px;
  border: 2px solid ${styles.borderColor};
  background: rgb(250, 250, 250);
  cursor: pointer;
  transition: ${styles.transitionDuration}ms;
  :focus {
    background: rgb(240, 250, 240);
  }
  :hover {
    background: rgb(240, 250, 240);
  }
`;

const VersionInput = styled.input`
  ${InputCss};
  width: 200px;
`;

const ChInput = styled.input`
  ${InputCss};
  width: 360px;
`;

const CreatorsIndex = styled.div`
  min-width: fit-content;
  max-width: 45%;
  .Title {
    width: 200px;
    min-width: 100px;
    margin: ${styles.baseMargin}px 0;
  }
`;

const CreatorsIndexNo = styled.div``;

const CreatorsIndexTitleIpnut = styled.input`
  ${InputCss};
  width: 100%;
`;
const CreatorsIndexEyeCatchInput = styled.input`
  ${InputCss};
  width: 100%;
`;
const CreatorsIndexInterviewInput = styled.input`
  ${InputCss};
  width: 100%;
`;

const UseCategoryChInput = styled.input`
  ${InputCss};
  width: 100%;
`;

const Tag = styled.input`
  ${InputCss};
  width: 26%;
  margin-bottom: ${styles.baseMargin}px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: ${styles.baseHeight}px;
  margin: ${styles.baseHeight}px auto 0 auto;
  border-radius: 3px;
  border: 0;
  color: ${styles.fontColor};
  outline: none;
  cursor: pointer;
  background: #eee;
  transition: ${styles.transitionDuration}ms;
  :hover {
    background: ${styles.themeColor};
    color: #fff;
  }
`;

const CustomP = styled(P)`
  width: 100%;
  margin-top: ${styles.doubleMargin}px;
  margin-right: ${styles.doubleMargin}px;
  text-align: right;
`;
