import conf from 'common/conf';

import { FixFounderValuesType } from 'cover/model/userTags/Founder';
import { FixInvestorValuesType } from 'cover/model/userTags/Investor';
import { FixMemberValuesType } from 'cover/model/userTags/Member';
import { FixStoryValuesType } from 'cover/model/userTags/Story';

export type UserTagsType = {
  self: { investor: any[]; founder: any[]; member: any[] };
  relation: { investor: any[]; founder: any[]; member: any[] };
  story: { story: any[] };
};

export const tagParentSelf = 'self';
export const tagParentSearch = 'search';
export const tagParentStory = 'story';
export type TagParentType = typeof tagParentSelf | typeof tagParentSearch | typeof tagParentStory;
export const tagParentTypes: TagParentType[] = [tagParentSelf, tagParentSearch, tagParentStory];
export type TagParentSaveButtonDisabledType = {};

export const tagModeView = 'view';
export const tagModeEdit = 'edit';
export type TagModeType = typeof tagModeView | typeof tagModeEdit;

export const tagInvestor = 'investor';
export const tagFounder = 'founder';
export const tagMember = 'member';
export const tagStory = 'story';
export type TagType = typeof tagInvestor | typeof tagFounder | typeof tagMember | typeof tagStory;
export const tagTypes = [tagInvestor, tagFounder, tagMember, tagStory];

export type FixValuesType = FixFounderValuesType | FixInvestorValuesType | FixMemberValuesType | FixStoryValuesType;

export type OpenModalOptionType = {
  tagId: string;
  userId: string;
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

export const openModalOptionInit: OpenModalOptionType = {
  tagId: '',
  userId: '',
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

export default {};
