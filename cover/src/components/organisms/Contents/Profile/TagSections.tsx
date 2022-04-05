import React from 'react';

import Flex from 'cover/components/atoms/Flex';
import H from 'cover/components/atoms/H';
import Section from 'cover/components/atoms/Section';
import HeaderSection from 'cover/components/molecules/HeaderSection';
import {
  TagParentType,
  tagParentDashboard,
  TagType,
  tagInvestor,
  tagFounder,
  tagMember,
  tagParentStory,
  tagTypes,
  tagStory,
} from 'cover/components/organisms/Contents/Profile';
import ControlButton from 'cover/components/organisms/Contents/Profile/button/ControlButton';
import ResetButton from 'cover/components/organisms/Contents/Profile/button/ResetButton';
import AddTag from 'cover/components/organisms/Contents/Profile/tip/Add';
import TagComplexity from 'cover/components/organisms/Contents/Profile/tip/Complexity';
import TagSimply from 'cover/components/organisms/Contents/Profile/tip/Simply';
import { GoogleSessionType } from 'cover/talkn.cover';

import { TagValueType } from './common';

type Props = {
  session: GoogleSessionType;
  isMyPage: boolean;
  tagParent: TagParentType;
  someTags: TagValueType[];
  isEditables: {};
  isChangeUserTag: boolean;
  isSavedAnimations: boolean;
  setIsEditables: React.Dispatch<React.SetStateAction<{}>>;
  handleOnClickReset: (tagParent: TagParentType) => Promise<void>;
  handleOnClickTag: (isEditable: boolean, tagParent: TagParentType, tagType?: TagType, index?: number, tagStructure?: any) => void;
  handleOnClickRemove: (tagParent: TagParentType, tagType: TagType, index: number) => void;
  handleOnClickSave: (tagParent: TagParentType) => void;
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
  session,
  isMyPage = false,
  tagParent,
  someTags,
  isEditables,
  isChangeUserTag,
  isSavedAnimations,
  setIsEditables,
  handleOnClickReset,
  handleOnClickTag,
  handleOnClickRemove,
  handleOnClickSave,
}: Props) => {
  const getTagNode = (tagParent: TagParentType, tagType: TagType, index: number, tagStructure, labels: TagLabelType): React.ReactNode => {
    switch (tagType) {
      case tagInvestor:
        return (
          <TagComplexity
            key={`${tagParent}_${tagType}_${index}`}
            isEditable={isEditables[tagParent]}
            onClick={() => handleOnClickTag(isEditables[tagParent], tagParent, tagType, index, tagStructure)}
            onClickRemove={() => handleOnClickRemove(tagParent, tagType, index)}
            upperLeft={labels.industoryParent}
            upperRight={labels.industory}
            bottomLeft={labels.startupSeries}
            bottomRight={`(${tagStructure.year})`}
          />
        );
      case tagFounder:
        return (
          <TagComplexity
            key={`${tagParent}_${tagType}_${index}`}
            isEditable={isEditables[tagParent]}
            onClick={() => handleOnClickTag(isEditables[tagParent], tagParent, tagType, index, tagStructure)}
            onClickRemove={() => handleOnClickRemove(tagParent, tagType, index)}
            upperLeft={labels.industoryParent}
            upperRight={labels.industory}
            bottomLeft={labels.startupSeries}
            bottomRight={`(${tagStructure.year})`}
          />
        );
      case tagMember:
        return (
          <TagComplexity
            key={`${tagParent}_${tagType}_${index}`}
            isEditable={isEditables[tagParent]}
            onClick={() => handleOnClickTag(isEditables[tagParent], tagParent, tagType, index, tagStructure)}
            onClickRemove={() => handleOnClickRemove(tagParent, tagType, index)}
            upperLeft={labels.industoryParent}
            upperRight={labels.industory}
            bottomLeft={labels.job}
            bottomRight={`(${tagStructure.year})`}
          />
        );
    }
  };

  const getContent = () => {
    if (tagParent === tagParentDashboard) {
      return (
        <Section key={`${tagParentStory}`} flow="column nowrap" upperPadding sideMargin sidePadding>
          {session.name}
        </Section>
      );
    } else if (tagParent === tagParentStory) {
      const tagTypeLower = tagParentStory.toLocaleLowerCase();
      return (
        <Section key={`${tagParentStory}`} flow="column nowrap" upperPadding sideMargin sidePadding>
          <H.Five>{tagParentStory}</H.Five>
          <Flex className={`TagSection ${tagParent}`} flow="row wrap" alignItems="center" width="100%" upperMargin bottomMargin>
            {someTags &&
              someTags[tagTypeLower] &&
              someTags[tagTypeLower].map((tagStructure, index) => {
                const labels = getConvertTagIdToLabel(tagStory, tagStructure);
                return (
                  <TagSimply
                    key={`story_${tagStructure.storyId}`}
                    isEditable={isEditables[tagParent]}
                    onClick={() => handleOnClickTag(isEditables[tagParent], tagStory, tagStory, index, tagStructure)}
                    onClickRemove={() => handleOnClickRemove(tagParent, tagStory, index)}
                    label={labels.story}
                  />
                );
              })}
            {isMyPage && (
              <AddTag
                show={isEditables[tagParent]}
                onClick={() =>
                  handleOnClickTag(true, tagStory, tagStory, someTags && someTags[tagTypeLower] ? someTags[tagTypeLower].length : 0)
                }
              />
            )}
          </Flex>
        </Section>
      );
    } else {
      return tagTypes.map((tagType: TagType, index) => {
        if (tagType !== tagStory) {
          const tagTypeLower = tagType.toLocaleLowerCase();
          const tagCnt = someTags && someTags[tagTypeLower] ? someTags[tagTypeLower].length : 0;
          return (
            <Section key={`${tagType}_${index}`} className={`${tagType}_${index}`} flow="column nowrap">
              <H.Five>{tagType}</H.Five>
              <Flex className={`TagSection ${tagParent}`} flow="row wrap" alignItems="center" width="100%" upperMargin bottomMargin>
                {someTags &&
                  someTags[tagTypeLower] &&
                  someTags[tagTypeLower].map((tagStructure, index) => {
                    const labels = getConvertTagIdToLabel(tagType, tagStructure);
                    return getTagNode(tagParent, tagType, index, tagStructure, labels);
                  })}
                {isMyPage && <AddTag show={isEditables[tagParent]} onClick={() => handleOnClickTag(true, tagParent, tagType, tagCnt)} />}
              </Flex>
            </Section>
          );
        } else {
          return undefined;
        }
      });
    }
  };

  const handleOnClickControlButton = () => {
    if (isEditables[tagParent]) {
      if (isChangeUserTag) {
        handleOnClickSave(tagParent);
      }
    }
    if (isMyPage) {
      setIsEditables({ ...isEditables, [tagParent]: !isEditables[tagParent] });
    }
  };

  return (
    <HeaderSection
      key={`${tagParent} Tags`}
      title={`${tagParent} Tags`}
      headerMenu={
        isMyPage && (
          <Flex flow="row nowrap">
            <ControlButton onClick={handleOnClickControlButton} isEditable={isEditables[tagParent]} isChangeUserTag={isChangeUserTag} />
            <ResetButton onClick={() => handleOnClickReset(tagParent)} disabled={!isChangeUserTag} />
          </Flex>
        )
      }
      content={getContent()}
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
      tagLabels.industory = window.talknStaticTagsById.industory[industoryId].ja;
      tagLabels.industoryParent = window.talknStaticTagsById.industoryParent[industoryParentId].ja;
      tagLabels.startupSeries = window.talknStaticTagsById.startupSeries[startupSeriesId].ja;
      break;
    case tagFounder:
      industoryId = tagStructure.industoryId;
      industoryParentId = industoryId.split('-')[0];
      startupSeriesId = tagStructure.startupSeriesId;
      tagLabels.industory = window.talknStaticTagsById.industory[industoryId].ja;
      tagLabels.industoryParent = window.talknStaticTagsById.industoryParent[industoryParentId].ja;
      tagLabels.startupSeries = window.talknStaticTagsById.startupSeries[startupSeriesId].ja;
      break;
    case tagMember:
      industoryId = tagStructure.industoryId;
      industoryParentId = industoryId.split('-')[0];
      jobId = tagStructure.jobId;
      jobParentId = jobId.split('-')[0];
      tagLabels.industory = window.talknStaticTagsById.industory[industoryId].ja;
      tagLabels.industoryParent = window.talknStaticTagsById.industoryParent[industoryParentId].ja;
      tagLabels.job = window.talknStaticTagsById.jobs[jobId].ja;
      tagLabels.jobParent = window.talknStaticTagsById.jobParents[jobParentId].ja;
      break;
    case tagStory:
      storyId = tagStructure.storyId;
      tagLabels.story = window.talknStaticTagsById.story[storyId].ja;
      break;
  }
  return tagLabels;
};
