import React from 'react';

import util from 'common/util';

import HeaderSection from 'cover/components/molecules/HeaderSection';
import AddTag from 'cover/components/organisms/Contents/Profile/tip/Add';
import TagComplexity from 'cover/components/organisms/Contents/Profile/tip/Complexity';
import TagSimply from 'cover/components/organisms/Contents/Profile/tip/Simply';
import { TagParentType, TagType, tagInvestor, tagFounder, tagMember, tagParentStory, tagTypes, tagStory } from 'cover/model/userTags';
import Flex, { Section, H5 } from 'cover/flexes';

import { TagValueType } from './common';

type Props = {
  isMyPage: boolean;
  tagParent: TagParentType;
  someTags: TagValueType[];
  isSavedAnimations: boolean;
  handleOnClickOpenTag: (tagParent: TagParentType, tagType?: TagType, index?: number, tagStructure?: any) => void;
  handleOnClickRemove: (tagParent: TagParentType, tagType: TagType, index: number) => void;
};

type TagLabelType = {
  industory: string;
  industoryParent: string;
  startupSeries: string;
  jobParent: string;
  job: string;
  story: string;
};

const tagLabelInit: TagLabelType = {
  industory: '',
  industoryParent: '',
  startupSeries: '',
  jobParent: '',
  job: '',
  story: '',
};

const Component: React.FC<Props> = ({
  isMyPage = false,
  tagParent,
  someTags,
  isSavedAnimations,
  handleOnClickOpenTag,
  handleOnClickRemove,
}: Props) => {
  const getTagComplexityNode = (tagParent: TagParentType, tagType: TagType, index: number, tag): React.ReactNode => {
    const labels = getConvertTagIdToLabel(tagType, tag);
    const key = `${tagParent}_${tagType}_${index}`;
    const upperLeft = labels.industoryParent;
    const upperRight = labels.industory;
    const bottomLeft = tagType === tagMember ? labels.job : labels.startupSeries;
    const bottomRight = `(${tag.year})`;

    return (
      <TagComplexity
        key={key}
        onClick={() => handleOnClickOpenTag(tagParent, tagType, index, tag)}
        onClickRemove={() => isMyPage && handleOnClickRemove(tagParent, tagType, index)}
        upperLeft={upperLeft}
        upperRight={upperRight}
        bottomLeft={bottomLeft}
        bottomRight={bottomRight}
      />
    );
  };

  const getContentNode = (): React.ReactNode => {
    if (tagParent === tagParentStory) {
      return (
        <Section key={`${tagParentStory}`} flow="column nowrap" upperPadding>
          <Flex className={`TagSection ${tagParent}`} flow="row wrap" alignItems="center" width="100%" upperMargin bottomMargin>
            {someTags &&
              someTags[tagParentStory] &&
              someTags[tagParentStory].map((tag, index) => {
                const labels = getConvertTagIdToLabel(tagStory, tag);
                return (
                  <TagSimply
                    key={`story_${tag.storyId}`}
                    onClick={() => handleOnClickOpenTag(tagStory, tagStory, index, tag)}
                    onClickRemove={() => isMyPage && handleOnClickRemove(tagParent, tagStory, index)}
                    label={labels.story}
                  />
                );
              })}
            {isMyPage && (
              <AddTag
                show
                alt="Add"
                onClick={() =>
                  handleOnClickOpenTag(tagStory, tagStory, someTags && someTags[tagParentStory] ? someTags[tagParentStory].length : 0)
                }
              />
            )}
          </Flex>
        </Section>
      );
    } else {
      return tagTypes.map((tagType: TagType, index) => {
        if (tagType !== tagStory) {
          const tagCnt = someTags && someTags[tagType] ? someTags[tagType].length : 0;
          return (
            <Section key={`${tagType}_${index}`} className={`${tagType}_${index}`} flow="column nowrap">
              <H5>{util.getHeadUpper(tagType)}</H5>
              <Flex className={`TagSection ${tagParent}`} flow="row wrap" alignItems="center" width="100%" upperMargin bottomMargin>
                {someTags &&
                  someTags[tagType] &&
                  someTags[tagType].map((tag, index) => getTagComplexityNode(tagParent, tagType, index, tag))}
                {isMyPage && <AddTag show={isMyPage} onClick={() => handleOnClickOpenTag(tagParent, tagType, tagCnt)} alt="Add" />}
              </Flex>
            </Section>
          );
        } else {
          return undefined;
        }
      });
    }
  };

  return (
    <HeaderSection
      key={`${tagParent} Tags`}
      title={util.getHeadUpper(`${tagParent} Tags`)}
      content={getContentNode()}
      checkAnimation={isSavedAnimations}
    />
  );
};

export default Component;

const getConvertTagIdToLabel = (tagType: TagType, tagStructure): TagLabelType => {
  let industoryId = '';
  let industoryParentId = '';
  let startupSeriesId = '';
  let jobId = '';
  let jobParentId = '';
  let storyId = '';
  let tagLabels = { ...tagLabelInit };

  switch (tagType) {
    case tagInvestor:
      industoryId = tagStructure.industoryId;
      industoryParentId = industoryId.split('-')[0];
      startupSeriesId = tagStructure.startupSeriesId;
      tagLabels.industory = window.talknDatas.staticTagsById.industory[industoryId].ja;
      tagLabels.industoryParent = window.talknDatas.staticTagsById.industoryParent[industoryParentId].ja;
      tagLabels.startupSeries = window.talknDatas.staticTagsById.startupSeries[startupSeriesId].ja;
      break;
    case tagFounder:
      industoryId = tagStructure.industoryId;
      industoryParentId = industoryId.split('-')[0];
      startupSeriesId = tagStructure.startupSeriesId;
      tagLabels.industory = window.talknDatas.staticTagsById.industory[industoryId].ja;
      tagLabels.industoryParent = window.talknDatas.staticTagsById.industoryParent[industoryParentId].ja;
      tagLabels.startupSeries = window.talknDatas.staticTagsById.startupSeries[startupSeriesId].ja;
      break;
    case tagMember:
      industoryId = tagStructure.industoryId;
      industoryParentId = industoryId.split('-')[0];
      jobId = tagStructure.jobId;
      jobParentId = jobId.split('-')[0];
      tagLabels.industory = window.talknDatas.staticTagsById.industory[industoryId].ja;
      tagLabels.industoryParent = window.talknDatas.staticTagsById.industoryParent[industoryParentId].ja;
      tagLabels.job = window.talknDatas.staticTagsById.jobs[jobId].ja;
      tagLabels.jobParent = window.talknDatas.staticTagsById.jobParents[jobParentId].ja;
      break;
    case tagStory:
      storyId = tagStructure.storyId;
      tagLabels.story = window.talknDatas.staticTagsById.story[storyId].ja;
      break;
  }
  return tagLabels;
};
