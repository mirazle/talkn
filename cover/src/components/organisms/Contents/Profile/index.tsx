import React, { useEffect, useState } from 'react';

import conf from 'common/conf';
import util from 'common/util';

import api from 'cover/api';
import StoryOrder from 'cover/components/organisms/Contents/Story';
import { GoogleSessionType, UserType, UserTagsType, userHasSelfTagsInit } from 'cover/talkn.cover';

import TagSections from './TagSections';
import SelectFounderModal from './modal/SelectFounderModal';
import SelectInvestorModal from './modal/SelectInvestorModal';
import SelectMemberModal from './modal/SelectMemberModal';
import SelectStoryModal from './modal/SelectStoryModal';

export const tagParentDashboard = 'Dashboard';
export const tagParentSelf = 'Self';
export const tagParentSearch = 'Search';
export const tagParentStory = 'Story';
export type TagParentType = typeof tagParentDashboard | typeof tagParentSelf | typeof tagParentSearch | typeof tagParentStory;
export const tagParentTypes: TagParentType[] = [tagParentSelf, tagParentSearch, tagParentStory];
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
  _id: string;
  email: string;
  isEditable: boolean;
  tagParentType: TagParentType | '';
  tagType: TagType | '';
  industoryParentId: string;
  industoryId: string;
  jobParentId: string;
  jobCategoryId: string;
  jobId: string;
  startupSeriesId: string;
  storyId: string;
  year: number;
  bg: string;
  icon: string;
  languages: string[];
  sexes: string[];
  birthday: number;
  index?: number;
};

export const userModalOptionInit: UserModalOptionType = {
  _id: '',
  email: '',
  isEditable: false,
  tagParentType: '',
  tagType: '',
  index: undefined,
  bg: '',
  icon: '',
  languages: [],
  sexes: [],
  birthday: conf.defaultBirthdayUnixtime,
  industoryParentId: '',
  industoryId: '',
  jobParentId: '',
  jobCategoryId: '',
  jobId: '',
  startupSeriesId: '',
  storyId: '',
  year: 0,
};

type Props = {
  isMyPage: boolean;
  session: GoogleSessionType;
  user: UserType;
  userTags: UserTagsType;
  userTagsInit: UserTagsType;
  setShowSearchModalOption: React.Dispatch<React.SetStateAction<UserModalOptionType>>;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
  setUserTags: React.Dispatch<React.SetStateAction<UserTagsType>>;
  setUserTagsInit: React.Dispatch<React.SetStateAction<UserTagsType>>;
  selectProfileModalOption: UserModalOptionType;
};

const Component: React.FC<Props> = ({
  isMyPage,
  session,
  user,
  userTags,
  userTagsInit,
  setUser,
  setUserTags,
  setUserTagsInit,
  setShowSearchModalOption,
}: Props) => {
  const [isEditables, setIsEditables] = useState(isEditablesInit);
  const [isChangeUserTags, setIsChangeUserTags] = useState(isChangeUserTagsInit);
  const [selectInvestorModalOption, setSelectInvestorModalOption] = useState<UserModalOptionType>({ ...userModalOptionInit });
  const [selectFounderModalOption, setSelectFounderModalOption] = useState<UserModalOptionType>({ ...userModalOptionInit });
  const [selectMemberModalOption, setSelectMemberModalOption] = useState<UserModalOptionType>({ ...userModalOptionInit });
  const [selectStoryModalOption, setSelectStoryModalOption] = useState<UserModalOptionType>({ ...userModalOptionInit });
  const [isSavedAnimations, setIsSavedAnimations] = useState(isSavingAnimationsInit);

  const handleOnClickTag = (
    isEditable,
    tagParentType: TagParentType,
    tagType?: TagType,
    index?: number,
    userModalOptions?: UserModalOptionType
  ) => {
    let _id = '';
    let email = user.email;
    let languages = [];
    let sexes = [];
    let birthday = conf.defaultBirthdayUnixtime;
    let industoryParentId = '';
    let industoryId = '';
    let startupSeriesId = '';
    let year = 0;
    let jobParentId = '';
    let jobId = '';
    let storyId = '';

    switch (tagParentType) {
      case tagParentSelf:
        languages = user.languages ? user.languages : [];
        sexes = user.sexes ? user.sexes : [];
        birthday = user.birthday ? user.birthday : '';
        break;
      case tagParentSearch:
        if (userModalOptions) {
          languages = userModalOptions.languages ? userModalOptions.languages : [];
          sexes = userModalOptions.sexes ? userModalOptions.sexes : [];
          birthday = userModalOptions.birthday ? userModalOptions.birthday : '';
        }
        break;
      case tagParentStory:
      default:
        if (userModalOptions) {
          languages = userModalOptions.languages ? userModalOptions.languages : [];
          sexes = userModalOptions.sexes ? userModalOptions.sexes : [];
          birthday = userModalOptions.birthday ? userModalOptions.birthday : '';
        }
        storyId = userModalOptions && userModalOptions.storyId ? userModalOptions.storyId : '';
        break;
    }

    if (userModalOptions) {
      _id = userModalOptions._id ? userModalOptions._id : '';
      industoryParentId = userModalOptions.industoryId ? userModalOptions.industoryId.split('-')[0] : '';
      industoryId = userModalOptions.industoryId ? userModalOptions.industoryId : '';
      startupSeriesId = userModalOptions.startupSeriesId ? userModalOptions.startupSeriesId : '';
      year = userModalOptions.year ? userModalOptions.year : 0;
      jobParentId = userModalOptions.jobId ? userModalOptions.jobId.split('-')[0] : '';
      jobId = userModalOptions.jobId ? userModalOptions.jobId : '';
      storyId = userModalOptions.storyId ? userModalOptions.storyId : '';
    }

    switch (tagType) {
      case tagInvestor:
        setSelectInvestorModalOption({
          ...userModalOptionInit,
          _id,
          email,
          isEditable,
          languages,
          sexes,
          birthday,
          tagParentType,
          tagType,
          industoryParentId,
          industoryId,
          startupSeriesId,
          year,
          index,
        });
        break;
      case tagFounder:
        setSelectFounderModalOption({
          ...userModalOptionInit,
          _id,
          email,
          isEditable,
          languages,
          sexes,
          birthday,
          tagParentType,
          tagType,
          industoryParentId,
          industoryId,
          startupSeriesId,
          year,
          index,
        });
        break;
      case tagMember:
        setSelectMemberModalOption({
          ...userModalOptionInit,
          _id,
          email,
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
          year,
          index,
        });
        break;
      case tagStory:
        setSelectStoryModalOption({
          ...userModalOptionInit,
          _id,
          email,
          isEditable,
          tagParentType,
          tagType,
          languages,
          sexes,
          birthday,
          storyId,
          index,
        });
        break;
    }
  };

  const handleOnClickRemove = (tagParentType: TagParentType, tagType: TagType, index: number) => {
    const tagParentTypeLower = tagParentType.toLocaleLowerCase();
    const tagTypeLower = tagType.toLocaleLowerCase();

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
  };

  const handleOnClickPositive = (userModalOptions: UserModalOptionType, fixValue) => {
    if (userModalOptions.isEditable) {
      handleOnOk({ ...userModalOptions, ...fixValue });
    } else {
      setShowSearchModalOption(userModalOptions);
    }
  };

  const handleOnOk = (userModalOptions: UserModalOptionType) => {
    const tagParentTypeLower = userModalOptions.tagParentType.toLocaleLowerCase();
    const tagTypeLower = userModalOptions.tagType.toLocaleLowerCase();
    const index = userModalOptions.index;
    let columnType = userModalOptions.tagType === tagMember ? 'jobId' : 'startupSeriesId';
    let updateIndexData = userTags[tagParentTypeLower][tagTypeLower];
    // formにレンダリングすると文字列になるため変換
    userModalOptions.year = Number(userModalOptions.year);

    switch (userModalOptions.tagParentType) {
      case tagParentSelf:
        if (userTags[tagParentTypeLower][tagTypeLower][index]) {
          updateIndexData = userTags[tagParentTypeLower][tagTypeLower].map((option, i) => {
            return index === i
              ? {
                  ...option,
                  industoryId: userModalOptions.industoryId,
                  [columnType]: userModalOptions[columnType],
                  email: user.email,
                  sexes: userModalOptions.sexes,
                  languages: userModalOptions.languages,
                  birthday: userModalOptions.birthday,
                  year: userModalOptions.year,
                }
              : option;
          });
        } else {
          updateIndexData.push({
            tagParentType: tagParentTypeLower,
            tagType: tagTypeLower,
            email: user.email,
            sexes: userModalOptions.sexes,
            languages: userModalOptions.languages,
            birthday: userModalOptions.birthday,
            industoryId: userModalOptions.industoryId,
            [columnType]: userModalOptions[columnType],
            year: userModalOptions.year,
          });
        }
        break;
      case tagParentSearch:
        if (userTags[tagParentTypeLower][tagTypeLower][index]) {
          updateIndexData = userTags[tagParentTypeLower][tagTypeLower].map((option, i) => {
            return index === i
              ? {
                  ...option,
                  sexes: userModalOptions.sexes,
                  languages: userModalOptions.languages,
                  birthday: userModalOptions.birthday,
                  industoryId: userModalOptions.industoryId,
                  [columnType]: userModalOptions[columnType],
                  year: userModalOptions.year,
                }
              : option;
          });
        } else {
          updateIndexData.push({
            tagParentType: tagParentTypeLower,
            tagType: tagTypeLower,
            email: user.email,
            sexes: userModalOptions.sexes,
            languages: userModalOptions.languages,
            birthday: userModalOptions.birthday,
            industoryId: userModalOptions.industoryId,
            [columnType]: userModalOptions[columnType],
            year: userModalOptions.year,
          });
        }
        break;
      case tagStory:
        if (userTags[tagParentTypeLower][tagTypeLower][index]) {
          updateIndexData = userTags[tagParentTypeLower][tagTypeLower].map((option, i) =>
            index === i
              ? {
                  ...option,
                  email: user.email,
                  sexes: user.sexes,
                  languages: user.languages,
                  birthday: user.birthday,
                  storyId: userModalOptions.storyId,
                }
              : option
          );
        } else {
          updateIndexData.push({
            tagParentType: tagParentTypeLower,
            tagType: tagTypeLower,
            email: user.email,
            sexes: user.sexes,
            languages: user.languages,
            birthday: user.birthday,
            storyId: userModalOptions.storyId,
          });
        }
        break;
    }

    setUserTags({
      ...userTags,
      [tagParentTypeLower]: {
        ...userTags[tagParentTypeLower],
        [tagTypeLower]: updateIndexData,
      },
    });
  };

  const handleOnClickReset = async (tagParentType: TagParentType) => {
    const key = tagParentType.toLocaleLowerCase();
    if (tagParentType === tagParentSelf) {
      const dashboardKey = tagParentDashboard.toLocaleLowerCase();
      setUserTags(util.deepCopy({ ...userTags, [dashboardKey]: userTagsInit[dashboardKey], [key]: userTagsInit[key] }));
    } else {
      setUserTags(util.deepCopy({ ...userTags, [key]: userTagsInit[key] }));
    }
  };

  const handleOnClickSave = async (tagParentType: TagParentType) => {
    const tagParentKey = tagParentType.toLocaleLowerCase();
    const isSelfTags = tagParentType === tagParentSelf;
    let hasSelfTags = { ...userHasSelfTagsInit };
    let requestUserTags = [];

    Object.keys(userTags[tagParentKey]).forEach((tagType) => {
      if (isSelfTags) {
        const tagTypeKey = tagType.toLocaleLowerCase();
        hasSelfTags[tagTypeKey] = userTags[tagParentKey][tagTypeKey].length > 0;
      }
      requestUserTags = requestUserTags.concat(userTags[tagParentKey][tagType]);
    });

    api.json('saveUserTags', { email: user.email, tagParentType: tagParentKey, userTags: requestUserTags });

    if (isSelfTags) {
      setUser({ ...user, hasSelfTags });
    }

    setUserTagsInit(util.deepCopy({ ...userTagsInit, [tagParentKey]: userTags[tagParentKey] }));
    setIsChangeUserTags({ ...isChangeUserTags, [tagParentKey]: false });

    setIsSavedAnimations({ ...isSavedAnimations, [tagParentKey]: true });
    setTimeout(() => {
      setIsSavedAnimations({ ...isSavedAnimations, [tagParentKey]: false });
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
          updateIsChangeUserTags[key] = !util.deepEquals(userTags[tagParentTypeLower], userTagsInit[tagParentTypeLower]);
        });

        setIsChangeUserTags({ ...updateIsChangeUserTags });
      }
    }
  }, [userTags]);

  return (
    <>
      <StoryOrder isMyPage={isMyPage} slide />

      {/* Tags */}
      {tagParentTypes.map((tagParentType: TagParentType) => {
        const tagParentTypeLower = tagParentType.toLocaleLowerCase();
        const someTags = userTags ? userTags[tagParentTypeLower] : [];
        return (
          <TagSections
            session={session}
            isMyPage={isMyPage}
            key={tagParentType}
            tagParent={tagParentType}
            someTags={someTags}
            isEditables={isEditables}
            isChangeUserTag={isChangeUserTags[tagParentType]}
            isSavedAnimations={isSavedAnimations[tagParentTypeLower]}
            setIsEditables={setIsEditables}
            handleOnClickReset={handleOnClickReset}
            handleOnClickTag={handleOnClickTag}
            handleOnClickRemove={handleOnClickRemove}
            handleOnClickSave={handleOnClickSave}
          />
        );
      })}

      <SelectInvestorModal
        show={selectInvestorModalOption.index !== undefined}
        user={user}
        userTags={userTags}
        userModalOptions={selectInvestorModalOption}
        onClickPositive={handleOnClickPositive}
        onCancel={() => setSelectInvestorModalOption({ ...userModalOptionInit })}
      />
      <SelectFounderModal
        show={selectFounderModalOption.index !== undefined}
        user={user}
        userTags={userTags}
        userModalOptions={selectFounderModalOption}
        onClickPositive={handleOnClickPositive}
        onCancel={() => setSelectFounderModalOption({ ...userModalOptionInit })}
      />
      <SelectMemberModal
        show={selectMemberModalOption.index !== undefined}
        user={user}
        userTags={userTags}
        userModalOptions={selectMemberModalOption}
        onClickPositive={handleOnClickPositive}
        onCancel={() => setSelectMemberModalOption({ ...userModalOptionInit })}
      />
      <SelectStoryModal
        show={selectStoryModalOption.index !== undefined}
        user={user}
        userTags={userTags}
        userModalOptions={selectStoryModalOption}
        onClickPositive={handleOnClickPositive}
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
