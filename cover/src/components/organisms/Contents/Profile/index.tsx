import React, { useEffect, useState } from 'react';

import util from 'common/util';

import StoryOrder from 'cover/components/organisms/Contents/Story';
import User, { UserHasSelfTagsType } from 'cover/model/User';
import {
  UserTagsType,
  TagType,
  TagParentType,
  tagParentTypes,
  tagParentSelf,
  tagParentStory,
  tagMember,
  OpenModalOptionType,
  openModalOptionInit,
} from 'cover/model/userTags';

import TagSections from './TagSections';
import ViewTagModal from './modal/ViewTagModal';

let isChangeUserTagsInit = {};
let isSavingAnimationsInit = {};
tagParentTypes.forEach((tagParentType) => {
  isChangeUserTagsInit[tagParentType] = false;
  isSavingAnimationsInit[tagParentType] = false;
});

type Props = {
  isMyPage: boolean;
  userId: string;
  user: User;
  userTags: UserTagsType;
  userTagsInit: UserTagsType;
  setShowSearchModalOption: React.Dispatch<React.SetStateAction<OpenModalOptionType>>;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  setUserTags: React.Dispatch<React.SetStateAction<UserTagsType>>;
  setUserTagsInit: React.Dispatch<React.SetStateAction<UserTagsType>>;
  showProfileModalOption: OpenModalOptionType;
};

const Component: React.FC<Props> = ({ isMyPage, userId, user, userTags, userTagsInit, setUser, setUserTags, setUserTagsInit }: Props) => {
  const [openModalOptions, setOpenModalOptions] = useState<OpenModalOptionType>({ ...openModalOptionInit });
  const [isSavedAnimations, setIsSavedAnimations] = useState(isSavingAnimationsInit);

  const handleOnClickOpenTag = (
    tagParentType: TagParentType,
    tagType?: TagType,
    index?: number,
    tag?: OpenModalOptionType & { _id: string }
  ) => {
    let tagId = '';
    let industoryParentId = '';
    let jobParentId = '';

    if (tag) {
      tagId = getTagId(tag);
      industoryParentId = tag.industoryId && tag.industoryId !== '' ? tag.industoryId.split('-')[0] : undefined;
      jobParentId = tag.jobId && tag.jobId !== '' ? tag.jobId.split('-')[0] : undefined;
    }

    if (tagParentType === tagParentSelf) {
      setOpenModalOptions({
        ...openModalOptionInit,
        ...tag,
        userId,
        sexes: user.sexes,
        languages: user.languages,
        birthday: user.birthday,
        jobParentId,
        industoryParentId,
        tagId,
        tagParentType,
        tagType,
        index,
      });
    } else {
      setOpenModalOptions({
        ...openModalOptionInit,
        ...tag,
        userId,
        jobParentId,
        industoryParentId,
        tagId,
        tagParentType,
        tagType,
        index,
      });
    }
  };

  const handleOnClickRemove = (tagParentType: TagParentType, tagType: TagType, index: number, hasSelfTags?: UserHasSelfTagsType) => {
    if (userTags[tagParentType][tagType][index]) {
      userTags[tagParentType][tagType].splice(index, 1);
      setUserTags({
        ...userTags,
        [tagParentType]: {
          ...userTags[tagParentType],
          [tagType]: [...userTags[tagParentType][tagType]],
        },
      });
    }

    if (hasSelfTags && tagParentType === tagParentSelf) {
      setUser({ ...user, hasSelfTags } as User);
    }
  };

  const handleOnClickSaveUserTag = (openModalOptions: OpenModalOptionType, hasSelfTags?: UserHasSelfTagsType) => {
    const { tagParentType, tagType, userId, tagId, index, industoryId, sexes, languages, birthday, storyId } = openModalOptions;
    const year = Number(openModalOptions.year);
    let updateUserTag = userTags[tagParentType][tagType];

    if (tagParentType !== tagParentStory) {
      const columnType = tagType === tagMember ? 'jobId' : 'startupSeriesId';
      const columnValue = openModalOptions[columnType];

      if (userTags[tagParentType][tagType][index]) {
        updateUserTag = userTags[tagParentType][tagType].map((option, i) => {
          return index === i
            ? {
                ...option,
                userId,
                tagId,
                industoryId,
                [columnType]: columnValue,
                sexes,
                languages,
                birthday,
                year,
              }
            : option;
        });
      } else {
        updateUserTag.push({
          tagParentType,
          tagType,
          userId,
          tagId,
          sexes,
          languages,
          birthday,
          industoryId,
          [columnType]: columnValue,
          year,
        });
      }
    } else {
      if (userTags[tagParentType][tagType][index]) {
        updateUserTag = userTags[tagParentType][tagType].map((option, i) =>
          index === i
            ? {
                ...option,
                tagId,
                userId,
                sexes,
                languages,
                birthday,
                storyId,
              }
            : option
        );
      } else {
        updateUserTag.push({
          tagParentType,
          tagType,
          userId,
          tagId,
          sexes,
          languages,
          birthday,
          storyId,
        });
      }
    }

    if (hasSelfTags && tagParentType === tagParentSelf) {
      setUser({ ...user, hasSelfTags } as User);
    }

    setOpenModalOptions({ ...openModalOptions });
    setUserTags({
      ...userTags,
      [tagParentType]: {
        ...userTags[tagParentType],
        [tagType]: updateUserTag,
      },
    });
  };

  useEffect(() => {
    if (isExistAccountTags(userTags)) {
      if (userTagsInit === undefined) {
        setUserTagsInit(util.deepCopy(userTags));
      }
    }
  }, [userTags]);

  return (
    <>
      <StoryOrder isMyPage={isMyPage} userId={userId} slide />

      {/* Tags */}
      {tagParentTypes.map((tagParentType: TagParentType) => {
        const someTags = userTags ? userTags[tagParentType] : [];
        return (
          <TagSections
            isMyPage={isMyPage}
            key={tagParentType}
            tagParent={tagParentType}
            someTags={someTags}
            isSavedAnimations={isSavedAnimations[tagParentType]}
            handleOnClickOpenTag={handleOnClickOpenTag}
            handleOnClickRemove={handleOnClickRemove}
          />
        );
      })}

      {openModalOptions.index !== undefined && (
        <ViewTagModal
          show={openModalOptions.index !== undefined}
          isMyPage={isMyPage}
          userTags={userTags}
          openModalOptions={openModalOptions}
          handleOnClickRemove={handleOnClickRemove}
          handleOnClickSaveUserTag={handleOnClickSaveUserTag}
          handleOnClickCancel={() => setOpenModalOptions({ ...openModalOptionInit })}
        />
      )}
    </>
  );
};

export default Component;

const isExistAccountTags = (userTags) => {
  let isExist = false;
  if (userTags) {
    return Boolean(tagParentTypes.find((tagParentType) => userTags[tagParentType]));
  }
  return isExist;
};

const getTagId = (tag) => {
  if (tag.tagId && tag.tagId !== '') {
    return tag.tagId;
  }
  if (tag._id && tag._id !== '') {
    return tag._id;
  }
  return '';
};
