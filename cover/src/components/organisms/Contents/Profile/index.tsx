import React, { useEffect, useState } from 'react';

import util from 'common/util';

import api from 'cover/api';
import { GoogleSessionType, UserTagsType } from 'cover/talkn.cover';

import TagSections from './TagSections';
import SelectFounderModal from './modal/SelectFounderModal';
import SelectInvestorModal from './modal/SelectInvestorModal';
import SelectMemberModal from './modal/SelectMemberModal';
import SelectStoryModal from './modal/SelectStoryModal';

export const tagParentProfile = 'Profile';
export const tagParentSelf = 'Self';
export const tagParentRelation = 'Relation';
export const tagParentStory = 'Story';
export type TagParentType = typeof tagParentProfile | typeof tagParentSelf | typeof tagParentRelation | typeof tagParentStory;
export const tagParentTypes: TagParentType[] = [tagParentSelf, tagParentRelation, tagParentStory];
export type TagParentSaveButtonDisabledType = {};

export const tagModeView = 'view';
export const tagModeEdit = 'edit';
export type TagModeType = typeof tagModeView | typeof tagModeEdit;

let isEditablesInit = {};
let isChangeUserTagsInit = {};
let isSavingAnimationsInit = {};
tagParentTypes.forEach((tagParentType) => {
  isEditablesInit[tagParentType] = false;
  isChangeUserTagsInit[tagParentType] = false;
  isSavingAnimationsInit[tagParentType] = false;
});

export const tagInvestor = 'Investor';
export const tagFounder = 'Founder';
export const tagMember = 'Member';
export const tagStory = 'Story';
export type TagType = typeof tagInvestor | typeof tagFounder | typeof tagMember | typeof tagStory;
export const tagTypes = [tagInvestor, tagFounder, tagMember, tagStory];

export type UserModalOptionType = {
  isEditable: boolean;
  tagParentType: TagParentType | '';
  tagType: TagType | '';
  bg: string;
  icon: string;
  languages: string[];
  sexes: string[];
  birthday: string;
  industoryParentId: string;
  industoryId: string;
  jobParentId: string;
  jobCategoryId: string;
  jobId: string;
  startupSeriesId: string;
  storyId: string;
  years: string;
  index?: number;
};

export const userModalOptionInit: UserModalOptionType = {
  isEditable: false,
  tagParentType: '',
  tagType: '',
  index: undefined,
  bg: '',
  icon: '',
  languages: [],
  sexes: [],
  birthday: '',
  industoryParentId: '',
  industoryId: '',
  jobParentId: '',
  jobCategoryId: '',
  jobId: '',
  startupSeriesId: '',
  storyId: '',
  years: '',
};

export type ProfileType = {
  name: string;
  bg: string;
  icon: string;
  birthday: string;
  languages: string[];
  sexes: string[];
};
/*
const getDeletedProfileImages = (obj) => {
  if (obj) {
    const copiedObj = util.deepCopy(obj);
    if (copiedObj.profile) {
      delete copiedObj.profile.icon;
      delete copiedObj.profile.bg;
    }
    return copiedObj;
  } else {
    return obj;
  }
};
*/
type Props = {
  isMyPage: boolean;
  session: GoogleSessionType;
  userTags: UserTagsType;
  userTagsInit: UserTagsType;
  setUserTags: React.Dispatch<React.SetStateAction<UserTagsType>>;
  setUserTagsInit: React.Dispatch<React.SetStateAction<UserTagsType>>;
  selectProfileModalOption: UserModalOptionType;
};

const Component: React.FC<Props> = ({ isMyPage, session, userTags, userTagsInit, setUserTags, setUserTagsInit }: Props) => {
  const [isEditables, setIsEditables] = useState(isEditablesInit);
  const [isChangeUserTags, setIsChangeUserTags] = useState(isChangeUserTagsInit);
  const [selectInvestorModalOption, setSelectInvestorModalOption] = useState<UserModalOptionType>({ ...userModalOptionInit });
  const [selectFounderModalOption, setSelectFounderModalOption] = useState<UserModalOptionType>({ ...userModalOptionInit });
  const [selectMemberModalOption, setSelectMemberModalOption] = useState<UserModalOptionType>({ ...userModalOptionInit });
  const [selectStoryModalOption, setSelectStoryModalOption] = useState<UserModalOptionType>({ ...userModalOptionInit });
  const [isSavedAnimations, setIsSavedAnimations] = useState(isSavingAnimationsInit);

  const handleOnClickTag = (isEditable, tagParentType: TagParentType, tagType?: TagType, index?: number, userModalOptions?: any) => {
    let languages = [];
    let sexes = [];
    let birthday = '';
    let industoryParentId = '';
    let industoryId = '';
    let startupSeriesId = '';
    let years = '';
    let jobParentId = '';
    let jobId = '';
    let storyId = '';

    if (tagParentType === tagParentSelf) {
      languages = userTags.profile.languages ? userTags.profile.languages : [];
      sexes = userTags.profile.sexes ? userTags.profile.sexes : [];
      birthday = userTags.profile.birthday ? userTags.profile.birthday : '';
    } else {
      if (userModalOptions) {
        languages = userModalOptions.languages ? userModalOptions.languages : [];
        sexes = userModalOptions.sexes ? userModalOptions.sexes : [];
        birthday = userModalOptions.birthday ? userModalOptions.birthday : '';
      }
    }

    if (userModalOptions) {
      industoryParentId = userModalOptions.industoryId ? userModalOptions.industoryId.split('-')[0] : '';
      industoryId = userModalOptions.industoryId ? userModalOptions.industoryId : '';
      startupSeriesId = userModalOptions.startupSeriesId ? userModalOptions.startupSeriesId : '';
      years = userModalOptions.year ? userModalOptions.year : '';
      jobParentId = userModalOptions.jobId ? userModalOptions.jobId.split('-')[0] : '';
      jobId = userModalOptions.jobId ? userModalOptions.jobId : '';
      storyId = userModalOptions.storyId ? userModalOptions.storyId : '';
    }

    switch (tagType) {
      case tagInvestor:
        setSelectInvestorModalOption({
          ...userModalOptionInit,
          isEditable,
          languages,
          sexes,
          birthday,
          tagParentType,
          tagType,
          industoryParentId,
          industoryId,
          startupSeriesId,
          years,
          index,
        });
        break;
      case tagFounder:
        setSelectFounderModalOption({
          ...userModalOptionInit,
          isEditable,
          languages,
          sexes,
          birthday,
          tagParentType,
          tagType,
          industoryParentId,
          industoryId,
          startupSeriesId,
          years,
          index,
        });
        break;
      case tagMember:
        setSelectMemberModalOption({
          ...userModalOptionInit,
          isEditable,
          languages,
          sexes,
          birthday,
          tagParentType,
          tagType,
          industoryParentId,
          industoryId,
          jobParentId,
          jobId,
          years,
          index,
        });
        break;
      case tagStory:
        setSelectStoryModalOption({
          ...userModalOptionInit,
          isEditable,
          tagParentType,
          tagType,
          storyId,
          index,
        });
        break;
    }
  };

  const handleOnClickRemoveTag = (tagParentType: TagParentType, tagType: TagType, index: number) => {
    const tagParentTypeLower = tagParentType.toLocaleLowerCase();
    const tagTypeLower = tagType.toLocaleLowerCase();
    if (tagParentType === tagStory) {
      userTags[tagParentTypeLower].splice(index, 1);
      setUserTags({
        ...userTags,
        [tagParentTypeLower]: [...userTags[tagParentTypeLower]],
      });
    } else {
      if (userTags[tagParentTypeLower][tagTypeLower][index]) {
        userTags[tagParentTypeLower][tagTypeLower].splice(index, 1);
        setUserTags({
          ...userTags,
          [tagParentTypeLower]: {
            ...userTags[tagParentTypeLower],
            [tagTypeLower]: [...userTags[tagParentTypeLower][tagTypeLower]],
          },
        });
      }
    }
  };

  const handleOnOk = (tagParentType: TagParentType | '', tagType: TagType | '', userModalOptions: any, index: number) => {
    const tagParentTypeLower = tagParentType.toLocaleLowerCase();
    const tagTypeLower = tagType.toLocaleLowerCase();
    let columnType = tagType === tagMember ? 'jobId' : 'startupSeriesId';
    let updateIndexData;
    switch (tagParentType) {
      case tagStory:
        updateIndexData = userTags[tagParentTypeLower];
        if (userTags[tagParentTypeLower][index]) {
          updateIndexData = userTags[tagParentTypeLower].map((storyId, i) => (index === i ? userModalOptions.storyId : storyId));
        } else {
          updateIndexData.push(userModalOptions.storyId);
        }
        setUserTags({
          ...userTags,
          [tagParentTypeLower]: updateIndexData,
        });
        break;
      case tagParentSelf:
        updateIndexData = userTags[tagParentTypeLower][tagTypeLower];
        if (userTags[tagParentTypeLower][tagTypeLower][index]) {
          updateIndexData = userTags[tagParentTypeLower][tagTypeLower].map((option, i) => {
            return index === i
              ? {
                  industoryId: userModalOptions.industoryId,
                  [columnType]: userModalOptions[columnType],
                  year: userModalOptions.year,
                }
              : option;
          });
        } else {
          updateIndexData.push({
            industoryId: userModalOptions.industoryId,
            [columnType]: userModalOptions[columnType],
            year: userModalOptions.year,
          });
        }
        setUserTags({
          ...userTags,
          [tagParentProfile.toLocaleLowerCase()]: {
            ...userTags[tagParentProfile.toLocaleLowerCase()],
            languages: userModalOptions.languages,
            sexes: userModalOptions.sexes,
            birthday: userModalOptions.birthday,
          },
          [tagParentTypeLower]: {
            ...userTags[tagParentTypeLower],
            [tagTypeLower]: updateIndexData,
          },
        });
        break;
      case tagParentRelation:
        updateIndexData = userTags[tagParentTypeLower][tagTypeLower];
        if (userTags[tagParentTypeLower][tagTypeLower][index]) {
          updateIndexData = userTags[tagParentTypeLower][tagTypeLower].map((option, i) => {
            return index === i
              ? {
                  languages: userModalOptions.languages,
                  sexes: userModalOptions.sexes,
                  birthday: userModalOptions.birthday,
                  industoryId: userModalOptions.industoryId,
                  [columnType]: userModalOptions[columnType],
                  year: userModalOptions.year,
                }
              : option;
          });
        } else {
          updateIndexData.push({
            languages: userModalOptions.languages,
            sexes: userModalOptions.sexes,
            birthday: userModalOptions.birthday,
            industoryId: userModalOptions.industoryId,
            [columnType]: userModalOptions[columnType],
            year: userModalOptions.year,
          });
        }
        setUserTags({
          ...userTags,
          [tagParentTypeLower]: {
            ...userTags[tagParentTypeLower],
            [tagTypeLower]: updateIndexData,
          },
        });
        break;
    }
  };

  const handleOnClickReset = async (tagParentType: TagParentType) => {
    const key = tagParentType.toLocaleLowerCase();
    if (tagParentType === tagParentSelf) {
      const profileKey = tagParentProfile.toLocaleLowerCase();
      setUserTags(util.deepCopy({ ...userTags, [profileKey]: userTagsInit[profileKey], [key]: userTagsInit[key] }));
    } else {
      setUserTags(util.deepCopy({ ...userTags, [key]: userTagsInit[key] }));
    }
  };

  const handleOnClickSaveUser = async (tagParentType: TagParentType) => {
    const key = tagParentType.toLocaleLowerCase();
    let requestValue;
    if (tagParentType === tagParentSelf) {
      const profileKey = tagParentProfile.toLocaleLowerCase();
      requestValue = {
        email: session.email,
        [profileKey]: userTags[profileKey],
        [key]: userTags[key],
      };
      delete requestValue[profileKey].icon;
      delete requestValue[profileKey].bg;
    } else {
      requestValue = {
        email: session.email,
        [key]: userTags[key],
      };
    }

    api.json('saveUser', requestValue);
    setUserTagsInit(util.deepCopy({ ...userTagsInit, [key]: userTags[key] }));
    setIsChangeUserTags({ ...isChangeUserTagsInit });

    setIsSavedAnimations({ ...isSavedAnimations, [key]: true });
    setTimeout(() => {
      setIsSavedAnimations({ ...isSavedAnimations, [key]: false });
    }, 2000);
  };

  // TOOD: Profileモーダルを更新した際にuserTagsがhookされて、このメソッドが実行される。
  // その際にsetIsChangeUserTagsが更新されsaveボタンがviewになってしまう不具合が存在する
  useEffect(() => {
    if (isExistAccountTags(userTags)) {
      if (userTagsInit === undefined) {
        setUserTagsInit(util.deepCopy(userTags));
      }
      if (isExistAccountTags(userTagsInit)) {
        const updateIsChangeUserTags = { ...isChangeUserTags };
        Object.keys(isChangeUserTags).forEach((key) => {
          const tagParentTypeLower = key.toLocaleLowerCase();
          if (key === tagParentSelf) {
            const profileKey = tagParentProfile.toLocaleLowerCase();
            updateIsChangeUserTags[key] =
              !util.deepEquals(userTags[profileKey], userTagsInit[profileKey]) ||
              !util.deepEquals(userTags[tagParentTypeLower], userTagsInit[tagParentTypeLower]);
          } else {
            updateIsChangeUserTags[key] = !util.deepEquals(userTags[tagParentTypeLower], userTagsInit[tagParentTypeLower]);
          }
        });

        setIsChangeUserTags({ ...updateIsChangeUserTags });
      }
    }
  }, [userTags]);

  return (
    <>
      {/* Tags */}
      {tagParentTypes.map((tagParentType: TagParentType) => {
        const tagParentTypeLower = tagParentType.toLocaleLowerCase();
        const tags = userTags ? userTags[tagParentTypeLower] : [];
        return (
          <TagSections
            session={session}
            isMyPage={isMyPage}
            key={tagParentType}
            tagParent={tagParentType}
            tags={tags}
            isEditables={isEditables}
            isChangeUserTag={isChangeUserTags[tagParentType]}
            isSavedAnimations={isSavedAnimations[tagParentTypeLower]}
            setIsEditables={setIsEditables}
            handleOnClickReset={handleOnClickReset}
            handleOnClickTag={handleOnClickTag}
            handleOnClickRemoveTag={handleOnClickRemoveTag}
            handleOnClickSaveUser={handleOnClickSaveUser}
          />
        );
      })}

      <SelectInvestorModal
        show={selectInvestorModalOption.index !== undefined}
        userTags={userTags}
        userModalOptions={selectInvestorModalOption}
        onOk={handleOnOk}
        onCancel={() => setSelectInvestorModalOption({ ...userModalOptionInit })}
      />
      <SelectFounderModal
        show={selectFounderModalOption.index !== undefined}
        userTags={userTags}
        userModalOptions={selectFounderModalOption}
        onOk={handleOnOk}
        onCancel={() => setSelectFounderModalOption({ ...userModalOptionInit })}
      />
      <SelectMemberModal
        show={selectMemberModalOption.index !== undefined}
        userTags={userTags}
        userModalOptions={selectMemberModalOption}
        onOk={handleOnOk}
        onCancel={() => setSelectMemberModalOption({ ...userModalOptionInit })}
      />
      <SelectStoryModal
        show={selectStoryModalOption.index !== undefined}
        userTags={userTags}
        userModalOptions={selectStoryModalOption}
        onOk={handleOnOk}
        onCancel={() => setSelectStoryModalOption({ ...userModalOptionInit })}
      />
    </>
  );
};

export default Component;

const isExistAccountTags = (userTags) => {
  let isExist = false;
  if (userTags) {
    return Boolean(
      tagParentTypes.find((tagParentType) => {
        const tagParentTypeLower = tagParentType.toLocaleLowerCase();
        return userTags[tagParentTypeLower];
      })
    );
  }
  return isExist;
};
