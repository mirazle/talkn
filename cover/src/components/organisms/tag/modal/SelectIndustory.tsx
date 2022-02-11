import React, { useEffect, useState } from 'react';
import type { FunctionComponent } from 'react';
import styled from 'styled-components';

import { ConfigType } from 'common/talknConfig';

import Button, { buttonBackgroundPositive, buttonBackgroundCancel } from 'cover/components/atoms/Button';
import Flex from 'cover/components/atoms/Flex';
import P from 'cover/components/atoms/P';
import Title from 'cover/components/atoms/Title';
import Modal from 'cover/components/organisms/Modal';
import * as styles from 'cover/styles';

import { InputCss } from '../common';

type Props = {
  ch: string;
  config: ConfigType;
};

type TagModalType = {
  index: number;
  type: string;
  termId?: string;
  titleId?: string;
  years?: string;
  parentId: string;
  categoryId: string;
  uniqueId: string;
  label: string;
};

const tagModalInit: TagModalType = { type: '', index: 0, parentId: '', categoryId: '', uniqueId: '', label: '' };

const NoSelectOptionLabel = '-';

const getNoSelectOption = (label = NoSelectOptionLabel) => (
  <option key={'NO SELECT'} value={undefined}>
    {label}
  </option>
);

const getTagInit = (config, type = 'iamTags'): TagModalType[] => {
  return config[type].map((uniqueId, index) => {
    const [parentId] = uniqueId.split('-');
    const tag = window.talknTags.jobs.filter((t) => t.uniqueId === uniqueId)[0];
    const init = { ...tagModalInit };
    init.type = type;
    init.index = index;
    if (parentId) init.parentId = parentId;
    if (tag && tag.categoryId) init.parentId = tag.categoryId;
    if (uniqueId) init.uniqueId = uniqueId;
    if (tag && tag.ja) init.parentId = tag.ja;
    return init;
  });
};

const Component: FunctionComponent<Props> = ({ ch, config }: Props) => {
  // 入力したタグ情報保持
  const [inputedIamTags, setInputedIamTags] = useState<TagModalType[]>(getTagInit(config, 'iamTags'));
  const [inputedRelationTags, setInputedRelationTags] = useState<TagModalType[]>(getTagInit(config, 'relationTags'));

  // タグ設定モーダルを開く際のオプション
  const [tagModalOption, setTagModalOption] = useState<TagModalType>(tagModalInit);
  const [jobParents] = useState(window.talknTags.jobParents);

  // 選択肢
  const [jobCategory, setJobCategory] = useState([]);
  const [jobs, setJobs] = useState([]);

  // inputをクリックしてタグ設定モーダルを開く
  const handleOnClickInputTag = (e) => {
    const { parentId, categoryId } = e.target.dataset;
    setTagModalOption({ ...e.target.dataset, label: e.target.value });

    // set category
    const updateTagCategory = window.talknTags.jobCategory.filter((tag) => tag.parentId === parentId);
    setJobCategory(updateTagCategory);

    // set tag
    const updateTags = window.talknTags.jobs.filter((tag) => tag.categoryId === categoryId);
    setJobs(updateTags);
  };

  const handleOnChangeParent = (e) => {
    const parentId = e.target.value;
    const updateTagCategory = window.talknTags.jobCategory.filter((tag) => tag.parentId === parentId);
    setTagModalOption({ ...tagModalOption, parentId });
    setJobCategory(updateTagCategory);
    setJobs([]);
  };

  const handleOnChangeCategory = (e) => {
    const categoryId = e.target.value;
    const updateTags = window.talknTags.jobs.filter((tag) => tag.categoryId === categoryId);
    setTagModalOption({ ...tagModalOption, categoryId });
    setJobs(updateTags);
  };

  const handleOnChangeTag = (e) => {
    const selectedTag = window.talknTags.jobs.filter((tag) => tag.uniqueId === e.target.value)[0];
    const uniqueId = selectedTag ? e.target.value : '';
    const label = selectedTag ? selectedTag.ja : '';
    setTagModalOption({ ...tagModalOption, uniqueId, label });
  };

  const handleOnClickOkButton = () => {
    if (tagModalOption.uniqueId !== '') {
      switch (tagModalOption.type) {
        case 'iamTags':
          if (inputedIamTags[tagModalOption.index]) {
            setInputedIamTags(inputedIamTags.map((tag, index) => (Number(tagModalOption.index) === index ? tagModalOption : tag)));
          } else {
            inputedIamTags.push(tagModalOption);
            console.log(inputedIamTags);
            setInputedIamTags(inputedIamTags);
          }
          break;
        case 'relationTags':
          inputedRelationTags[tagModalOption.index] = {
            ...tagModalInit,
            type: tagModalOption.type,
            parentId: tagModalOption.parentId,
            categoryId: tagModalOption.categoryId,
            uniqueId: tagModalOption.uniqueId,
            label: tagModalOption.label,
          };
          setInputedRelationTags(inputedRelationTags);
          break;
      }

      setTagModalOption({ ...tagModalInit });
    }
  };

  const getIamTags = (index, tag) => {
    return (
      <TagInput
        key={`iamTags-${index}-${tag.uniqueId}`}
        defaultValue={tag.label}
        autoComplete="off"
        onClick={handleOnClickInputTag}
        data-type={'iamTags'}
        data-index={index}
        data-parent-id={tag.parentId}
        data-category-id={tag.categoryId}
        data-unique-id={tag.uniqueId}
      />
    );
  };

  const getRelationTags = (index, tag) => {
    return (
      <TagInput
        key={`relationTags-${index}-${tag.uniqueId}`}
        defaultValue={tag.label}
        autoComplete="off"
        onClick={handleOnClickInputTag}
        data-type={'relationTags'}
        data-index={index}
        data-parent-id={tag.parentId}
        data-category-id={tag.categoryId}
        data-unique-id={tag.uniqueId}
      />
    );
  };

  return (
    <Container>
      <Form method="post">
        <Title type="Config">● Version</Title>
        <VersionInput type="text" name="version" value={config['version']} readOnly />
        <Title type="Config">● Ch</Title>
        <ChInput type="text" name="ch" value={ch} readOnly />

        <Title type="Config">● I&apos;am Tags</Title>
        <Flex flow="row wrap">
          {inputedIamTags.map((tag, index) => getIamTags(index, tag))}
          {getIamTags(inputedIamTags.length, tagModalInit)}
        </Flex>
        <Title type="Config">● Relation Tags</Title>
        <Flex flow="row wrap">
          {inputedRelationTags.map((tag, index) => getRelationTags(index, tag))}
          {getRelationTags(inputedIamTags.length, tagModalInit)}
        </Flex>
        <br />
        <br />
        <Button width="300px">Download(※)</Button>
        <CustomP className="CustomP">
          ※ Please upload the downloaded file to your site
          <br /> /{ch}talkn.config.json
        </CustomP>
      </Form>

      <Modal show={tagModalOption.type !== ''} setShowModal={() => setTagModalOption(tagModalInit)} flow="column nowrap">
        <Flex
          flow="row wrap"
          alignItems="center"
          justifyContent="center"
          width="100%"
          upperPadding
          sidePadding
          bottomPadding
          bottomMargin
          border="underline">
          <Title>職業タグ</Title>
        </Flex>
        <TagSelect onChange={handleOnChangeParent} value={tagModalOption.parentId}>
          {getNoSelectOption()}
          {jobParents.map((tag) => (
            <option key={tag.uniqueId} value={tag.uniqueId}>
              {tag.ja}
            </option>
          ))}
        </TagSelect>

        <TagSelect onChange={handleOnChangeCategory} value={tagModalOption.categoryId}>
          {getNoSelectOption()}
          {jobCategory.map((tag) => (
            <option key={tag.uniqueId} value={tag.uniqueId}>
              {tag.ja}
            </option>
          ))}
        </TagSelect>
        <TagSelect onChange={handleOnChangeTag} value={tagModalOption.uniqueId}>
          {getNoSelectOption()}
          {jobs.map((tag) => (
            <option key={tag.uniqueId} value={tag.uniqueId}>
              {tag.ja}
            </option>
          ))}
        </TagSelect>
        <Flex width="100%" upperMargin bottomMargin>
          <Button width="40%" disabled={false} theme={buttonBackgroundCancel} onClick={() => setTagModalOption(tagModalInit)}>
            CANCEL
          </Button>
          <Button width="40%" disabled={tagModalOption.uniqueId === ''} theme={buttonBackgroundPositive} onClick={handleOnClickOkButton}>
            OK
          </Button>
        </Flex>
      </Modal>
    </Container>
  );
};

export default Component;

const Container = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-flow: column wrap;
  align-items: flex-start;
  justify-content: flex-start;
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

const CustomP = styled(P)`
  width: 100%;
  margin-top: ${styles.doubleMargin}px;
  margin-right: ${styles.doubleMargin}px;
  text-align: right;
  line-height: 40px;
`;

const TagSelect = styled.select`
  ${InputCss};
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  margin: ${styles.baseMargin}px;
`;

const TagSelectShort = styled.select`
  ${InputCss};
  appearance: none;
  -webkit-appearance: none;
  width: 100px;
  max-width: 100px;
  min-width: 100px;
  margin: ${styles.baseMargin}px;
`;

const TagInput = styled.input`
  ${InputCss};
  width: 26%;
  margin-bottom: ${styles.baseMargin}px;
`;
