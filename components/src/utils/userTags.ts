import { FixValuesType, UserTagsType, TagType, tagInvestor, tagFounder, tagMember, tagStory } from 'components/model/userTags';
import { fixFounderValuesInit } from 'components/model/userTags/Founder';
import { fixInvestorValuesInit } from 'components/model/userTags/Investor';
import { fixMemberValuesInit } from 'components/model/userTags/Member';
import { fixProfileValuesInit } from 'components/model/userTags/Profile';
import { fixStoryValuesInit } from 'components/model/userTags/Story';

export const getFixValuesEmpty = (tagType, includeFillProfile = false): FixValuesType => {
  let fixValuesEmpty;
  switch (tagType) {
    case tagInvestor:
      fixValuesEmpty = { ...fixInvestorValuesInit };
      break;
    case tagFounder:
      fixValuesEmpty = { ...fixFounderValuesInit };
      break;
    case tagMember:
      fixValuesEmpty = { ...fixMemberValuesInit };
      break;
    case tagStory:
      fixValuesEmpty = { ...fixStoryValuesInit };
      break;
  }
  return includeFillProfile ? { ...fixValuesEmpty, ...fixProfileValuesInit } : fixValuesEmpty;
};

export const getExtractFixValues = (openModalOption): FixValuesType => {
  let fixValues = {};
  let fixValuesEmpty = getFixValuesEmpty(openModalOption.tagType);

  Object.keys(openModalOption).forEach((columnName) => {
    if (fixValuesEmpty[columnName] !== undefined) {
      fixValues[columnName] = openModalOption[columnName];
    }
  });
  return fixValues as FixValuesType;
};

export const getHasSelfTags = (userTags: UserTagsType, action: 'save' | 'remove', tagType?: TagType) => {
  const { investor, founder, member } = userTags.self;
  let investorCnt = investor.length;
  let founderCnt = founder.length;
  let memberCnt = member.length;

  if (tagType === tagInvestor) {
    investorCnt = action === 'remove' ? investor.length - 1 : investor.length + 1;
  } else if (tagType === tagFounder) {
    founderCnt = action === 'remove' ? founder.length - 1 : founder.length + 1;
  } else if (tagType === tagMember) {
    memberCnt = action === 'remove' ? member.length - 1 : member.length + 1;
  }

  return {
    investor: investorCnt > 0,
    founder: founderCnt > 0,
    member: memberCnt > 0,
  };
};
